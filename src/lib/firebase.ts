// Firebase Client SDK Configuration
// This file initializes Firebase for client-side usage

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'your-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'your-app-id',
};

// Debug: Log Firebase config (only in browser)
if (typeof window !== 'undefined') {
  console.log('=== Firebase Config Debug ===');
  console.log('Project ID:', firebaseConfig.projectId);
  console.log('Auth Domain:', firebaseConfig.authDomain);
  console.log('API Key exists:', !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your-api-key');
}

// Initialize Firebase (prevent re-initialization in development)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Debug: Log db instance
if (typeof window !== 'undefined') {
  console.log('Firestore db initialized:', !!db);
}

export default app;
