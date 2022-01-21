import {appReducer, AppReducerStateType, LoadingStatusType, setAppIsError, setAppIsLoadingStatus} from "./app-reducer";


let startState: AppReducerStateType;

beforeEach(() => {
    startState = {
        loadingStatus: 'idle' as LoadingStatusType,
        isError: null
    };
});

test('loading status must changed', () => {
    const action = setAppIsLoadingStatus('completed');
    const endState = appReducer(startState, action);
    expect(endState.loadingStatus).toBe('completed')
});

test('error is happened', () => {
    const action = setAppIsError('some error occurred');
    const endState = appReducer(startState, action);
    expect(endState.isError).toBe('some error occurred')
});