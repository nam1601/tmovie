import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import styles from './Detail.module.scss';
import CastsList from './CastsList';
import VideoList from './VideoList';
import MovieList from '~/component/MovieList';

const cx = classNames.bind(styles);

function DetailPage() {
    const { category, id } = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        };
        getDetail();
    }, [category, id]);

    return (
        <>
            {item && (
                <>
                    <div
                        className={cx('banner')}
                        style={{
                            backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`,
                        }}
                    ></div>
                    <div className={cx('mb-3 container', 'movie-content')}>
                        <div className={cx('movie-content__poster')}>
                            <div
                                className={cx('movie-content__poster__img')}
                                style={{
                                    backgroundImage: `url(${apiConfig.w500Image(
                                        item.poster_path || item.backdrop_path,
                                    )})`,
                                }}
                            ></div>
                        </div>
                        <div className={cx('movie-content__info')}>
                            <h1 className={cx('title')}>{item.title || item.name}</h1>
                            <div className={cx('genres')}>
                                {item.genres &&
                                    item.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className={cx('genres__item')}>
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>
                            <p className={cx('overview')}>{item.overview}</p>
                            <div className={cx('cast')}>
                                <div className={cx('section__header')}>
                                    <h2>Cast</h2>
                                </div>
                                <CastsList id={item.id} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('section mb-3')}>
                            <VideoList id={item.id} />
                        </div>
                        <div className={cx('section__header mb-2')}>
                            <h2>Similar</h2>
                        </div>
                        <MovieList category={category} type="similar" id={item.id} />
                    </div>
                </>
            )}
        </>
    );
}

export default DetailPage;
