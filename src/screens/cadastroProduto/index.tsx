import { useState } from 'react';
import './styles.css';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function CadastroProduto() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [images, setImages] = useState<File[]>([]);

    async function submitForm(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPrice(e.target.value);
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCategory(e.target.value);
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-login">
                        <h1 className='text-center m-2'>Cadastro de Produto</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Preço</label>
                                <input type="text" className="form-control" id="price" value={price} onChange={handlePriceChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descrição</label>
                                <input type="text" className="form-control" id="description" value={description} onChange={handleDescriptionChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Categoria</label>
                                <input type="text" className="form-control" id="category" value={category} onChange={handleCategoryChange} />
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

