import {Dispatch} from "redux";
import {AuthApi} from "../dal/api/auth-api";
import {setAppIsError, setAppIsLoadingStatus} from "./app-reducer";


export type AuthReducerStateType = {
    activeTill: string
    token: string
    userName: string
}

const AuthReducerState: AuthReducerStateType = {
    activeTill: '',
    token: '',
    userName: '',
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
        default: {
            return state
        }
    }
}
export const setAuthData = (activeTill: string, token: string, userName: string) => {
    return{
        type: 'AUTH-REDUCER/SET-AUTH-DATA',
        activeTill,
        token,
        userName
    } as const
}


export const getAuthData = (userName: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(setAppIsLoadingStatus('loading'))
    try {
        const response = await AuthApi.login(userName, password)
        sessionStorage.setItem('accessToken', response.data.token)
        dispatch(setAuthData(response.data.activeTill, response.data.token, response.data.userName))
        dispatch(setAppIsLoadingStatus('completed'))
        sessionStorage.setItem('isLoggedIn', 'true')
        sessionStorage.setItem('userName', response.data.userName)
    }
    catch (e: any){
        dispatch(setAppIsError(e.response.data.message))
        dispatch(setAppIsLoadingStatus('failed'))
    }
    finally {}
}

type ActionsType = ReturnType<typeof setAuthData>;