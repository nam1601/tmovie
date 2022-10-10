import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '~/api/apiConfig';
import tmdbApi, { category } from '~/api/tmdbApi';
import MovieCard from '../MovieCard';

import styles from './MovieList.module.scss';

const cx = classNames.bind(styles);

function MovieList({ ...props }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie: {
                        response = await tmdbApi.getMovieList(props.type, { params });
                        break;
                    }
                    default: {
                        response = await tmdbApi.getTvList(props.type, { params });
                    }
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        };
        getList();
    }, []);
    return (
        <div className={cx('movie-list')}>
            <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
                {items.map((item, i) => (
                    <SwiperSlide key={i}>
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MovieList;
