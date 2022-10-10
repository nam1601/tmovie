import 'boxicons';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);
function Modal({ active, ...props }) {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(active);
    }, [active]);

    return (
        <div id={props.id} className={cx('modal', `${isActive ? 'active' : ''}`)}>
            {props.children}
        </div>
    );
}
export function ModalContent({ ...props }) {
    const contentRef = useRef(null);
    const closeModal = () => {
        contentRef.current.parentNode.classList.remove(cx('active'));
        if (props.onClose) props.onClose();
    };
    return (
        <div ref={contentRef} className={cx('modal__content')}>
            {props.children}
            <div className={cx('modal__content__close')} onClick={closeModal}>
                <i className={cx('bx bx-x')}></i>
            </div>
        </div>
    );
}

export default Modal;
