import { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import './styles.css';

export function DadosCliente() {
    const [user, setUser] = useState(null);
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState({
        bairro: '',
        cep: '',
        complemento: '',
        inscricaoIncra: '',
        logradouro: '',
        municipio: '',
        numero: '',
    });
    const [nome, setNome] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleSaveEndereco = () => {
        handleCloseModal();
    }

    async function getUsuario() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            setUser(user);
        }
    }

    async function submitForm(event: React.FormEvent) {
        event.preventDefault();

        if (!user && !user?.accessToken) {
            console.error('User ID is undefined');
            return;
        }

        const response = await fetch(`http://localhost:8080/api/cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.accessToken}` // Adiciona o token na header
            },
            body: JSON.stringify({
                acessoPessoa: {
                    login: user?.username,
                },
                cpf: cpf.replace(/\D/g, ''), // Remove a formatação do CPF
                dataNascimento: new Date(dataNascimento).toISOString(),
                email,
                endereco,
                nome,
                whatsApp
            })
        });

        const data = await response.json();
        setApiResponse(data); // Set the API response
    }

    function formatCPF(value: string) {
        const cleanedValue = value.replace(/\D/g, '');
        const firstPart = cleanedValue.slice(0, 3);
        const secondPart = cleanedValue.slice(3, 6);
        const thirdPart = cleanedValue.slice(6, 9);
        const verificationDigit = cleanedValue.slice(9, 11);
        return `${firstPart}.${secondPart}.${thirdPart}-${verificationDigit}`;
    }

    useEffect(() => {
        getUsuario();
        fetchClientData();
    }, [])

    async function fetchClientData() {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = userData?.id;

        try {
                const response = await fetch(`http://localhost:8080/api/cliente/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.accessToken}` // Adiciona o token na header
                },
            });

            const data = await response.json();
            // Set the client data
            setNome(data.nome);
            setCpf(data.cpf);
            setDataNascimento(data.dataNascimento);
            setEmail(data.email);
            setWhatsApp(data.whatsApp);
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-dados">
                        <h1 className='text-center'>Seus Dados</h1>
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" value={nome} onChange={e => setNome(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">CPF</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Data de nascimento</label>
                                <input type="date" className="form-control" id="exampleInputPassword1" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)}  />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputPassword2" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Button variant="primary" onClick={handleShowModal}>
                                    Adicionar Endereço
                                </Button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">WhatsApp</label>
                                <input type="text" className="form-control" id="exampleInputPassword2" value={whatsApp} onChange={e => setWhatsApp(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-success">Salvar dados</button>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Endereço</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="logradouro" className="form-label">Logradouro</label>
                                    <input type="text" className="form-control" id="logradouro" placeholder="R. Jacinto Machado" value={endereco.logradouro} onChange={e => setEndereco({...endereco, logradouro: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numero" className="form-label">Número</label>
                                    <input type="text" className="form-control" id="numero" placeholder="123" value={endereco.numero} onChange={e => setEndereco({...endereco, numero: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="complemento" className="form-label">Complemento</label>
                                    <input type="text" className="form-control" id="complemento" placeholder="Apto. sol nascente" value={endereco.complemento} onChange={e => setEndereco({...endereco, complemento: e.target.value})} />
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="municipio" className="form-label">Município</label>
                                    <input type="text" className="form-control" id="municipio" value={endereco.municipio} placeholder="Criciúma" onChange={e => setEndereco({...endereco, municipio: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cep" className="form-label">CEP</label>
                                    <input type="text" className="form-control" id="cep" value={endereco.cep} placeholder="88830-208" onChange={e => setEndereco({...endereco, cep: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bairro" className="form-label">Bairro</label>
                                    <input type="text" className="form-control" id="bairro" value={endereco.bairro} placeholder="Centro" onChange={e => setEndereco({...endereco, bairro: e.target.value})} />
                                </div>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSaveEndereco}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
            {apiResponse && (
                <Modal show={apiResponse !== null} onHide={() => setApiResponse(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>API Response</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    )
}