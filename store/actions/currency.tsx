import * as CURRENCY from "../types/currency";

const setCurrency = (currency: any) => {    
    return {
        type: CURRENCY.SET_CURRENCY,
        payload: { currency }
    }
} 

export { setCurrency };
