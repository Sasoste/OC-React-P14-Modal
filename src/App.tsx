import React, { useState } from 'react';
import Modal from './Modal';

export const App: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)}>Ouvrir la modale</button>
            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                closeOnOverlayClick={false}
                closeOnEscape={true}
                showCloseButton={true}
                closeButtonPosition="bottom-right"
                border="1px solid #ccc"
                boxShadow="none"
                text="test"
                textStyle={{ fontSize: '18px', color: 'red', fontWeight: 'bold' }}
            />
        </>
    );
};
