import axios, {AxiosInstance} from "axios";


const instance = axios.create({
    baseURL: 'https://test-backend.esverito.com',

})

//interceptor
const setInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config: any) => {
        const token = sessionStorage.getItem('accessToken');
        config.headers['Authorization'] = token;
        return config
    })
    instance.interceptors.response.use(
        (response) => response,
        async (error: any) => {
            const {config: originalReq, response} = error;
            if (response.statusCode === 401) {
                const response = await instance.get('/refresh');
                sessionStorage.setItem('accessToken', response.data.token);
            }
        })
}

setInterceptors(instance)


export const CarsApi = {
    async getCars() {
        return instance.get<CarsResponseType>(`/cars`)
    },
    async createCar(brand: string, model: string, carNumber: string, engineType: string) {
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
    deleteCar(carId: number | undefined) {
        return instance.delete(`/car/${carId}`)
    },
    updateCar(carId: number, brand: string, model: string, carNumber: string, engineType: string) {
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
    getCar(carId: number | undefined) {
        return instance.get<CarResponseType>(`/car/${carId}`)
    },
    updateCarBrand(carId: number | undefined, brand: string) {
        return instance.patch(`/car/${carId}`, {brand})
    },
    updateCarModel(carId: number | undefined, model: string) {
        return instance.patch(`/car/${carId}`, {model})
    },
    updateCarNumber(carId: number | undefined, carNumber: string) {
        return instance.patch(`/car/${carId}`, {carNumber})
    },
    updateCarEngineType(carId: number | undefined, engineType: string) {
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