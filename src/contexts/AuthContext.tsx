import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase';

interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName?: string;
  bio?: string;
  role: string;
  createdAt: any;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName?: string, bio?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function createUserDocument(user: User, additionalData: Partial<UserData> = {}) {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { email } = user;
      const userData: UserData = {
        uid: user.uid,
        email: email || '',
        firstName: additionalData.firstName || '',
        lastName: additionalData.lastName || '',
        bio: additionalData.bio || '',
        role: 'user',
        createdAt: serverTimestamp(),
        ...additionalData
      };

      await setDoc(userRef, userData);
      return userData;
    }

    return userSnap.data() as UserData;
  }

  async function fetchUserData(uid: string) {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    
    return null;
  }

  async function register(email: string, password: string, firstName: string, lastName?: string, bio?: string) {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const userData = await createUserDocument(user, { firstName, lastName, bio });
    setUserData(userData);
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const { user } = await signInWithPopup(auth, googleProvider);
    const userData = await createUserDocument(user, { 
      firstName: user.displayName?.split(' ')[0] || '',
      lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
    });
    setUserData(userData);
  }

  async function logout() {
    await signOut(auth);
    setUserData(null);
  }

  async function updateUserData(data: Partial<UserData>) {
    if (!currentUser) return;
    
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, data);
    
    setUserData(prev => prev ? { ...prev, ...data } : null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const userData = await fetchUserData(user.uid);
        setUserData(userData);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
