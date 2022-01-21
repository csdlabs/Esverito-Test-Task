import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import s from './Header.module.scss';
import headerLogo from './../../../assets/images/header-logo.svg'
import loginImg from './../../../assets/images/login.svg'

type HeaderPropsType = {
    isLoggedIn: string | null
    userName: string | null
}

const Header = React.memo(({isLoggedIn, userName}:HeaderPropsType) => {
    const navigate = useNavigate()

    const onLoginHandler = React.useCallback(() => {
        navigate('/login')
    }, [navigate])


    return (
        <header className={s.header}>
            <div className={s.inner}>
                <NavLink to={'/car-list'} className={s.logoInner}>
                    <img src={headerLogo} alt="header-logo"/>
                    <p className={s.logoText}>MyCar</p>
                </NavLink>
                <div className={s.loginInner}>
                    <p>{userName}</p>
                    <button disabled={isLoggedIn === 'true'} onClick={onLoginHandler} className={s.loginBtn}>
                        <img src={loginImg} alt="login-img"/>
                    </button>
                </div>
            </div>
        </header>
    )
})

export default Header