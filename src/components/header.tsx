import { Link } from 'react-router-dom';
import logoHeader from '../assets/logo-header.svg';
import { FaSignOutAlt } from 'react-icons/fa';


export function Header() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    function logout() {
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-around">
                <div>
                    <Link to="/" className="navbar-brand m-2">Inicio</Link>
                    <Link to="/" className="navbar-brand m-2">Sobre</Link>
                    <Link to="/mercado" className="navbar-brand m-2">Mercado</Link>
                </div>
                <div>
                    <img src={logoHeader} alt="logo" />
                </div>
                <div>
                    {user && Object.keys(user).length !== 0 ? (
                        <p>
                            {user.username} 
                            <a href="/" onClick={logout} style={{color: 'red', textDecoration: 'none'}}>
                                <FaSignOutAlt style={{verticalAlign: 'middle', marginLeft: '0.5rem'}} />
                            </a>
                        </p>
                    ) : (
                        <>
                            <Link to="/cadastro-cliente" className="btn btn-outline-success m-2">Cadastre-se</Link>
                            <Link to="/login" className="btn btn-success m-2 px-4">Entrar</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
