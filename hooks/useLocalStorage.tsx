import { useState } from "react";

export type TokenData = {
    token: string;
    user: {name: string, email: string};
  };


const useLocalStorage = () =>{

    const getTokenData = () => typeof window !== undefined ? JSON.parse(window.localStorage.getItem('tokenData') || "" ) : null;

    const setTokenData = (data: TokenData) : void => {
        if (typeof window !== undefined ){
            window.localStorage.setItem('tokenData', JSON.stringify(data)) 
        }
    }
    
    return {getTokenData, setTokenData}
}

export default useLocalStorage;