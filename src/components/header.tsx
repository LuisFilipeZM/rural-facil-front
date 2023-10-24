import logoHeader from '../assets/logo-header.svg';

export function Header() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid d-flex justify-content-around">
                <div>
                    <a href="/" className="navbar-brand m-2">Inicio</a>
                    <a href="/login" className="navbar-brand m-2">Sobre</a>
                    <a href="" className="navbar-brand m-2">Contato</a>
                </div>
                <div>
                    <img src={logoHeader} alt="logo" />
                </div>
                <div>
                    <button className="btn btn-outline-success m-2">Cadastre-se</button>
                    <button className="btn btn-success m-2 px-4">Entrar</button>
                </div>
            </div>
        </nav>
    );
}
