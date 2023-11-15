import { Link } from 'react-router-dom';
import logoHeader from '../assets/logo-header.svg';

export function Header() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-around">
                <div>
                    <Link to="/" className="navbar-brand m-2">Inicio</Link>
                    <Link to="/" className="navbar-brand m-2">Sobre</Link>
                    <Link to="/" className="navbar-brand m-2">Contato</Link>
                </div>
                <div>
                    <img src={logoHeader} alt="logo" />
                </div>
                <div>
                    <Link to="/cadastro-cliente" className="btn btn-outline-success m-2">Cadastre-se</Link>
                    <Link to="/login" className="btn btn-success m-2 px-4">Entrar</Link>
                </div>
            </div>
        </nav>
    );
}
