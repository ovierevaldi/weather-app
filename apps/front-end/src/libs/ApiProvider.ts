import { PatchFavouriteCity, PostFavouriteCity} from "@/types/UserData";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

class ApiProviderClass {
    default_timeout: number = 2000;
    base_url: string = '';
    apiClient: AxiosInstance | null = null;

    constructor(base_url?: string, timeout?: number){
        if(base_url){
            this.base_url = base_url;
        }

        if(timeout){
            this.default_timeout = timeout;
        };

        this.setupApiClient();
    };

    setupApiClient(){
        if(!this.base_url){
            console.log('Cannot Setup Api Provider');
            return;
        };

        this.apiClient = axios.create({
            baseURL: this.base_url,
            timeout: this.default_timeout
        })
    };

    get(url: string){
        return this.apiClient?.get(this.base_url + url);      
    }

    post<T, D extends object>(url:  string, data: D){
        return this.apiClient?.post<T>(this.base_url + url, data);
    };

    patch<T, D extends object>(url: string, data: D){
        return this.apiClient?.patch<T>(this.base_url + url, data)
    }

    async getCurrentWeather(q: string | object){
        try {
            let data = '';

            if(typeof q === 'string'){
                data = q
            }

            if(typeof q === 'object' && 'latitude' in q && 'longitude' in q){
                data = `${q.latitude}, ${q.longitude}`;
            };

            const response = await this.get(`/weather?q=${data}`);
            
            if(response?.data){
                return response.data;
            }
            else{
                throw new Error('Cannot Get Weather');
            }
        } catch (error) {
            console.log(error);
            throw new Error('Cannot Get Weather');            
        }
    }

    getCurrentWeatherIcon(url: string){
        return (`https://${url}`)
    };

    async createUser(data: PostFavouriteCity){
        try {
            const response: AxiosResponse | undefined = await this.post('/user-data', data);
            // const response: AxiosResponse | undefined = await this.post('/user-data', {city: '', value: true});

            if(response?.data){
                return response.data;
            }
            else{
                throw new Error('Cannot Post User Favourite.');
            };

        } catch (error) {
            if(error){
                console.log(error);
                const err = error as AxiosError;
                if(err.status === 400){
                    throw new Error('Bad Request Parameter!')
                }
            }
            
            throw new Error('Something went wrong. Cannot Set Favourite');            
        }
    };

    async updateFavouriteCity(userData: PatchFavouriteCity){
        try {
            const response: AxiosResponse | undefined = await this.patch(`/user-data/${userData.id}`, userData.data);
            // const response: AxiosResponse | undefined = await this.patch(`/user-data/${userData.id}`, {});
            // const response: AxiosResponse | undefined = await this.patch(`/user-data/12312`, userData.data);

            if(response?.data){
                return response.data;
            }
            else{
                throw new Error('Cannot Get /user-data');
            }
        } catch (error) {
            console.log(error);

            const err = error as AxiosError;
            if(err.status === 400){
                throw new Error('Bad Request Parameter!')
            }

            else if(err.status === 404){
                throw new Error('Error. User Not Found')
            }
            
            throw new Error('Something went wrong. Cannot Set Favourite');          
        }
    };

    async getUserData(userID: string){
        try {
            const response: AxiosResponse | undefined = await this.get(`/user-data/${userID}`);
            // const response: AxiosResponse | undefined = await this.get(`/user-data/1231323213`);

            if(response?.data){
                return response.data;
            }
            else{
                throw new Error('Cannot Get User Data');
            }
        } catch (error) {
            console.log(error);

            const err = error as AxiosError;

            if(err.status === 404){
                throw new Error('Error. Cannot get user data')
            }
            
            throw new Error('Something went wrong. Please contact admin');     
        }
    };

    async getForecastData(city: string, days: number){
        try {
            const response: AxiosResponse | undefined = await this.get(`/weather/forecast?city=${city}&days=${days}`);
            // const response: AxiosResponse | undefined = await this.get(`/weather/forecast`);
            if(response?.data){
                return response;
            }
            else{
                throw new Error('Cannot Get Forecast Data');
            }
        } catch (error) {
            console.log(error);
            const err = error as AxiosError;

            if(err.status === 400){
                throw new Error('Something went wrong. Cannot get forecast data')
            };

            throw new Error('Cannot get Forecast Data. Please contact admin');
        }
    }
};

const ApiProvider = new ApiProviderClass(process.env.NEXT_PUBLIC_API_URL);

export default ApiProvider;