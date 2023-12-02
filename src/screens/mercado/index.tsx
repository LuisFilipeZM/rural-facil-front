import { useState, useEffect } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import whatsappImage from '../../assets/whastapp.png';

interface Product {
    produto: {
        nomeProduto: string;
    };
    descricao: string;
    organico: boolean;
    sazonalidade: [string];
    valor: number;
    image: string;
    agricultor: {
        nome: string;
        whatsApp: string;
    };
    foto1: string;
    foto2: string;
    foto3: string;
    foto4: string;
    foto5: string;
}

export function Mercado() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const formattedWhatsApp = selectedProduct?.agricultor.whatsApp.replace(/^55(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/MarketPlace/api', {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`
                    }
                });
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
        const arrayFotos = [];
        if (product.foto1) arrayFotos.push(product.foto1);
        if (product.foto2) arrayFotos.push(product.foto2);
        if (product.foto3) arrayFotos.push(product.foto3);
        if (product.foto4) arrayFotos.push(product.foto4);
        if (product.foto5) arrayFotos.push(product.foto5);

        const newProduct = {
            ...product,
            image: arrayFotos
        };
        setSelectedProduct(newProduct);
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
                                <h5 className="card-title mb-3">Filtros</h5>
                                <div className="form-group">
                                    <label htmlFor="texto">Agricultor:</label>
                                    <input type="text" className="form-control" id="texto" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoria">Categoria:</label>
                                    <select className="form-control" id="categoria">
                                        <option value="">Todos</option>
                                        <option value="MUDAS_SEMENTES">Mudas/Sementes</option>
                                        <option value="HORTALICAS">Hortaliças</option>
                                        <option value="GRAOS">Grãos</option>
                                        <option value="LATICINIOS">Laticínios</option>
                                        <option value="SUINO">Suíno</option>
                                        <option value="SUINO_PROCESSADO">Suíno Processado</option>
                                        <option value="BOVINO">Bovino</option>
                                        <option value="BOVINO_PROCESSADO">Bovino Processado</option>
                                        <option value="OVINO">Ovino</option>
                                        <option value="OVINO_PROCESSADO">Ovino Processado</option>
                                        <option value="AVES_GRANJA">Aves / Granja</option>
                                        <option value="PADARIA">Padaria</option>
                                        <option value="MASSAS">Massas</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="preco">Preço:</label>
                                    <input type="number" className="form-control" id="preco" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mes">Sazonalidade:</label>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="janeiro" />
                                                <label className="form-check-label" htmlFor="janeiro">Janeiro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="fevereiro" />
                                                <label className="form-check-label" htmlFor="fevereiro">Fevereiro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="marco" />
                                                <label className="form-check-label" htmlFor="marco">Março</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="abril" />
                                                <label className="form-check-label" htmlFor="abril">Abril</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="maio" />
                                                <label className="form-check-label" htmlFor="maio">Maio</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="junho" />
                                                <label className="form-check-label" htmlFor="junho">Junho</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="julho" />
                                                <label className="form-check-label" htmlFor="julho">Julho</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="agosto" />
                                                <label className="form-check-label" htmlFor="agosto">Agosto</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="setembro" />
                                                <label className="form-check-label" htmlFor="setembro">Setembro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="outubro" />
                                                <label className="form-check-label" htmlFor="outubro">Outubro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="novembro" />
                                                <label className="form-check-label" htmlFor="novembro">Novembro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="dezembro" />
                                                <label className="form-check-label" htmlFor="dezembro">Dezembro</label>
                                            </div>
                                        </div>
                                    </div>
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
                                        <img src={product.foto1} className="card-img-top" alt="Imagem do produto" />
                                        <div className="card-body">
                                            <h5 className="card-title">R$ {product.valor.toFixed(2)}</h5>
                                            <p className="card-text">{product.produto.nomeProduto}</p>
                                            <p className="card-text text-right">Anunciado por: {product.agricultor.nome}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Modal show={showModal} onHide={closeModal} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct?.produto.nomeProduto}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {selectedProduct?.image.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img src={image} style={{ width: 400 }} alt="..." />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <p>{selectedProduct?.descricao}</p>
                    <p>R$ {selectedProduct?.valor.toFixed(2)}</p>
                    <p>Anunciado por: {selectedProduct?.agricultor.nome}</p>
                    <p>Telefone/WhatsApp: {formattedWhatsApp}</p>
                    <div className="form-group">
                        <a href={`https://wa.me/${selectedProduct?.agricultor.whatsApp}?text=Olá,%20vi%20seu%20anúncio%20do%20produto:%20${selectedProduct?.produto.nomeProduto}%20no%20aplicativo%20Rural%20Fácil,%20gostaria%20de%20negociar%20com%20você!`}
                            target="_blank" rel="noopener noreferrer">
                            <img src={whatsappImage} style={{ width: 200, height: "auto" }} alt="WhatsApp" />
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            {user.roles[0] === 'Agricultor' && (
                <Link to="/cadastro-anuncio">
                    <button className="btn btn-primary btn-floating btn-lg" id="novoAnuncio" title="Novo Anuncio">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </Link>
            )}
        </div>
    );
}

