import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import styles from './Profile.module.css';

function getGravatarUrl(email: string, size = 100) {
  const hash = email.toLowerCase().trim();
  return `https://www.gravatar.com/avatar/${btoa(hash)}?s=${size}&d=identicon`;
}

export default function Profile() {
  const { currentUser, userData, updateUserData, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setBio(userData.bio || '');
    }
  }, [currentUser, userData, navigate]);

  async function handleSave() {
    if (!firstName.trim()) {
      setError('First name is required');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await updateUserData({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio: bio.trim()
      });
      setEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    }
    setLoading(false);
  }

  function handleCancel() {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setBio(userData.bio || '');
    }
    setEditing(false);
    setError('');
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout');
    }
  }

  if (!currentUser || !userData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const gravatarUrl = getGravatarUrl(userData.email, 150);

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <img src={gravatarUrl} alt="Profile" className={styles.avatar} />
          <p className={styles.gravatarNote}>
            Profile picture powered by <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer">Gravatar</a>
          </p>
        </div>

        <div className={styles.infoSection}>
          {error && <div className={styles.error}>{error}</div>}
          
          {!editing ? (
            <>
              <h1>{userData.firstName} {userData.lastName}</h1>
              <p className={styles.email}>{userData.email}</p>
              {userData.bio && <p className={styles.bio}>{userData.bio}</p>}
              <p className={styles.role}>Role: {userData.role}</p>
              
              <div className={styles.buttonGroup}>
                <button onClick={() => setEditing(true)} className={styles.editButton}>
                  Edit Profile
                </button>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Edit Profile</h2>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>
              
              <div className={styles.buttonGroup}>
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className={styles.saveButton}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button 
                  onClick={handleCancel}
                  disabled={loading}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
