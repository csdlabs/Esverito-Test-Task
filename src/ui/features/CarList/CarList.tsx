import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../store/store";
import {
    addNewCar,
    CarsInitStateType,
    getCars,
    getCurrentCar,
    removeCar, sortCarsByBrandDown, sortCarsByBrandUp,
    updateCar
} from "../../../store/cars-reducer";
import s from './CarsList.module.scss'
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperModal from "../../components/SuperModal/SuperModal";
import SuperInputText from "../../components/SuperInput/SuperInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import commonS from './../../features/CommonStyles.module.scss'
import closeModal from './../../../assets/images/close-modal.svg'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination
} from "@material-ui/core";
import deleteImg from "../../../assets/images/delete.svg";
import editImg from "../../../assets/images/edit.svg";
import {Navigate, useNavigate} from "react-router-dom";
import arrowUp from './../../../assets/images/up-arrow.png';
import arrowDown from './../../../assets/images/down-arrow.png'
import {makeStyles} from '@mui/styles';


const CarList = React.memo(() => {
    const useStyles = makeStyles({
        table: {
            fontFamily: 'PT Sans',
        },
        tableCell: {
            fontFamily: 'PT Sans',
            paddingTop: 14,
            paddingRight: 29,
            paddingBottom: 12,
            paddingLeft: 20
        }
    });
    const [addCarModal, setAddCarModal] = React.useState(false)
    const [editCarModal, setEditCarModal] = React.useState(false)
    const [currentCarId, setCurrentCarId] = React.useState(0)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const token = useSelector<RootStateType, string>(state => state.auth.token)
    const carsState = useSelector<RootStateType, CarsInitStateType>(state => state.carsPage)
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles();
    useEffect(() => {
        dispatch(getCars(token))
    }, [dispatch, token])


    const onOpenAddCarModal = React.useCallback(() => {
        setAddCarModal(true)
    }, [])

    const onCloseAddCarModal = React.useCallback(() => {
        setAddCarModal(false)
    }, [])

    const onOpenEditCarModal = React.useCallback((carId: number | undefined) => {
        setEditCarModal(true)
        if (carId) {
            setCurrentCarId(carId)
        }
    }, [])

    const onCloseEditCarModal = React.useCallback(() => {
        setEditCarModal(false)
    }, [])

    const onDeleteCar = React.useCallback((carId: number | undefined) => {
        dispatch(removeCar(token, carId))
    }, [token, dispatch])

    const onAddCarHandler = React.useCallback((brand: string, model: string, carNumber: string, engineType: string) => {
        dispatch(addNewCar(token, brand, model, carNumber, engineType))
    }, [token, dispatch])

    const onVisitCurrentCar = React.useCallback((carId: number | undefined) => {
        dispatch(getCurrentCar(token, carId))
        navigate('/car')
    }, [token, navigate, dispatch])

    const engineTypes = ["FUEL", "HYBRID", "GAS"];

    const addCarFormik = useFormik({
        initialValues: {
            brand: '',
            model: '',
            carNumber: '',
            engineType: ''
        },
        validationSchema: Yup.object({
            brand: Yup.string()
                .min(3, 'Must be at least 3 characters long')
                .required('This field is required'),
            model: Yup.string()
                .min(2, 'Must be at least 2 characters long')
                .required('This field is required'),
            carNumber: Yup.string()
                .min(7, 'Must be at least 7 characters long')
                .required('This field is required'),
            engineType: Yup.string().required("Please select a product").oneOf(engineTypes)
                .min(3)
                .required('This field is required'),
        }),
        onSubmit: (values) => {
            onAddCarHandler(values.brand, values.model, values.carNumber, values.engineType)
            addCarFormik.resetForm();
        },
    });
    const editCarFormik = useFormik({
        initialValues: {
            brand: '',
            model: '',
            carNumber: '',
            engineType: ''
        },
        validationSchema: Yup.object({
            brand: Yup.string()
                .min(3, 'Must be at least 3 characters long')
                .required(`This field is required. If you don't want to change this field information, repeat your current info anyway.`),
            model: Yup.string()
                .min(2, 'Must be at least 2 characters long')
                .required('This field is required. If you don\'t want to change this field information, repeat your current info anyway.'),
            carNumber: Yup.string()
                .min(7, 'Must be at least 7 characters long')
                .required('This field is required. If you don\'t want to change this field information, repeat your current info anyway.'),
            engineType: Yup.string().required("Please select a product").oneOf(engineTypes)
                .min(3)
                .required('This field is required. If you don\'t want to change this field information, repeat your current info anyway.'),
        }),
        onSubmit: (values) => {
            dispatch(updateCar(token, currentCarId, values.brand, values.model, values.carNumber, values.engineType))
            editCarFormik.resetForm();
        },
    });


    const createData = React.useCallback((brand: string, model: string, carNumber: string, engineType: string, id: number | undefined) => {
        return {brand, model, carNumber, engineType, id};
    }, [])

    const cars = carsState.cars.map(c => {
        return (
            createData(c.brand, c.model, c.carNumber, c.engineType, c.id)
        )
    })


    const sortByBrandUp = React.useCallback(() => {
        dispatch(sortCarsByBrandUp())
    }, [dispatch])

    const sortByBrandDown = React.useCallback(() => {
        dispatch(sortCarsByBrandDown())
    }, [dispatch])


    const handleChangePage = React.useCallback((event: any, newPage: any) => {
        setPage(newPage);
    }, [])

    const handleChangeRowsPerPage = React.useCallback((event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, [])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, cars.length - page * rowsPerPage);



    return (
            <>
                <section className={s.carList}>
                    <div className={s.inner}>
                        <div className={s.listHeader}>
                            <h1 className={s.title}>Car List</h1>
                            <SuperButton onClick={onOpenAddCarModal} className={commonS.commonButton}>Add
                                Car</SuperButton>
                        </div>
                        <TableContainer className={classes.table} component={Paper}>
                            <Table aria-label="simple table" className={s.carsTable}>
                                <TableHead>
                                    <TableRow className={s.tableTitles}>
                                        <TableCell align="left" className={classes.tableCell}>
                                            <div className={s.sortCell}>
                                                Brand
                                                <span className={s.sortBtn} onClick={sortByBrandUp}>
                                                <img src={arrowUp} alt="arrow-up"/>
                                            </span>
                                                <span className={s.sortBtn} onClick={sortByBrandDown}>
                                                <img src={arrowDown} alt="arrow-down"/>
                                            </span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={classes.tableCell}>Car Number</TableCell>
                                        <TableCell align="left" className={classes.tableCell}>Engine Type</TableCell>
                                        <TableCell align="left" className={classes.tableCell}>Model</TableCell>
                                        <TableCell align="right" className={classes.tableCell}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cars
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((car, index) => (
                                            <TableRow key={car.id}>
                                                <TableCell className={classes.tableCell} component="th" scope="row">
                                                    <div className={s.currentCarRedirect}
                                                         onClick={() => onVisitCurrentCar(car.id)}>
                                                        {car.brand}
                                                    </div>
                                                </TableCell>
                                                <TableCell className={classes.tableCell}
                                                           align="left">{car.carNumber}</TableCell>
                                                <TableCell className={classes.tableCell}
                                                           align="left">{car.engineType}</TableCell>
                                                <TableCell className={classes.tableCell}
                                                           align="left">{car.model}</TableCell>
                                                <TableCell align="right"
                                                           className={s.buttons + ' ' + classes.tableCell}>
                                                    <button onClick={() => onOpenEditCarModal(car.id)}>
                                                        <img src={editImg} alt="edit"/>
                                                    </button>
                                                    <button onClick={() => onDeleteCar(car.id)}>
                                                        <img src={deleteImg} alt="delete"/>
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component={'div'}
                                count={cars.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onPageChange={handleChangePage}/>
                        </TableContainer>
                    </div>
                </section>
                <SuperModal active={addCarModal} setActive={setAddCarModal}>
                    <h2>Add New Car</h2>
                    <button className={s.closeModal} onClick={onCloseAddCarModal}>
                        <img src={closeModal} alt="close-modal"/>
                    </button>
                    <form onSubmit={addCarFormik.handleSubmit} className={s.form}>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'brand'}
                                type={'text'}
                                {...addCarFormik.getFieldProps('brand')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Brand</label>
                            {addCarFormik.touched.brand && addCarFormik.errors.brand ? (
                                <div className={commonS.error}>{addCarFormik.errors.brand}</div>
                            ) : null}
                        </div>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'model'}
                                type={'text'}
                                {...addCarFormik.getFieldProps('model')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Model</label>
                            {addCarFormik.touched.model && addCarFormik.errors.model ? (
                                <div className={commonS.error}>{addCarFormik.errors.model}</div>
                            ) : null}
                        </div>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'carNumber'}
                                type={'text'}
                                {...addCarFormik.getFieldProps('carNumber')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Car Number</label>
                            {addCarFormik.touched.carNumber && addCarFormik.errors.carNumber ? (
                                <div className={commonS.error}>{addCarFormik.errors.carNumber}</div>
                            ) : null}
                        </div>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'engineType'}
                                type={'text'}
                                {...addCarFormik.getFieldProps('engineType')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Engine Type</label>
                            {addCarFormik.touched.engineType && addCarFormik.errors.engineType ? (
                                <div className={commonS.error}>{addCarFormik.errors.engineType}</div>
                            ) : null}
                        </div>
                        <div className={s.formButtons}>
                            <SuperButton type={"button"} onClick={onCloseAddCarModal}
                                         className={commonS.cancelButton}>Cancel</SuperButton>
                            <SuperButton type={'submit'} className={commonS.commonButton}>Ok</SuperButton>
                        </div>
                    </form>
                </SuperModal>
                <SuperModal active={editCarModal} setActive={setEditCarModal}>
                    <h2>EDIT CAR INFORMATION</h2>
                    <button className={s.closeModal} onClick={onCloseEditCarModal}>
                        <img src={closeModal} alt="close-modal"/>
                    </button>
                    <form onSubmit={editCarFormik.handleSubmit} className={s.form}>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'brand'}
                                type={'text'}
                                {...editCarFormik.getFieldProps('brand')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Brand</label>
                            {editCarFormik.touched.brand && editCarFormik.errors.brand ? (
                                <div className={''}>{editCarFormik.errors.brand}</div>
                            ) : null}
                        </div>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'model'}
                                type={'text'}
                                {...editCarFormik.getFieldProps('model')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Model</label>
                            {editCarFormik.touched.model && editCarFormik.errors.model ? (
                                <div className={''}>{editCarFormik.errors.model}</div>
                            ) : null}
                        </div>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'carNumber'}
                                type={'text'}
                                {...editCarFormik.getFieldProps('carNumber')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Car Number</label>
                            {editCarFormik.touched.carNumber && editCarFormik.errors.carNumber ? (
                                <div className={''}>{editCarFormik.errors.carNumber}</div>
                            ) : null}
                        </div>
                        <div className={commonS.formLine}>
                            <SuperInputText
                                id={'engineType'}
                                type={'text'}
                                {...editCarFormik.getFieldProps('engineType')}
                                placeholder={' '}
                            />
                            <label className={commonS.formLabel}>Engine Type</label>
                            {editCarFormik.touched.engineType && editCarFormik.errors.engineType ? (
                                <div className={''}>{editCarFormik.errors.engineType}</div>
                            ) : null}
                        </div>
                        <div className={s.formButtons}>
                            <SuperButton type={"button"} onClick={onCloseEditCarModal}
                                         className={commonS.cancelButton}>Cancel</SuperButton>
                            <SuperButton type={'submit'} className={commonS.commonButton}>Ok</SuperButton>
                        </div>
                    </form>
                </SuperModal>
            </>
    )
})

export default CarList