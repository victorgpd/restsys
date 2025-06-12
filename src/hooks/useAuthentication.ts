import { useState } from "react";
import { useDocument } from "./useDocuments";
import { app, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import type { IUser } from "../types/types";
import { useAppDispatch } from "../utils/useStore";
import { setUser } from "../redux/globalReducer/slice";
import { redirect } from "react-router-dom";
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

  const verifyLogged = (): Promise<IUser> => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();

        try {
          if (user?.email) {
            const users = await getDocuments<IUser>("usuarios", [where("email", "==", user.email)]);
            const currentUser = users[0];

            if (currentUser) {
              dispatch(setUser(currentUser));
              resolve(currentUser);
            } else {
              dispatch(setUser(null));
              reject("Usuário não autenticado.");
            }
          } else {
            dispatch(setUser(null));
            reject("Usuário não autenticado.");
          }
        } catch (err) {
          reject(err);
        } finally {
          setLoading(false);
        }
      });
    });
  };

  const verifyLoggedIn = (): Promise<null | Response> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        dispatch(setUser(null));
        resolve(user ? null : redirect(RoutesEnums.Login));
      });
    });
  };

  return {
    error,
    loading,
    register,
    verifyLogged,
    verifyLoggedIn,
  };
};
