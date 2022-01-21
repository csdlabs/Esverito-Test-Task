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
import s from './Car.module.scss'


const Car = React.memo(() => {
    const car = useSelector<RootStateType, CarType>(state => state.carsPage.currentCar)
    const dispatch = useDispatch()

    const onCarBrandUpdate = React.useCallback((brand: string) => {
        dispatch(updateCarBrandName(car.id ,brand ))
    },[car.id, dispatch])

    const onCarModelUpdate = React.useCallback((model: string) => {
        dispatch(updateCarModelName(car.id, model))
    },[car.id, dispatch])

    const onCarNumberUpdate = React.useCallback((carNumber: string) => {
        dispatch(updateCarNumberName(car.id, carNumber))
    },[car.id, dispatch])

    const onCarEngineTypeUpdate = React.useCallback((engineType: string) => {
        if( engineType === 'FUEL' || engineType === 'GAS' || engineType === 'HYBRID'){
            dispatch(updateCarEngineTypeName(car.id, engineType))
        }
        else{
            alert('incorrect engine type, please type: FUEL, GAS or HYBRID')
        }
    },[car.id, dispatch])


    return(
        <section className={s.inner}>
            <div className={s.contentInner}>
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
        </section>

    )
})

export default Car