import {FirebaseAppContext} from "../contexts/firebase/FirebaseAppContext.tsx";
import useContextWrapper from "./useContextWrapper.tsx";
import {FirebaseAppContextProvider} from "../contexts/firebase/FirebaseAppContextProvider.tsx";

function useFirebaseAppContext() {
    return useContextWrapper(FirebaseAppContext, {
        contextName: useFirebaseAppContext.name,
        providerName: FirebaseAppContextProvider.name
    })
}

export default useFirebaseAppContext;