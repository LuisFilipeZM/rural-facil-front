import logoHeader from '../assets/logo-header.svg';

export function Header() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <div className="d-flex justify-content-start">
                    <a href="/" className="navbar-brand m-3"><strong>Inicio</strong></a>
                    <a href="/login" className="navbar-brand m-3"><strong>Sobre</strong></a>
                    <a href="" className="navbar-brand m-3"><strong>Contato</strong></a>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={logoHeader} alt="logo" />
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-success m-2">Cadastre-se</button>
                    <button className="btn btn-success m-2">Entrar</button>
                </div>
            </div>
        </nav>
    );
}
