import React, { useEffect, useState } from 'react';

type CloseButtonPosition = 'top-right' | 'bottom-right';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    text?: string;
    fadeDuration?: number;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    closeButtonClass?: string;
    closeButtonText?: string;
    closeButtonPosition?: CloseButtonPosition;
    className?: string;
    overlayClassName?: string;
    border?: string;
    boxShadow?: string;
    children?: React.ReactNode;
    textStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    text,
    fadeDuration = 300,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    closeButtonClass = '',
    closeButtonText = 'Close',
    closeButtonPosition = 'top-right',
    className = '',
    overlayClassName = '',
    border = 'none',
    boxShadow = 'none',
    children,
    textStyle = {},
}) => {
    const [visible, setVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timeout = setTimeout(() => setVisible(false), fadeDuration);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, fadeDuration]);

    useEffect(() => {
        if (!isOpen || !closeOnEscape) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, closeOnEscape, onClose]);

    if (!visible) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `opacity ${fadeDuration}ms ease`,
        opacity: isOpen ? 1 : 0,
    };

    const modalStyle: React.CSSProperties = {
        background: '#fff',
        padding: '20px 20px 20px 20px',
        borderRadius: '5px',
        transition: `opacity ${fadeDuration}ms ease`,
        opacity: isOpen ? 1 : 0,
        display: 'inline-block',
        textAlign: 'center',
        position: 'relative',
        border: border,
        boxShadow: boxShadow,
        maxWidth: '30%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
    };

    let closeButtonStyle: React.CSSProperties = {};

    if (closeButtonPosition === 'top-right') {
        closeButtonStyle = {
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: '#eee',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            lineHeight: '24px',
            textAlign: 'center',
            padding: 0,
            fontWeight: 'bold'
        };
        closeButtonText = '✕';
    } else if (closeButtonPosition === 'bottom-right') {
        closeButtonStyle = {
            display: 'flex',
            justifySelf: 'end',
            marginTop: '10px',
            background: '#ddd',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer',
            borderRadius: '3px',
        };
    }

    return (
        <div
            className={`modal-overlay ${overlayClassName}`}
            style={overlayStyle}
            onClick={handleOverlayClick}
        >
            <div className={`modal-window ${className}`} style={modalStyle}>
                {text && <div style={textStyle}>{text}</div>}
                {!text && children}
                {showCloseButton && (
                    <button
                        className={`close-modal ${closeButtonClass}`}
                        style={closeButtonStyle}
                        onClick={onClose}
                    >
                        {closeButtonText}
                    </button>
                )}

            </div>
        </div>
    );
};

export default Modal