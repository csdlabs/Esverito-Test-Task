import {Dispatch} from "redux";
import {AuthApi} from "../dal/api/auth-api";
import {setAppIsError, setAppIsLoadingStatus} from "./app-reducer";


type AuthReducerStateType = {
    activeTill: string
    token: string
    userName: string
    isLoggedIn: boolean
}

const AuthReducerState: AuthReducerStateType = {
    activeTill: '',
    token: '',
    userName: '',
    isLoggedIn: false
}

export const authReducer = (state: AuthReducerStateType = AuthReducerState, action: ActionsType) => {
    switch (action.type){
        case "AUTH-REDUCER/SET-AUTH-DATA": {
            return {
                ...state,
                activeTill: action.activeTill,
                token: action.token,
                userName: action.userName
            }
        }
        case "AUTH/SET-IS-LOGGED-IN": {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        }
        default: {
            return state
        }
    }
}
const setAuthData = (activeTill: string, token: string, userName: string) => {
    return{
        type: 'AUTH-REDUCER/SET-AUTH-DATA',
        activeTill,
        token,
        userName
    } as const
}


const setIsLoggedIn = (isLoggedIn: boolean) => {
    return{
        type: 'AUTH/SET-IS-LOGGED-IN',
        isLoggedIn
    } as const
}

export const getAuthData = (userName: string, password: string) => async (dispatch: Dispatch) => {
    debugger
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await AuthApi.login(userName, password)
        sessionStorage.setItem('accessToken', response.data.token)
        dispatch(setAuthData(response.data.activeTill, response.data.token, response.data.userName))
        dispatch(setIsLoggedIn(true))
        dispatch(setAppIsLoadingStatus('completed'))
    }
    catch (e: any){
        dispatch(setAppIsError(e.response.data.message))
        dispatch(setAppIsLoadingStatus('failed'))
    }
    finally {}
}

type ActionsType = ReturnType<typeof setAuthData> | ReturnType<typeof setIsLoggedIn>;