import { db } from "../firebase/config";
import { useState, useCallback } from "react";
import type { IAccount, IUser, IUserLogin } from "../types/types";
import { addDoc, collection, doc, updateDoc, deleteDoc, onSnapshot, query, getDocs, QueryConstraint, type DocumentData } from "firebase/firestore";

export function useDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertDocument = useCallback(async (collectionName: string, documentData: IUser | IUserLogin | IAccount) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, collectionName), documentData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDocument = useCallback(async (collectionName: string, id: string, data: Partial<IUser | IUserLogin | IAccount>) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDocument = useCallback(async (collectionName: string, id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }, []);

  const getDocuments = useCallback(async <T = DocumentData>(collectionName: string, conditions?: QueryConstraint[]): Promise<T[]> => {
    setLoading(true);
    setError(null);
    try {
      const ref = collection(db, collectionName);
      const q = conditions && conditions.length ? query(ref, ...conditions) : ref;
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const subscribeToDocuments = useCallback(<T = DocumentData>(collectionName: string, callback: (data: (T & { id: string })[]) => void, conditions?: QueryConstraint[]) => {
    const ref = collection(db, collectionName);
    const q = conditions && conditions.length ? query(ref, ...conditions) : ref;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (T & { id: string })[]; // Cast seguro
        callback(data);
      },
      (err) => {
        setError(err.message);
      }
    );

    return unsubscribe;
  }, []);

  return {
    insertDocument,
    updateDocument,
    deleteDocument,
    getDocuments,
    subscribeToDocuments,
    loading,
    error,
  };
}
