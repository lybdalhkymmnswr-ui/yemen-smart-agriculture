'use client';

// Authentication Context Provider (Phase 1)
// Uses Firebase Auth only - no Firestore users collection
// Automatically signs in anonymously if no user is logged in
// Users collection will be added in Phase 2

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authReady: boolean; // New: indicates auth state is fully initialized
  isAnonymous: boolean; // New: indicates if user is anonymous
  error: string | null;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Listen to auth state changes and auto sign-in anonymously
  useEffect(() => {
    console.log('=== AuthContext: Setting up onAuthStateChanged ===');
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('=== AuthContext: Auth state changed ===');
      console.log('firebaseUser:', firebaseUser);
      console.log('firebaseUser?.uid:', firebaseUser?.uid);
      console.log('firebaseUser?.isAnonymous:', firebaseUser?.isAnonymous);
      
      if (firebaseUser) {
        // User is signed in (either regular or anonymous)
        setUser(firebaseUser);
        setLoading(false);
        setAuthReady(true);
        console.log('User is signed in:', firebaseUser.uid);
      } else {
        // No user signed in - sign in anonymously
        console.log('No user signed in, attempting anonymous sign-in...');
        try {
          const result = await signInAnonymously(auth);
          console.log('Anonymous sign-in successful:', result.user.uid);
          setUser(result.user);
        } catch (err) {
          console.error('Anonymous sign-in failed:', err);
          setUser(null);
        } finally {
          setLoading(false);
          setAuthReady(true);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Register new user (Firebase Auth only)
  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name in Firebase Auth profile
      await updateProfile(userCredential.user, { displayName });
      
      // Refresh user to get updated profile
      setUser({ ...userCredential.user, displayName } as User);
      
      console.log('Registration successful:', userCredential.user.uid);
      
      // Redirect to home page after successful registration
      router.push('/');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      const firebaseError = err as { code?: string; message?: string };
      setError(getErrorMessage(firebaseError.code || firebaseError.message || 'Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', result.user.uid);
      
      // Redirect to home page after successful login
      router.push('/');
    } catch (err: unknown) {
      console.error('Login error:', err);
      const firebaseError = err as { code?: string; message?: string };
      setError(getErrorMessage(firebaseError.code || firebaseError.message || 'Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user (will trigger anonymous sign-in automatically)
  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await signOut(auth);
      // Note: onAuthStateChanged will handle setting user to null
      // and then signing in anonymously
      console.log('Logout successful');
      router.push('/');
    } catch (err: unknown) {
      console.error('Logout error:', err);
      const firebaseError = err as { code?: string; message?: string };
      setError(getErrorMessage(firebaseError.code || firebaseError.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    loading,
    authReady,
    isAnonymous: user?.isAnonymous ?? false,
    error,
    register,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function to translate Firebase error codes to Arabic messages
function getErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
    'auth/invalid-email': 'البريد الإلكتروني غير صالح',
    'auth/operation-not-allowed': 'العملية غير مسموحة',
    'auth/weak-password': 'كلمة المرور ضعيفة جداً (يجب 6 أحرف على الأقل)',
    'auth/user-disabled': 'تم تعطيل هذا الحساب',
    'auth/user-not-found': 'لم يتم العثور على المستخدم',
    'auth/wrong-password': 'كلمة المرور غير صحيحة',
    'auth/invalid-credential': 'بيانات الاعتماد غير صالحة',
    'auth/too-many-requests': 'تم تجاوز عدد المحاولات المسموحة. يرجى المحاولة لاحقاً',
  };
  
  return errorMessages[errorCode] || errorCode || 'حدث خطأ غير متوقع';
}

export default AuthContext;
