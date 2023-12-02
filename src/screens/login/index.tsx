import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import logoHome from '../../assets/logo-home.svg'
import loadingGif from '../../assets/loading.gif'
import '../login/styles.css'

export function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        if (storedUsername && storedPassword) {
            setUsername(storedUsername);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });  
        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                if (data.roles[0] === "Agricultor") {
                        navigate('/dados-agricultor');
                    } else {
                        navigate('/dados-cliente');    
                    }
            }, 2000);
        } else {
            setShowModal(true);
        }
        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    }
    

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div className="row" style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <img src={logoHome} alt="logo" />
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="card-entrar">
                        <h1 className='text-center'>Entrar</h1>
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Insira seu E-mail" value={username} onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Insira sua senha" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-2 form-check">
                                <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                                <label className="form-check-label mt-1" htmlFor="exampleCheck1">Lembrar-me</label>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-success btn-lg mt-2 px-5">Entrar</button>
                            </div>
                            <div className="mt-3 d-flex justify-content-center align-items-center">
                                <p>Não possui conta? <a href="/cadastro-cliente">Cadastre-se já!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Erro de login</Modal.Title>
                </Modal.Header>
                <Modal.Body>Usuário ou senha incorretos. Por favor, tente novamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-container">
                        <img src={loadingGif} alt="loading" />
                    </div>
                </div>
            )}
        </div>
    );
}
