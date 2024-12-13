import CryptoJS from 'crypto-js'

const EncryptProvider = () => {
    
    const encrypt = (value: string) => {
        if(process.env.NEXT_PUBLIC_ENCRYPT_KEY)
            return CryptoJS.AES.encrypt(value, process.env.NEXT_PUBLIC_ENCRYPT_KEY).toString();
    }

    const decrypt = (encryptedValue: string) => {
        if(process.env.NEXT_PUBLIC_ENCRYPT_KEY){
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, process.env.NEXT_PUBLIC_ENCRYPT_KEY);
            return decryptedBytes.toString(CryptoJS.enc.Utf8);
        }
    }
    
    return {encrypt, decrypt}
};

export default EncryptProvider