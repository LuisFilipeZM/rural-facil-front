import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import './styles.css';
import { Link } from 'react-router-dom';


export function CadastroCliente() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role] = useState(['ROLE_CLIENTE']);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    async function submitForm() {
        event?.preventDefault();
        if (password !== confirmPassword) {
            setShowModal(true);
            return;
        }
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                role,
                username
            })
        });
        if (response.ok) {
            setShowSuccessModal(true);
        }
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setUsername(e.target.value);
    }

    function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value);
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-login" style={{ height: 450 }}>
                        <h1 className='text-center m-2'>Crie sua conta, grátis!</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">Repita sua senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" value={confirmPassword} onChange={handleConfirmPasswordChange}  />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg" onClick={submitForm}>Cadastrar</button>
                            <div className="forgot-password mt-3">
                                <p>Já possui uma conta? <a href="/login">Faça login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Senhas não coincidem!</Modal.Title>
                </Modal.Header>
                <Modal.Body>As senhas devem ser iguais. Por favor, tente novamente.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Conta criada com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sua conta foi criada com sucesso. Faça login para acessar sua conta.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                        <Link to="/login">Fechar</Link>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
