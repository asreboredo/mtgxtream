import { FirebaseApp } from "firebase/app";
import {createContext} from "react";
import { Database } from "firebase/database";

export interface FirebaseAppContextType {
    app: FirebaseApp | null;
    setApp: (app: FirebaseApp | null) => void;
    db: Database | null;
    setDb: (db: Database | null) => void;
}

export const FirebaseAppContext = createContext<FirebaseAppContextType>({
    app: null,
    setApp: () => {},
    db: null,
    setDb: () => {}
});
