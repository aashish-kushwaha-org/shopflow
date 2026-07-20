import { NavLink } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '12rem' }}>404</h1>
            <p style={{ fontSize: '3rem' }}>Page Not Found</p>
            <NavLink style={{ fontSize: '2rem' }} to="/">
                Go To Home
            </NavLink>
        </div>
    );
};
