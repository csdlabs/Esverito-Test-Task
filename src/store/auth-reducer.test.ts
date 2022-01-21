import {authReducer, AuthReducerStateType, setAuthData} from "./auth-reducer";


let startState: AuthReducerStateType;

beforeEach(() => {
    startState = {
        activeTill: '',
        token: '',
        userName: '',
    };
});

test('authData must be updated', () => {
    const action = setAuthData('some string', 'some token', 'some username');
    const endState = authReducer(startState, action);
    expect(endState.activeTill).toBe('some string');
    expect(endState.token).toBe('some token');
    expect(endState.userName).toBe('some username');
});