import React from "react";
import {Route, Routes} from "react-router-dom";
import {ROUTES} from "../../../routes/routes";
import Login from "../Login/Login";
import CarList from "../CarList/CarList";
import Car from "../Car/Car";
import Error404 from "../Error404/Error404";
import StartPage from "../StartPage/StartPage";


const Main = React.memo(() => {
    return(
        <main>
            <Routes>
                <Route path={ROUTES.HOME} element={<StartPage/>} />
                <Route path={ROUTES.LOGIN} element={<Login/>} />
                <Route path={ROUTES.CAR_LIST} element={<CarList/>} />
                <Route path={ROUTES.CAR} element={<Car/>} />
                <Route path={ROUTES.PAGE_NOT_FOUND} element={<Error404/>}/>
            </Routes>
        </main>
    )
})

export default Main