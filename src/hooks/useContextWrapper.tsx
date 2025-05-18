import * as React from "react";
import {useContext} from "react";

interface ContextConfig {
    contextName: string;
    providerName: string;
}

function useContextWrapper<T>(reactContext: React.Context<T>, config: ContextConfig) {
    const context = useContext(reactContext);
    const {contextName, providerName} = config;

    if (!context) {
        throw new Error(`${contextName} must be used within a ${providerName}`);
    }

    return context;
}

export default useContextWrapper;

