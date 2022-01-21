import React from "react";
import s from './StartPage.module.scss';
import commonS from './../CommonStyles.module.scss'
import SuperButton from "../../components/SuperButton/SuperButton";
import {useNavigate} from "react-router-dom";

const StartPage = React.memo(() => {
    const navigate = useNavigate();
    const onVisitLoginPage = React.useCallback(() => {
        navigate('/login')
    }, [navigate])
    return (
        <section className={s.start}>
            <div className={s.inner}>
                <h1 className={s.title}>Hi! This is Test Task for Esverito.</h1>
                <p className={s.text}>To continue using and to view this test task, please visit login page
                    by the link bellow and use test account data.</p>
                <p className={s.text}>Login: pidenkodmitriy@gmail.com</p>
                <p className={s.text}>Password: zcHuKhVgk68</p>
                <SuperButton className={s.button + ' ' + commonS.commonButton} onClick={onVisitLoginPage}>Visit Login
                    Page</SuperButton>
            </div>
        </section>
    )
})

export default StartPage