/* eslint-disable default-case */
import classNames from 'classnames/bind';
import { useState, useEffect, Fragment, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { category, movieType, tvType } from '~/api/tmdbApi';
import tmdbApi from '~/api/tmdbApi';
import styles from './MovieGrid.module.scss';
import MovieCard from '../MovieCard';
import Button from '../Button';
import Input from '../Input';

const cx = classNames.bind(styles);

function MovieGrid({ ...props }) {
    const [items, setItems] = useState([]);
    const [prevItems, setPrevItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                console.log(props.category);
                switch (props.category) {
                    case category.movie: {
                        response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                        break;
                    }
                    default: {
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                    }
                }
                setPrevItems(response.results);
            } else {
                console.log(false);
                const params = {
                    query: keyword,
                };
                console.log(props.category);
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [props.category, keyword]);
    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = { page: page + 1 };
            switch (props.category) {
                case category.movie: {
                    response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                    break;
                }
                default: {
                    response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    };
    const hideAnyway = async () => {
        setItems(prevItems);
        setPage(1);
        window.scroll(0, 0);
    };
    return (
        <>
            <div className={cx('section', 'mb-3')}>
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            <div className={cx('movie-grid')}>
                {items.map((item, i) => (
                    <MovieCard category={props.category} item={item} key={i} />
                ))}
            </div>

            <div className={cx('movie-grid__button')}>
                {page < totalPage ? (
                    <div className={cx('movie-grid__loadmore')}>
                        <Button outline small onClick={loadMore}>
                            Load more
                        </Button>
                    </div>
                ) : null}
                {page > 1 ? (
                    <div className={cx('movie-grid__hide')}>
                        <Button outline small onClick={hideAnyway}>
                            Hide
                        </Button>
                    </div>
                ) : null}
            </div>
        </>
    );
}

const MovieSearch = ({ ...props }) => {
    const history = useNavigate();
    const [keyword, setKeyWord] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            history(`/${category[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, history]);
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => document.removeEventListener('keyup', enterEvent);
    }, [keyword, goToSearch]);
    return (
        <div className={cx('movie-search')}>
            <Input
                type="text"
                placeholder="Enter the film name"
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
            />
            <Button small onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
};

export default MovieGrid;
