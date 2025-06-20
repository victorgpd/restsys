import { useState } from "react";
import { useDocument } from "./useDocuments";
import { app, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import type { IAccount, IUser } from "../types/types";
import { useAppDispatch } from "../utils/useStore";
import { setAccount, setUser } from "../redux/globalReducer/slice";
import { redirect, type NavigateFunction } from "react-router-dom";
import { RoutesEnums } from "../types/enums";

export const useAuthentication = () => {
  const auth = getAuth(app);
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { insertDocument, getDocuments } = useDocument();

  const generateUniqueAccountNumber = async (collectionName = "contas", fieldName = "numberAccount"): Promise<number> => {
    const maxAttempts = 10;

    for (let attempts = 0; attempts < maxAttempts; attempts++) {
      const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
      const q = query(collection(db, collectionName), where(fieldName, "==", randomNumber));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return randomNumber;
    }

    throw new Error("Não foi possível gerar um número de conta único.");
  };

  const login = async (user: { email: string; password: string } | { agency: string; account: string; password: string }): Promise<IUser> => {
    setError("");
    setLoading(true);

    try {
      let users: IUser[] = [];
      let accounts: IAccount[] = [];

      if ("agency" in user && "account" in user) {
        accounts = await getDocuments<IAccount>("contas", [where("numberAccount", "==", user.account.replace("-", ""))]);
        if (!accounts.length) throw new Error("Conta não encontrada.");
        await signInWithEmailAndPassword(auth, accounts[0].proprietary.email, user.password);
        users = await getDocuments<IUser>("usuarios", [where("email", "==", accounts[0].proprietary.email)]);
      } else if ("email" in user) {
        await signInWithEmailAndPassword(auth, user.email, user.password);
        users = await getDocuments<IUser>("usuarios", [where("email", "==", user.email)]);
        accounts = await getDocuments<IAccount>("contas", [where("proprietary.email", "==", user.email)]);
      }
      if (users.length === 0) {
        throw new Error("Usuário não encontrado.");
      }

      dispatch(setUser(users[0]));
      dispatch(setAccount(accounts[0]));
      return users[0];
    } catch (error: unknown) {
      let message = "Ocorreu um erro, por favor tente novamente mais tarde.";

      if (error instanceof Error) {
        if (error.message.includes("user-not-found") || error.message.includes("wrong-password")) {
          message = "E-mail ou senha incorretos.";
        } else {
          message = error.message;
        }
      }

      setError(message);
      return Promise.reject(new Error(message)); // Isso permite o uso de `.catch()`
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: IUser) => {
    setError("");
    setLoading(true);

    try {
      const cpfSnapshot = await getDocs(query(collection(db, "usuarios"), where("cpf", "==", user.cpf)));

      if (!cpfSnapshot.empty) {
        throw new Error("CPF já cadastrado.");
      }

      const { user: userResult } = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const accountNumber = await generateUniqueAccountNumber();

      const userData: IUser = {
        uid: userResult.uid,
        ...user,
      };

      await insertDocument("usuarios", userData);

      await insertDocument("contas", {
        proprietary: userData,
        agency: "0001",
        numberAccount: accountNumber.toString(),
        balance: 0,
        bank: "007",
        pixKeys: [],
        creditCard: null,
      });

      dispatch(setUser(userData));
    } catch (error: unknown) {
      let message = "Ocorreu um erro, por favor tente novamente mais tarde.";

      if (error instanceof Error) {
        if (error.message.includes("Password")) message = "A senha precisa conter pelo menos 6 caracteres.";
        if (error.message.includes("email-already")) message = "E-mail já cadastrado.";
        if (error.message.includes("CPF já cadastrado")) message = "CPF já cadastrado.";
      }

      setError(message);
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async (navigate: NavigateFunction) => {
    await signOut(auth);
    dispatch(setUser(null));
    dispatch(setAccount(null));

    navigate(RoutesEnums.Login);
  };

  const verifyLogged = (): Promise<IUser | null> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user?.email) {
          try {
            const users = await getDocuments<IUser>("usuarios", [where("email", "==", user.email)]);
            const currentUser = users[0];
            if (currentUser) {
              const accounts = await getDocuments<IAccount>("contas", [where("proprietary.email", "==", user.email)]);

              dispatch(setAccount(accounts[0]));
              dispatch(setUser(currentUser));
              resolve(currentUser);
            } else {
              dispatch(setUser(null));
              resolve(null);
            }
          } catch (err) {
            reject(err);
          }
        } else {
          dispatch(setUser(null));
          resolve(null);
        }
      });
    });
  };

  const verifyLoggedIn = (): Promise<null | Response> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(null); // usuário autenticado
        } else {
          resolve(redirect(RoutesEnums.Login)); // redireciona se não autenticado
        }
      });
    });
  };

  return {
    error,
    loading,
    login,
    logout,
    register,
    verifyLogged,
    verifyLoggedIn,
  };
};
