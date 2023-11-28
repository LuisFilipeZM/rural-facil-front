import { useEffect, useState } from 'react';
import './styles.css';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function CadastroAnuncio() {
    const [categoria, setCategoria] = useState('');
    const [classificacao, setClassificacao] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [organico, setOrganico] = useState(false);
    const [nomeProduto, setNomeProduto] = useState('');
    const [sazionalidades, setSazionalidades] = useState('');
    const [valor, setValor] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    async function submitForm(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/anuncio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.accessToken}`
            },
            body: JSON.stringify({
                name,
                price,
                description,
                category
            })
        });
        if (response.ok) {
            setShowModal(true);
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-login">
                        <h1 className='text-center m-2'>Cadastro de Anúncio</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Titulo</label>
                                <input type="text" className="form-control" id="name" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Preço</label>
                                <input type="number" className="form-control" id="price" value={valor} onChange={e => setValor(Number(e.target.value))} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descrição</label>
                                <input type="text" className="form-control" id="description" value={descricao} onChange={e => setDescricao(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoria">Categoria:</label>
                                <select className="form-control" id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)}>
                                    <option value="">Selecionar categoria</option>
                                    <option value="frutas">Frutas</option>
                                    <option value="verduras">Verduras</option>
                                    <option value="legumes">Legumes</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mes">Sazionalidade:</label>
                                <select className="form-control" id="mes" value={sazionalidades} onChange={e => setSazionalidades(e.target.value)}>
                                    <option value="">Selecionar sazionalidade</option>
                                    <option value="janeiro">Janeiro</option>
                                    <option value="fevereiro">Fevereiro</option>
                                    <option value="marco">Março</option>
                                    <option value="abril">Abril</option>
                                    <option value="maio">Maio</option>
                                    <option value="junho">Junho</option>
                                    <option value="julho">Julho</option>
                                    <option value="agosto">Agosto</option>
                                    <option value="setembro">Setembro</option>
                                    <option value="outubro">Outubro</option>
                                    <option value="novembro">Novembro</option>
                                    <option value="dezembro">Dezembro</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="images" className="form-label">Imagens (1 à 5)</label>
                                <input type="file" className="form-control" id="images" multiple />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg" onClick={submitForm}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Produto cadastrado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>O produto foi cadastrado com sucesso.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <Link to="/produtos">Fechar</Link>
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

