import React from "react";
import { toast, ToastContent, ToastOptions } from "react-toastify";
import {
    FaInfo,
    FaCheck,
    FaExclamationTriangle,
    FaBug,
    FaExclamationCircle,
} from "react-icons/fa";


interface ToastMessageProps {
    type: "success" | "info" | "error" | "warning";
    message: string;
}

export const displayIcon = (type: string) => {
    switch (type) {
        case "success":
            return <FaCheck />;
        case "info":
            return <FaInfo />;
        case "error":
            return <FaExclamationCircle />;
        case "warning":
            return <FaExclamationTriangle />;
        default:
            return <FaBug />;
    }
};

const ToastMessage: React.FC<ToastMessageProps> = ({ type, message }) => {
    const options: ToastOptions = {
        position: "top-right",
        autoClose: 3000, // Tempo de exibição em milissegundos (5 segundos)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const content: ToastContent = (
        <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
                {message}
            </div>
        </div>
    );

    toast[type](content, options);
    return null; // Componente não renderiza nada, é apenas para exibir o toast
};



export default ToastMessage;