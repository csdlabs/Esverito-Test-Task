import {Dispatch} from "redux";
import {CarsApi} from "../dal/api/cars-api";
import {setAppIsError, setAppIsLoadingStatus} from "./app-reducer";


export type CarsInitStateType = {
    cars: Array<CarType>
    currentCar: CarType
    isFetching: boolean
}

export type CarType = {
    brand: string
    carNumber: string
    engineType: string
    id?: number
    mileage: number
    model: string
    new: boolean
    price: number
    transmission: string
    userId?: number
    yearOfConstruction: number
}

const CarsInitState: CarsInitStateType = {
    cars: [],
    currentCar: {
        brand: '',
        carNumber: '',
        engineType: '',
        id: 0,
        mileage: 0,
        model: '',
        new: true,
        price: 0,
        transmission: '',
        userId: 0,
        yearOfConstruction: 0
    },
    isFetching: false
}
export const carsReducer = (state: CarsInitStateType = CarsInitState, action: ActionsType) => {
    switch (action.type) {
        case "CARS/SET-CARS": {
            return {
                ...state,
                cars: action.cars
            }
        }
        case "CARS/ADD-CAR": {
            return {
                ...state,
                cars: [action.car, ...state.cars]
            }
        }
        case "CARS/DELETE-CAR": {
            return {
                ...state,
                cars: state.cars.filter(c => c.id !== action.carId)
            }
        }
        case "CARS/UPDATE-CAR": {
            return {
                ...state,
                cars: state.cars.map(c => c.id === action.car.id ? {
                    ...c,
                    brand: action.car.brand,
                    model: action.car.model,
                    carNumber: action.car.carNumber,
                    engineType: action.car.engineType
                } : c)
            }
        }
        case "CARS/SET-CURRENT-CAR": {
            return {
                ...state,
                currentCar: action.car
            }
        }
        case "CARS/UPDATE-CAR-BRAND": {
            return {
                ...state,
                currentCar: {
                    ...state.currentCar,
                    brand: action.brand
                }
            }
        }
        case "CARS/UPDATE-CAR-MODEL": {
            return {
                ...state,
                currentCar: {
                    ...state.currentCar,
                    model: action.model
                }
            }
        }
        case "CARS/UPDATE-CAR-NUMBER": {
            return {
                ...state,
                currentCar: {
                    ...state.currentCar,
                    carNumber: action.carNumber
                }
            }
        }
        case "CARS/UPDATE-CAR-ENGINE": {
            return {
                ...state,
                currentCar: {
                    ...state.currentCar,
                    engineType: action.engineType
                }
            }
        }
        case 'CARS/SORT-CARS-BY-BRAND-UP': {
            return {
                ...state,
                cars: state.cars.sort((function (a, b) {
                    if (a.brand > b.brand) {
                        return 1;
                    }
                    if (a.brand < b.brand) {
                        return -1;
                    }
                    return 0;
                }))
            }
        }
        case "CARS/SORT-CARS-BY-BRAND-DOWN": {
            return {
                ...state,
                cars: state.cars.sort((function (a, b) {
                    if (a.brand < b.brand) {
                        return 1;
                    }
                    if (a.brand > b.brand) {
                        return -1;
                    }
                    return 0;
                }))
            }
        }

        default:
            return state
    }
}
export const sortCarsByBrandUp = () => {
    return {
        type: 'CARS/SORT-CARS-BY-BRAND-UP',
        payload: 'up'
    } as const
}
export const sortCarsByBrandDown = () => {
    return {
        type: 'CARS/SORT-CARS-BY-BRAND-DOWN',
        payload: 'down'
    } as const
}
export const setCars = (cars: Array<CarType>) => {
    return {
        type: 'CARS/SET-CARS',
        cars
    } as const
}
export const addCar = (car: CarType) => {
    return {
        type: 'CARS/ADD-CAR',
        car
    } as const
}
export const deleteCar = (carId: number | undefined) => {
    return {
        type: 'CARS/DELETE-CAR',
        carId
    } as const
}
export const editCar = (car: CarType) => {
    return {
        type: 'CARS/UPDATE-CAR',
        car
    } as const
}
export const setCurrentCar = (car: CarType) => {
    return {
        type: 'CARS/SET-CURRENT-CAR',
        car
    } as const
}
export const updateCarBrand = (brand: string) => {
    return {
        type: 'CARS/UPDATE-CAR-BRAND',
        brand
    } as const
}
export const updateCarModel = (model: string) => {
    return {
        type: 'CARS/UPDATE-CAR-MODEL',
        model
    } as const
}
export const updateCarNumber = (carNumber: string) => {
    return {
        type: 'CARS/UPDATE-CAR-NUMBER',
        carNumber
    } as const
}
export const updateCarEngineType = (engineType: string) => {
    return {
        type: 'CARS/UPDATE-CAR-ENGINE',
        engineType
    } as const
}


export const getCars = () => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    const response = await CarsApi.getCars()
    try {
        dispatch(setCars(response.data.cars))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}

export const addNewCar = ( brand: string, model: string, carNumber: string, engineType: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.createCar( brand, model, carNumber, engineType)
        dispatch(addCar(response.data.car))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}

export const removeCar = ( carId: number | undefined) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.deleteCar( carId)
        dispatch(deleteCar(carId))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}


export const updateCar = (carId: number, brand: string, model: string, carNumber: string, engineType: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.updateCar( carId, brand, model, carNumber, engineType)
        dispatch(editCar(response.data.car))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}

export const getCurrentCar = ( carId: number | undefined) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.getCar(carId)
        dispatch(setCurrentCar(response.data.car))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}

export const updateCarBrandName = (carId: number | undefined, brand: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.updateCarBrand( carId, brand)
        dispatch(updateCarBrand(response.data.car.brand))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}

export const updateCarModelName = ( carId: number | undefined, model: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.updateCarModel( carId, model)
        dispatch(updateCarModel(response.data.car.model))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}

export const updateCarNumberName = (carId: number | undefined, carNumber: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.updateCarNumber(carId, carNumber)
        dispatch(updateCarNumber(response.data.car.carNumber))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}
export const updateCarEngineTypeName = (carId: number | undefined, engineType: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await CarsApi.updateCarEngineType(carId, engineType)
        dispatch(updateCarEngineType(response.data.car.engineType))
    } catch (e: any) {
        dispatch(setAppIsError(e.response.data.message && (e as Error).message))
        dispatch(setAppIsLoadingStatus('failed'))
    } finally {
        dispatch(setAppIsLoadingStatus('completed'))
    }
}


type ActionsType =
    ReturnType<typeof setCars>
    | ReturnType<typeof addCar>
    | ReturnType<typeof deleteCar>
    | ReturnType<typeof editCar>
    | ReturnType<typeof setCurrentCar>
    | ReturnType<typeof updateCarBrand>
    | ReturnType<typeof updateCarModel>
    | ReturnType<typeof updateCarNumber>
    | ReturnType<typeof updateCarEngineType>
    | ReturnType<typeof sortCarsByBrandUp>
    | ReturnType<typeof sortCarsByBrandDown>;