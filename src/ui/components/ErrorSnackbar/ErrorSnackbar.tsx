import React from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {RootStateType} from "../../../store/store";
import {setAppIsError} from "../../../store/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = React.memo(() => {
    const isError = useSelector<RootStateType, null | string>(state => state.app.isError)
    const dispatch = useDispatch()

    const handleClose = React.useCallback((event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppIsError(null))
    },[dispatch])

    return (
        <Snackbar open={isError != null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {isError}
            </Alert>
        </Snackbar>
    );
})
export default ErrorSnackbar