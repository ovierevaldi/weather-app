import Cookies from "js-cookie";
import { UserCookie } from "@/types/UserData";

const getUserData = () => {
    const userData =  Cookies.get('user_id');
    if(userData){
        return JSON.parse(userData)
    }
    else return userData;
};

const setUserData = (userData: UserCookie) => {
    return Cookies.set('user_id', JSON.stringify(userData));
}

export { getUserData, setUserData }