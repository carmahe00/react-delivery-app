import { createContext } from "react";
import { StripeState } from "./StripeProvider";

export interface StripeContext {
    state: StripeState
    sendingIntent: () => Promise<void>
    
}

export const StripeContext = createContext<StripeContext>({} as StripeContext);