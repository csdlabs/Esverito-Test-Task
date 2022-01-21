import React from "react";
import LoginForm from "./LoginForm";

const Login = React.memo(() => {
    return(
        <section>
            <LoginForm/>
        </section>
    )
})
export default Login