import React from 'react';
import './App.css';
import Header from "../ui/features/Header/Header";
import Main from "../ui/features/Main/Main";
import {LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {RootStateType} from "../store/store";
import {LoadingStatusType} from "../store/app-reducer";
import ErrorSnackbar from "../ui/components/ErrorSnackbar/ErrorSnackbar";


function App() {
    const status = useSelector<RootStateType, LoadingStatusType>(state => state.app.loadingStatus)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('userName');
    return (
        <div className="App">
            <div className="wrapper">
                <Header isLoggedIn={isLoggedIn} userName={userName}/>
                {status === 'loading' ? <LinearProgress color="secondary" /> : null}
                <Main/>
            </div>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
