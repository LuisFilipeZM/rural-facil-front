import { Link } from 'react-router-dom';
import logoHeader from '../assets/logo-header.svg';
import { FaSignOutAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export function Header() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/acessopessoa/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });
                const data = await response.json();
                if (data[0].admin === "ROLE_ADMIN") {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

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
                        <>{isAdmin && (
                            <Link to="/cadastro-agricultor" className="btn btn-success btn-sm m-2">Cadastrar agricultor</Link>
                        )}
                            <Link to="/dados-cliente" style={{ textDecoration: 'none', color: "black" }}>{user.username}</Link>
                            <a href="/" onClick={logout} style={{ color: 'red', textDecoration: 'none' }}>
                                <FaSignOutAlt style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                            </a>
                        </>

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
