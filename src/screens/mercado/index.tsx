import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Product {
    nome: string;
    descricao: string;
    preco: number;
    image: string;
    vendedor: string;
}

export function Mercado() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/anuncio');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    return (
        <div className="container">
            {loading && (
                <div className="row">
                    {[...Array(6)].map((_, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card" aria-hidden="true">
                                <img src="https://via.placeholder.com/150" alt="" className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title placeholder-glow">
                                        <span className="placeholder col-6"></span>
                                    </h5>
                                    <p className="card-text placeholder-glow">
                                        <span className="placeholder col-7"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-6"></span>
                                        <span className="placeholder col-8"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && (
                <div className="row">
                    <div className="col-md-3">
                        <div className="card-filtro">
                            <div className="card-body">
                                <h5 className="card-title">Filtros</h5>
                                <div className="form-group">
                                    <label htmlFor="texto">Agricultor:</label>
                                    <input type="text" className="form-control" id="texto" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoria">Categoria:</label>
                                    <select className="form-control" id="categoria">
                                        <option value="">Todos</option>
                                        <option value="frutas">Frutas</option>
                                        <option value="verduras">Verduras</option>
                                        <option value="legumes">Legumes</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="preco">Preço:</label>
                                    <input type="number" className="form-control" id="preco" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mes">Sazionalidade:</label>
                                    <select className="form-control" id="mes">
                                        <option value="">Todos</option>
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
                                <div className="form-group">
                                    <input type="checkbox" id="organico" />
                                    <label className='ms-1 mt-2' htmlFor="organico">Orgânico</label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success mt-3">Filtrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {products.map((product, index) => (
                                <div className="col-md-6 mb-4" key={index}>
                                    <div className="card" onClick={() => handleProductClick(product)}>
                                        <img src={product.image} className="card-img-top" alt="Imagem do produto" />
                                        <div className="card-body">
                                            <h5 className="card-title">R$ {product.preco.toFixed(2)}</h5>
                                            <p className="card-text">{product.nome}</p>
                                            <p className="card-text text-right">Anunciado por: {product.vendedor}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={selectedProduct?.image} alt="Imagem do produto" />
                    <p>{selectedProduct?.descricao}</p>
                    <p>R$ {selectedProduct?.preco.toFixed(2)}</p>
                    <p>Anunciado por: {selectedProduct?.vendedor}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            {user.roles[0] === 'Agricultor' && (
                <button className="btn btn-primary btn-floating btn-lg" id="novoAnuncio" title="Novo Anuncio">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            )}
        </div>
    );
}