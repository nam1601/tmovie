import classNames from 'classnames/bind';

import styles from './PageHeader.module.scss';
import bg from '~/assets/footer-bg.jpg';

const cx = classNames.bind(styles);

function PageHeader({ ...props }) {
    return (
        <div className={cx('page-header')} style={{ backgroundImage: `url(${bg})` }}>
            <h2>{props.children}</h2>
        </div>
    );
}

export default PageHeader;
