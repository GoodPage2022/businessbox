import * as AUTH from "../types/auth";
import { Dispatch, AnyAction } from 'redux';

const signIn = (user: any) => {    
    return {
        type: AUTH.SIGN_IN,
        payload: { user }
    }
} 

export { signIn };
