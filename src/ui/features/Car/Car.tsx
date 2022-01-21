import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../store/store";
import {
    CarType,
    updateCarBrandName,
    updateCarEngineTypeName,
    updateCarModelName,
    updateCarNumberName
} from "../../../store/cars-reducer";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {Navigate} from "react-router-dom";

const Car = React.memo(() => {
    const car = useSelector<RootStateType, CarType>(state => state.carsPage.currentCar)
    const token = useSelector<RootStateType, string>(state => state.auth.token)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const onCarBrandUpdate = React.useCallback((brand: string) => {
        dispatch(updateCarBrandName(token, car.id ,brand ))
    },[car.id, token, dispatch])

    const onCarModelUpdate = React.useCallback((model: string) => {
        dispatch(updateCarModelName(token, car.id, model))
    },[car.id, token, dispatch])

    const onCarNumberUpdate = React.useCallback((carNumber: string) => {
        dispatch(updateCarNumberName(token, car.id, carNumber))
    },[car.id, token, dispatch])

    const onCarEngineTypeUpdate = React.useCallback((engineType: string) => {
        if( engineType === 'FUEL' || engineType === 'GAS' || engineType === 'HYBRID'){
            dispatch(updateCarEngineTypeName(token, car.id, engineType))
        }
        else{
            alert('incorrect engine type, please type: FUEL, GAS or HYBRID')
        }
    },[token, car.id, dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }
    return(
        <div>
            <div>
                <h3>Brand:</h3>
                <EditableSpan title={car.brand} callback={(title)=>onCarBrandUpdate(title)} className={''}/>
            </div>
            <div>
                <h3>Car Model:</h3>
                <EditableSpan title={car.model} callback={(title)=>onCarModelUpdate(title)} className={''}/>
            </div>
            <div>
                <h3>Engine Type:</h3>
                <EditableSpan title={car.engineType} callback={(title)=>onCarEngineTypeUpdate(title)} className={''}/>
            </div>
            <div>
                <h3>Car Number:</h3>
                <EditableSpan title={car.carNumber} callback={(title)=>onCarNumberUpdate(title)} className={''}/>
            </div>
        </div>
    )
})

export default Car