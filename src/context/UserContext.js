import { useContext, useState, createContext } from 'react';
import { postLogin } from '../services/UserSevice';

const UserContext = createContext();
function UserProvider({ children }) {
    const [user, setUser] = useState({ email: '', auth: false });

    const loginContext = (email) => {
        setUser((user) => ({ email: email, auth: true }));
        // console.log(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUser((user) => ({
            email: '',
            auth: false,
        }));
        // console.log(user);
    };

    return <UserContext.Provider value={{ user, loginContext, logout }}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
