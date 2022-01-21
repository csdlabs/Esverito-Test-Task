import axios, {AxiosInstance, AxiosRequestConfig} from "axios";


const instance = axios.create({
    baseURL: 'https://test-backend.esverito.com',

})

//interceptor
const setInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config: any) => {
        const token = sessionStorage.getItem('accessToken');
        config.headers['Authorization'] = token;
        console.log(token)
        return config
    })
    instance.interceptors.response.use(
        (response) => response,
        async (error: any) => {
            const { config: originalReq, response } = error;
            if (response.statusCode === 401) {
                const response = await instance.get('/refresh');
                sessionStorage.setItem('accessToken', response.data.token);
            }
        })
}

setInterceptors(instance)


export const CarsApi = {
    async getCars(token: string) {
        return instance.get<CarsResponseType>(`/cars`)
    },
    async createCar(token: string, brand: string, model: string, carNumber: string, engineType: string) {
        return instance.post<CarResponseType>(`/car`, {
            "brand": brand,
            "carNumber": carNumber,
            "engineType": engineType,
            "mileage": 0,
            "model": model,
            "new": true,
            "price": 0,
            "transmission": "MANUAL",
            "yearOfConstruction": 0
        })
    },
    deleteCar(token: string, carId: number | undefined) {
        return instance.delete(`/car/${carId}`)
    },
    updateCar(token: string, carId: number, brand: string, model: string, carNumber: string, engineType: string) {
        return instance.put<CarResponseType>(`/api/car/${carId}`, {
            "brand": brand,
            "carNumber": carNumber,
            "engineType": engineType,
            "mileage": 0,
            "model": model,
            "new": true,
            "price": 0,
            "transmission": "MANUAL",
            "yearOfConstruction": 0
        })
    },
    getCar(carId: number | undefined, token: string) {
        return instance.get<CarResponseType>(`/car/${carId}`)
    },
    updateCarBrand(token: string, carId: number | undefined, brand: string) {
        return instance.patch(`/car/${carId}`, {brand})
    },
    updateCarModel(token: string, carId: number | undefined, model: string) {
        return instance.patch(`/car/${carId}`, {model})
    },
    updateCarNumber(token: string, carId: number | undefined, carNumber: string) {
        return instance.patch(`/car/${carId}`, {carNumber})
    },
    updateCarEngineType(token: string, carId: number | undefined, engineType: string) {
        return instance.patch(`/car/${carId}`, {engineType})
    },

}

type CarsType = {
    brand: string
    carNumber: string
    engineType: string
    id: number
    mileage: number
    model: string
    new: boolean
    price: number
    transmission: string
    userId: number
    yearOfConstruction: number
}

type CarsResponseType = {
    cars: Array<CarsType>
}

type CarResponseType = {
    car: {
        brand: string
        carNumber: string
        engineType: string
        id: number
        mileage: number
        model: string
        new: boolean
        price: number
        transmission: string
        userId: number
        yearOfConstruction: number
    }
}