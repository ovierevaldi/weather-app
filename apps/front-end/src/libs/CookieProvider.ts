import Cookies from "js-cookie";
import { UserCookie } from "@/types/UserData";
import EncryptProvider from "./Encryption";

const getUserData = () => {
    const userData =  Cookies.get('user_id');
    if(userData){
        const decryptedVal = EncryptProvider().decrypt(userData);
        if(decryptedVal){
            return JSON.parse(decryptedVal)
        }

        else{
            return {error: "Cannot Decrypt Cookie"}
        }
    }
    else return userData;
};

const setUserData = (userData: UserCookie) => {
    console.log(userData)
    // Cookie Expired in 7 days
    const encryptedVal = EncryptProvider().encrypt(JSON.stringify(userData));
    if(encryptedVal)
        return Cookies.set('user_id', encryptedVal , {expires: 7, sameSite: 'Lax'});
    else{
        return {error: "Cannot Encrypt Cookie"}
    }
};

const deleteUserData = () => {
    Cookies.remove('user_id');
}

export { getUserData, setUserData, deleteUserData }