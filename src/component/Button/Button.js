import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({ children, outline = false, small = false, className, onClick, ...props }) {
    const classes = cx('btn', {
        [className]: className,
        outline,
        small,
    });
    return (
        <button className={classes} onClick={onClick ? () => onClick() : null}>
            {children}
        </button>
    );
}

export default Button;
