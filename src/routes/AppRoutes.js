import { Routes, Route } from 'react-router-dom';

import { privateRoutes, publicRoutes } from './routes';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Alert from 'react-bootstrap/Alert';

function AppRoutes() {
    const { user } = useContext(UserContext);
    return (
        <>
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}

                {privateRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            user.email ? (
                                route.element
                            ) : (
                                <Alert variant="danger">
                                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                    <p>You haven't logged in, so you can't access this route</p>
                                </Alert>
                            )
                        }
                    />
                ))}
                <Route
                    path="*"
                    element={
                        <Alert variant="danger">
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>Route not found</p>
                        </Alert>
                    }
                />
            </Routes>
        </>
    );
}

export default AppRoutes;
