import { RegisUserErrorProp, RegisUserProp } from '@/types/UserData';
import z from 'zod'

type FormValidationResultProp = {
    isSuccess: boolean
    errors? : RegisUserErrorProp
    data?: object
}

const FormValidation = () => {
    const registerSchema = z.object({
        username: z.string().min(8, "Please input a minimum 8 characters"),
        password: z.string().min(8, "Please input a minimum 8 characters")
    });

    const registerValidation = (register_data: RegisUserProp): FormValidationResultProp => {
        const result = registerSchema.safeParse(register_data);
        if(result.error){

            const errors : RegisUserErrorProp = {
                username: result.error.flatten().fieldErrors.username || [],
                password: result.error.flatten().fieldErrors.password || []
            }
            return {
                isSuccess: false,
                errors: errors
            }
        }
        else{
            return {
                isSuccess: true,
                data: result.data
            }
        }
    };
    
    return {
        registerValidation
    }
};

export default FormValidation;