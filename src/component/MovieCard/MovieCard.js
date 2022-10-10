import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import apiConfig from '~/api/apiConfig';
import { category } from '~/api/tmdbApi';
import Button from '../Button';

import styles from './MovieCard.module.scss';

const cx = classNames.bind(styles);
function MovieCard({ ...props }) {
    const item = props.item;
    const link = '/' + category[props.category] + '/' + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className={cx('movie-card')} style={{ backgroundImage: `url(${bg})` }}>
                <Button className={cx('Btn')}>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3 className={cx('movie-name')}>{item.name || item.title}</h3>
        </Link>
    );
}

export default MovieCard;
