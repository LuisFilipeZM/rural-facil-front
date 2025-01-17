import { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import InputMask from 'react-input-mask';
import './styles.css';

export function DadosCliente() {
    const [user, setUser] = useState(null);
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
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
    const [apiResponse, setApiResponse] = useState('');
    const [clienteId, setClienteId] = useState(0);
    const [editando, setEditando] = useState(false);

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

        if (!editando) {
            const response = await fetch(`http://localhost:8080/api/cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify({
                    acessoPessoa: {
                        login: user?.username,
                    },
                    cpf: cpf.replace(/\D/g, ''),
                    dataNascimento: new Date(dataNascimento).toISOString(),
                    endereco,
                    nome,
                    whatsApp: "55" + whatsApp.replace(/\D/g, ''),
                })
            });
        } else {
            const response = await fetch(`http://localhost:8080/api/cliente/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify({
                    acessoPessoa: {
                        login: user?.username,
                    },
                    cpf: cpf.replace(/\D/g, ''),
                    dataNascimento: new Date(dataNascimento).toISOString(),
                    endereco,
                    nome,
                    whatsApp: "55" + whatsApp.replace(/\D/g, ''),
                })
            });
        }

        const data = await response.json();
        if (response.ok) {
            setApiResponse("Dados salvos com sucesso!");
        } else {
            setApiResponse(data.erro);
        }
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
        console.log(userData);
        const userId = userData?.id;

        try {
            const response = await fetch(`http://localhost:8080/api/cliente/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData?.accessToken}`
                },
            });

            const data = await response.json();
            setNome(data.nome);
            setCpf(data.cpf);
            setDataNascimento(new Date(data.dataNascimento[0], data.dataNascimento[1] - 1, data.dataNascimento[2]).toISOString().split('T')[0]);
            setWhatsApp(data.whatsApp);
            setEndereco(data.endereco);
            setClienteId(data.id);

            if (data.id) {
                setEditando(true);
            } else {
                setEditando(false);
            }
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
                                <label className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" value={nome} onChange={e => setNome(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">CPF</label>
                                <input type="text" className="form-control" id="cpf" value={cpf} onChange={e => setCpf(formatCPF(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data de nascimento</label>
                                <input type="date" className="form-control" id="datanascimento" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <Button variant="primary" onClick={handleShowModal}>
                                    Adicionar Endereço
                                </Button>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">WhatsApp / Celular</label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    className="form-control"
                                    value={whatsApp}
                                    onChange={e => setWhatsApp(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">{!editando ? "Salvar dados" : "Editar dados"}</button>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{endereco.logradouro ? 'Alterar Endereço' : 'Adicionar Endereço'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="logradouro" className="form-label">Logradouro</label>
                                    <input type="text" className="form-control" id="logradouro" placeholder="R. Jacinto Machado" value={endereco.logradouro} onChange={e => setEndereco({ ...endereco, logradouro: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="numero" className="form-label">Número</label>
                                    <input type="number" className="form-control" id="numero" placeholder="123" value={endereco.numero} onChange={e => {
                                        const value = parseInt(e.target.value);
                                        if (value >= 0) {
                                            setEndereco({ ...endereco, numero: String(value) });
                                        }
                                    }} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="complemento" className="form-label">Complemento</label>
                                    <input type="text" className="form-control" id="complemento" placeholder="Apto. sol nascente" value={endereco.complemento} onChange={e => setEndereco({ ...endereco, complemento: e.target.value })} required />
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="municipio" className="form-label">Município</label>
                                    <select className="form-select" id="municipio" value={endereco.municipio} onChange={e => setEndereco({ ...endereco, municipio: e.target.value })} required>
                                        <option value="">Selecione o município</option>
                                        <option value="Araranguá">Araranguá</option>
                                        <option value="Criciúma">Criciúma</option>
                                        <option value="Içara">Içara</option>
                                        <option value="Jacinto Machado">Jacinto Machado</option>
                                        <option value="Lauro Müller">Lauro Müller</option>
                                        <option value="Maracajá">Maracajá</option>
                                        <option value="Meleiro">Meleiro</option>
                                        <option value="Muller">Muller</option>
                                        <option value="Morro da Fumaça">Morro da Fumaça</option>
                                        <option value="Nova Veneza">Nova Veneza</option>
                                        <option value="Praia Grande">Praia Grande</option>
                                        <option value="São João do Sul">São João do Sul</option>
                                        <option value="Timbé do Sul">Timbé do Sul</option>
                                        <option value="Turvo">Turvo</option>
                                        <option value="Siderópolis">Siderópolis</option>
                                        <option value="Urussanga">Urussanga</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cep" className="form-label">CEP</label>
                                    <input type="text" className="form-control" id="cep" value={endereco.cep} placeholder="88830-208" maxLength={8} onChange={e => setEndereco({ ...endereco, cep: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bairro" className="form-label">Bairro</label>
                                    <input type="text" className="form-control" id="bairro" value={endereco.bairro} placeholder="Centro" onChange={e => setEndereco({ ...endereco, bairro: e.target.value })} required />
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
                <Modal show={apiResponse !== null} onHide={() => setApiResponse('')} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Atenção!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>{apiResponse}</pre>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    )
}