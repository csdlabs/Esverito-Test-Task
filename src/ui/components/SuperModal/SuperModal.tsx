import React from "react";
import s from './SuperModal.module.scss'

type SuperModalPropsType = {
    active: boolean
    setActive: Function
    children: any
}


const SuperModal = React.memo(({active, setActive, children}: SuperModalPropsType) => {
    return(
        <div className={active ? s.modal + ' ' + s.active : s.modal} onClick={()=>setActive(false)}>
            <div className={active ? s.modalContent + ' ' + s.active : s.modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
})

export default SuperModal