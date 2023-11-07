import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {Toast, ToastContainer} from "react-bootstrap";
import './styles.scss';

export const ToastContext = createContext({});

export const useToastContext = () => useContext(ToastContext);

const ToastContextProvider = ({children}) => {

    const [toasts, setToasts] = useState([]); //{id, text, variant, show}

    const pushToast = useCallback((toast) => {
        setToasts(prevState => [...prevState, {id: Math.random(), ...toast, show: true}])
    }, [setToasts]);

    const value = useMemo(() => ({pushToast}), [pushToast]);

    const removeToast = useCallback((id, index) => {
        setToasts(prevState => {
            if (prevState[index].id === id) {
                prevState[index].show = false;
            }
            return [...prevState];
        })
    }, [setToasts])

    return <>
        <ToastContext.Provider value={value}>
            <ToastContainer position={"top-end"} className={'my-toast-container'}>
                {toasts.map(({id, text, variant, show}, index) => <Toast
                    key={id}
                    show={show}
                    bg={variant}
                    onClose={() => removeToast(id, index)}
                    autohide
                >
                    <Toast.Body>{text}</Toast.Body>
                </Toast>)}
            </ToastContainer>
            {children}
        </ToastContext.Provider>
    </>
};

export default ToastContextProvider;
