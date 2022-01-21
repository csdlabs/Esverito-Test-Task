import React, {ChangeEvent} from "react";
import s from './EditableSpan.module.scss';

type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
    className: string
}


const EditableSpan = React.memo(({title, callback, className}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = React.useState(false)
    const [inputTitle, setTitle] = React.useState(title)


    const onChangeHandler = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    },[])
    const onExitEditMode = React.useCallback(() => {
        if(inputTitle){
            setEditMode(false)
            callback(inputTitle)
        }
        else{
            setTitle('Please enter value')
        }
    },[callback, inputTitle])


    return (
        <div className={''}>
            {editMode
                ? <input
                    value={inputTitle}
                    onChange={onChangeHandler}
                    onBlur={onExitEditMode}
                    autoFocus={true}
                />
                :
                <span
                    className={s.span}
                    onDoubleClick={() => setEditMode(true)}>
                {title}
                </span>}
        </div>
    )
})

export default EditableSpan