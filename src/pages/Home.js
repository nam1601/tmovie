import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '~/api/tmdbApi';
import Button from '~/component/Button';

import HeroSlide from '~/component/HeroSlide';
import MovieList from '~/component/MovieList';

function HomePage() {
    return (
        <>
            <HeroSlide />
            <div className="container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <Button outline className="small">
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated Movies</h2>
                        <Link to="/movie">
                            <Button outline className="small">
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <Button outline className="small">
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top rated TV</h2>
                        <Link to="/tv">
                            <Button outline small className="small">
                                View more
                            </Button>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated} />
                </div>
            </div>
        </>
    );
}

export default HomePage;
