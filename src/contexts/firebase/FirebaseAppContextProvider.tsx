import {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {FirebaseAppContext, FirebaseAppContextType} from "./FirebaseAppContext.tsx";
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

export const FirebaseAppContextProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [app, setApp] = useState<FirebaseAppContextType['app']>(null);
    const [db, setDb] = useState<FirebaseAppContextType['db']>(null);

    useEffect(() => {
        const app = initializeApp({
            "apiKey": `${import.meta.env.VITE_FIREBASE_API_KEY}`,
            "authDomain": `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
            "databaseURL": `${import.meta.env.VITE_FIREBASE_DATABASE_URL}`,
            "projectId": `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
            "storageBucket": `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_NAME}`,
            "messagingSenderId": `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
            "appId": `${import.meta.env.VITE_FIREBASE_APP_ID}`,
        });
        const database = getDatabase(app);
        setDb(database);
    }, []);

    const value: FirebaseAppContextType = useMemo(() => {
        return {
            app: app,
            setApp: setApp,
            db: db,
            setDb: setDb,
        }
    }, [app, db])

    return (
        <FirebaseAppContext.Provider value={value}>{children}</FirebaseAppContext.Provider>
    )
}

