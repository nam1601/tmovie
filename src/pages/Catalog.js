import { useParams } from 'react-router-dom';
import PageHeader from '~/component/PageHeader';
import { category as cate } from '~/api/tmdbApi';
import MovieGrid from '~/component/MovieGrid';
function CatalogPage() {
    const { category } = useParams();
    return (
        <>
            <PageHeader>{category === cate.movie ? 'Movies' : 'Tv Series'}</PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category} />
                </div>
            </div>
        </>
    );
}

export default CatalogPage;
