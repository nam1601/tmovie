import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '~/assets/tmovie.png';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);
const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
    {
        display: 'Login',
        path: '/login',
    },
];
function Header() {
    const { pathname } = useLocation();
    const headerRef = useRef(null);
    const active = headerNav.findIndex((e) => e.path === pathname);
    const classShrink = cx('shrink');
    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
                headerRef.current.classList.add(`${classShrink}`);
            } else {
                headerRef.current.classList.remove(`${classShrink}`);
            }
        };
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        };
    }, []);

    return (
        <div ref={headerRef} className={cx('header')}>
            <div className={cx('header__wrapp', 'container')}>
                <div className={cx('logo')}>
                    <img src={logo} alt="logo" />
                    <Link to="/">tMovies</Link>
                </div>
                <ul className={cx('header__nav')}>
                    {headerNav.map((e, i) => (
                        <li key={i} className={cx(`${i === active ? 'active' : ''}`)}>
                            <Link to={e.path}>{e.display}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
