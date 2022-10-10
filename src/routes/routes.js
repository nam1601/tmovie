import HomePage from '~/pages/Home';
import CatalogPage from '~/pages/Catalog';
import DetailPage from '~/pages/Detail/Detail';
import config from '~/config';
import Login from '~/features/Auth/Login';
const publicRoutes = [
    {
        path: config.routes.home,
        component: HomePage,
    },
    {
        path: config.routes.catalog1,
        component: CatalogPage,
    },
    {
        path: config.routes.detail,
        component: DetailPage,
    },
    {
        path: config.routes.catalog2,
        component: CatalogPage,
    },
    {
        path: config.routes.login,
        component: Login,
    },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
