import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';

import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';

function App() {
    const { loginContext } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'));
        }
    }, []);

    return (
        <div className="app-container">
            <Header />
            <Container>
                <AppRoutes />
                <ToastContainer />
            </Container>
        </div>
    );
}
export default App;
