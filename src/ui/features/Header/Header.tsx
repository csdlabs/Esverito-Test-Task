import React from "react";
import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import s from './Header.module.scss';
import headerLogo from './../../../assets/images/header-logo.svg'
import {RootStateType} from "../../../store/store";
import loginImg from './../../../assets/images/login.svg'

const Header = React.memo(() => {
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const userName = useSelector<RootStateType, string>(state => state.auth.userName)
    const navigate = useNavigate()

    const onLoginHandler = React.useCallback(() => {
        navigate('/login')
    },[navigate])

    return (
        <header className={s.header}>
            <div className={s.inner}>
                <NavLink to={'/car-list'} className={s.logoInner}>
                    <img src={headerLogo} alt="header-logo"/>
                    <p className={s.logoText}>MyCar</p>
                </NavLink>
                <div className={s.loginInner}>
                    {isLoggedIn ? <p>{userName}</p> : null}
                    <button onClick={onLoginHandler} className={s.loginBtn}>
                        <img src={loginImg} alt="login-img"/>
                    </button>
                </div>
            </div>
        </header>
    )
})

export default Header