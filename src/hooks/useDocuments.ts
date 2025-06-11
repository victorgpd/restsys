// src/hooks/useDocument.ts
import { useState, useCallback } from "react";
import { db } from "../firebase/config";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { IAccount, IUser, IUserLogin } from "../types/types";

export function useDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertDocument = useCallback(async (collectionName: string, documentData: IUser | IUserLogin | IAccount) => {
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, collectionName), documentData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado.");
      }
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado.");
      }
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { insertDocument, updateDocument, deleteDocument, loading, error };
}
