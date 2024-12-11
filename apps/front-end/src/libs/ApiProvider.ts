import axios, { AxiosInstance } from "axios";

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
        console.log(this.base_url + url)
        return this.apiClient?.get(this.base_url + url);      
    }

    async getCurrentWeather(city: string){
        try {
            const response = await this.get(`/weather?city=${city}`);
            
            if(response?.data){
                return response.data;
            }
            else{
                throw new Error('Cannot Get /weather');
            }
        } catch (error) {
            console.log(error);
            throw error;            
        }
    }

    getCurrentWeatherIcon(url: string){
        return (`https://${url}`)
    }
};

const ApiProvider = new ApiProviderClass(process.env.NEXT_PUBLIC_API_URL);

export default ApiProvider;