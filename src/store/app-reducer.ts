

export type LoadingStatusType = 'idle' | 'loading' | 'completed' | 'failed';

export type AppReducerStateType = {
    loadingStatus: LoadingStatusType
    isError: string | null
}

const AppReducerState: AppReducerStateType = {
    loadingStatus: 'idle' as LoadingStatusType,
    isError: null
}

export const appReducer = (state: AppReducerStateType = AppReducerState, action: ActionsType) => {
    switch (action.type) {
        case "APP/SET-APP-IS-LOADING-STATUS": {
            return {
                ...state,
                loadingStatus: action.loadingStatus
            }
        }
        case "APP/SET-APP-IS-ERROR": {
            return {
                ...state,
                isError: action.isError
            }
        }
        default: return state
    }
}


export const setAppIsLoadingStatus = (loadingStatus: LoadingStatusType) => {
    return{
        type: 'APP/SET-APP-IS-LOADING-STATUS',
        loadingStatus
    } as const
}

export const setAppIsError = (isError: null | string) => {
    return{
        type: 'APP/SET-APP-IS-ERROR',
        isError
    } as const
}



type ActionsType = ReturnType<typeof setAppIsLoadingStatus> | ReturnType<typeof setAppIsError>;