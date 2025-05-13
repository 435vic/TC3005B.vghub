import { createClient } from "@hey-api/client-fetch";

const client = createClient({
    baseUrl: 'https://api.rawg.io/api',
    // RAWG has a very "unorthodox" (bad) way
    // of specifying the API key. It's HAS to be included as a key parameter
    // in the query instead of a Bearer Token. This freaks out the openAPI
    // generated code by hey-api, and so I need to intercept every query
    // made, add the key, and re encode it. Unfortunately the library doesn't
    // expose its default implementation of querySerializer, so I have to do this.
    querySerializer: query => {
        query.key = import.meta.env.VITE_UNSAFE_RAWG_API_KEY;
        return Object.entries(query).map(([key, val]) => `${key}=${encodeURIComponent(val.toString())}`).join('&');
    }
})

export default client;

