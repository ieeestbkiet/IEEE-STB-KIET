import { auth } from './firebase';

export const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal) {
      return 'https://ieee-stb-kiet.onrender.com/api';
    }
  }
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && !envUrl.includes('localhost')) {
    return envUrl;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://ieee-stb-kiet.onrender.com/api';
  }
  return envUrl || 'http://localhost:5000/api';
};

export const getAuthToken = async (): Promise<string | null> => {
  if (typeof window !== 'undefined') {
    const devToken = localStorage.getItem('dev_admin_token');
    if (devToken) return devToken;
  }

  // 1. Wait for Firebase Auth to finish resolving initial auth state from storage
  if (!auth.currentUser && typeof auth.authStateReady === 'function') {
    try {
      await auth.authStateReady();
    } catch (e) {
      console.warn('Firebase authStateReady error:', e);
    }
  }

  // 2. Brief grace period (150ms) if IndexedDB is still hydrating
  if (!auth.currentUser && typeof window !== 'undefined') {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  if (!auth.currentUser) return null;

  try {
    return await auth.currentUser.getIdToken();
  } catch (err) {
    console.error('Failed to get Firebase ID token:', err);
    return null;
  }
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  let token = await getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const base = getApiBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${base}${endpoint}`;
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // If token expired (401) and Firebase user is active, force refresh token and retry once
  if (response.status === 401 && auth.currentUser) {
    try {
      const refreshedToken = await auth.currentUser.getIdToken(true);
      if (refreshedToken) {
        headers.set('Authorization', `Bearer ${refreshedToken}`);
        response = await fetch(url, {
          ...options,
          headers,
        });
      }
    } catch {
      // Ignore retry failure and proceed to throw standard error
    }
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

export const api = {
  get: (endpoint: string) => fetchApi(endpoint, { method: 'GET' }),
  post: (endpoint: string, body?: any) =>
    fetchApi(endpoint, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  put: (endpoint: string, body?: any) =>
    fetchApi(endpoint, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  patch: (endpoint: string, body?: any) =>
    fetchApi(endpoint, {
      method: 'PATCH',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  delete: (endpoint: string) => fetchApi(endpoint, { method: 'DELETE' }),
  upload: async (file: File, folder: string = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    const result = await fetchApi('/upload', {
      method: 'POST',
      body: formData,
    });
    return result.url;
  },
};
