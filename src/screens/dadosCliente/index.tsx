import { useState } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import './styles.css';

export function DadosCliente() {

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
        tipoEndereco: ''
    });
    const [nome, setNome] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const [novoEndereco, setNovoEndereco] = useState({
        bairro: '',
        cep: '',
        complemento: '',
        inscricaoIncra: '',
        logradouro: '',
        municipio: '',
        numero: '',
        tipoEndereco: ''
    });

    const handleSaveEndereco = () => {
        setEndereco(prevState => ({
            ...prevState,
            novoEndereco
        }));
        setNovoEndereco({
            bairro: '',
            cep: '',
            complemento: '',
            inscricaoIncra: '',
            logradouro: '',
            municipio: '',
            numero: '',
            tipoEndereco: ''
        });
        handleCloseModal();
    }

    async function submitForm() {
        event?.preventDefault();
        await fetch('http://localhost:8080/api/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cpf,
                dataNascimento,
                email,
                endereco,
                nome,
                whatsApp
            })
        })
    }

    function formatCPF(value: string) {
        const cleanedValue = value.replace(/\D/g, '');
        const firstPart = cleanedValue.slice(0, 3);
        const secondPart = cleanedValue.slice(3, 6);
        const thirdPart = cleanedValue.slice(6, 9);
        const verificationDigit = cleanedValue.slice(9, 11);
        return `${firstPart}.${secondPart}.${thirdPart}-${verificationDigit}`;
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-dados">
                        <h1 className='text-center'>Seus Dados</h1>
                        <form>
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
                            <button type="submit" className="btn btn-success" onClick={submitForm}>Salvar dados</button>
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
        </div>
    )
}