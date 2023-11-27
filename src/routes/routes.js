import Home from '../pages/Home';
import Login from '../pages/Login';
import ManageUsers from '../pages/ManageUsers';

const privateRoutes = [{ path: '/users', element: <ManageUsers /> }];
const publicRoutes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
];

export { privateRoutes, publicRoutes };
