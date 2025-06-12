import { useState } from "react";
import { useDocument } from "./useDocuments";
import { app, db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import type { IUser } from "../types/types";
import { useAppDispatch } from "../utils/useStore";
import { setUser } from "../redux/globalReducer/slice";

export const useAuthentication = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { insertDocument, getDocuments } = useDocument();

  const auth = getAuth(app);

  const generateUniqueAccountNumber = async (collectionName = "contas", fieldName = "numberAccount"): Promise<number> => {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // número de conta com 7 dígitos
      const q = query(collection(db, collectionName), where(fieldName, "==", randomNumber));
      const snapshot = await getDocs(q);

      if (snapshot.empty) return randomNumber;

      attempts++;
    }

    throw new Error("Não foi possível gerar um número de conta único.");
  };

  const register = async (user: IUser) => {
    setError("");
    setLoading(true);

    try {
      const cpfQuery = query(collection(db, "usuarios"), where("cpf", "==", user.cpf));
      const cpfSnapshot = await getDocs(cpfQuery);

      if (!cpfSnapshot.empty) {
        setError("CPF já cadastrado.");
        return Promise.reject(new Error("CPF já cadastrado."));
      }

      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const userResult = userCredential.user;

      const accountNumber = await generateUniqueAccountNumber();

      await insertDocument("usuarios", {
        uid: userResult.uid,
        cpf: user.cpf,
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
      });

      await insertDocument("contas", {
        proprietary: {
          uid: userResult.uid,
          cpf: user.cpf,
          name: user.name,
          phone: user.phone,
          email: user.email,
          password: user.password,
          birthDate: user.birthDate,
        },
        agency: "0001",
        numberAccount: accountNumber.toString(),
        balance: 0,
        bank: "007",
        pixKeys: [],
        creditCard: null,
      });

      dispatch(setUser({ uid: userResult.uid, cpf: user.cpf, name: user.name, phone: user.phone, email: user.email, password: user.password, birthDate: user.birthDate }));

      return;
    } catch (error: unknown) {
      let systemErrorMessage;

      if (error instanceof Error) {
        if (error.message.includes("Password")) {
          systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
          systemErrorMessage = "E-mail já cadastrado.";
        } else if (error.message.includes("CPF já cadastrado")) {
          systemErrorMessage = "CPF já cadastrado.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde.";
        }

        setError(systemErrorMessage);
      }

      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyLogged = () => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const users = await getDocuments<IUser>("usuarios", [where("email", "==", user.email)]);
        dispatch(setUser(users[0]));
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });
    return null;
  };

  return { error, loading, register, verifyLogged };
};
