import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import bg from '~/assets/footer-bg.jpg';
import logo from '~/assets/tmovie.png';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('footer')} style={{ backgroundImage: `url(${bg})` }}>
            <div className={cx('container', 'footer__content')}>
                <div className={cx('footer__content__logo')}>
                    <div className={cx('logo')}>
                        <img src={logo} alt="logo" />
                        <Link to="/">tMovies</Link>
                    </div>
                </div>
                <div className={cx('footer__content__menus')}>
                    <div className={cx('footer__content__menu')}>
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of service</Link>
                        <Link to="/">About us</Link>
                    </div>

                    <div className={cx('footer__content__menu')}>
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Privacy policy</Link>
                    </div>

                    <div className={cx('footer__content__menu')}>
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
