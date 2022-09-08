import * as AUTH from "../types/auth";

const signIn = (user: any) => {    
    return {
        type: AUTH.SIGN_IN,
        payload: { user }
    }
} 

const signOut = () => {    
    return {
        type: AUTH.SIGN_OUT
    }
} 

export { signIn, signOut };
