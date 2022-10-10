import { useEffect, useState, useHistory, useRef } from 'react';
import classNames from 'classnames/bind';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';

import styles from './HeroSlide.module.scss';
import tmdbApi, { category, movieType } from '~/api/tmdbApi';
import apiConfig from '~/api/apiConfig';
import Button from '../Button';
import { parsePath, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { ModalContent } from '../Modal/Modal';
import stylesModal from '../Modal/Modal.module.scss';

const cs = classNames.bind(stylesModal);
const cx = classNames.bind(styles);
function HeroSlide() {
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);
    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 7));
                console.log(response);
            } catch {
                console.log('errors');
            }
        };
        getMovies();
    }, []);

    return (
        <div className={cx('hero-slide')}>
            <Swiper
                loop={true}
                // observer={true}
                // observeParents={true}
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // direction="vertical"
                autoplay={{ delay: 4000 }}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => (
                <TrailerModal key={i} item={item} />
            ))}
        </div>
    );
}

export function HeroSlideItem({ item, className, ...props }) {
    let history = useNavigate();

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);
    const classesActive = cs('active');
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmdbApi.getVideos(category.movie, item.id);
        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector(' iframe').setAttribute('src', videoSrc);
            console.log(modal.querySelector('iframe').src);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer video';
        }

        modal.classList.toggle(classesActive);
    };
    const classes = cx('hero-slide__item', { [className]: className });
    return (
        <div className={classes} style={{ backgroundImage: `url(${background})` }}>
            <div className={cx('hero-slide__item__content')}>
                <div className={cx('hero-slide__item__content__info')}>
                    <h2 className={cx('title')}>{item.title}</h2>
                    <div className={cx('overview')}>{item.overview}</div>
                    <div className={cx('btns')}>
                        <Button onClick={() => history('/movie/' + item.id)}>Watch now</Button>
                        <Button outline onClick={setModalActive}>
                            Watch trailer
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('hero-slide__item__content__poster')}>
                <img className={cx('poster-img')} src={apiConfig.w500Image(item.poster_path)} alt="poster" />
            </div>
        </div>
    );
}
function TrailerModal({ item, ...props }) {
    const iframeRef = useRef(null);
    const onClose = () => {
        iframeRef.current.setAttribute('src', '');
    };
    return (
        <Modal id={cx(`modal_${item.id}`)} active={false}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    );
}
export default HeroSlide;
