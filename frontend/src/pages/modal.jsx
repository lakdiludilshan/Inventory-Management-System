import { useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalBody = styled.div`
    background-color: white;
    padding: 16px;
    border-radius: 8px;
`;

const Modal = ({ children }) => {
    const [shouldShow, setShouldShow] = useState(false)

    return (
        <>
        <button onClick={() => setShouldShow(true)}>Show Modal</button>
        {shouldShow && (
            <ModalBackground onClick={() => setShouldShow(false)}>
            <ModalBody onClick={e => e.stopPropagation()}>
                <button onClick={() => setShouldShow(false)}>Hide Modal</button>
                {children}
            </ModalBody>
            </ModalBackground>
        )}
        </>
    );
}

export default Modal;