import React from "react";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInput/SuperInput";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {getAuthData} from "../../../store/auth-reducer";
import {useNavigate} from "react-router-dom";
import {RootStateType} from "../../../store/store";
import {LoadingStatusType} from "../../../store/app-reducer";
import s from './LoginForm.module.scss'
import commonS from './../CommonStyles.module.scss'


const LoginForm = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingStatus = useSelector<RootStateType, LoadingStatusType>(state => state.app.loadingStatus)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('This field is required'),
            password: Yup.string()
                .min(8, 'Must be at least 8 characters long')
                .required('This field is required'),
        }),
        onSubmit: (values) => {
            dispatch(getAuthData(values.email, values.password))
            formik.resetForm();
        },
    });
    if(loadingStatus === 'completed'){
        navigate('/car-list')
    }

    return(
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <div className={''}>
                <SuperInputText
                    id={'email'}
                    type={'email'}
                    {...formik.getFieldProps('email')}
                    placeholder={' '}
                />
                <label className={''}>Email</label>
                {formik.touched.email && formik.errors.email ? (
                    <div className={''}>{formik.errors.email}</div>
                ) : null}
            </div>
            <div className={''}>
                <SuperInputText
                    id={'password'}
                    type={'password'}
                    {...formik.getFieldProps('password')}
                    placeholder={' '}
                />
                <label className={''}>Password</label>
                {formik.touched.password && formik.errors.password ? (
                    <div className={''}>{formik.errors.password}</div>
                ) : null}
            </div>
            <SuperButton type={'submit'} className={commonS.commonButton}>Login</SuperButton>
        </form>
    )
})

export default LoginForm