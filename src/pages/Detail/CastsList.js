import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbApi from '~/api/tmdbApi';

import styles from './Detail.module.scss';
import apiConfig from '~/api/apiConfig';
const cx = classNames.bind(styles);

function CastsList({ ...props }) {
    const { category } = useParams();
    const [casts, setCasts] = useState([]);
    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id);
            console.log(res.cast);
            setCasts(res.cast.slice(0, 5));
        };
        getCredits();
    }, [category, props.id]);
    return (
        <div className={cx('casts')}>
            {casts.map((item, i) => (
                <div key={i} className={cx('casts__item')}>
                    <div
                        className={cx('casts__item__img')}
                        style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}
                    ></div>
                    <p className={cx('casts__item__name')}>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastsList;
