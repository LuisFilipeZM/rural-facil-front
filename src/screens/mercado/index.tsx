import { useState, useEffect } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import whatsappImage from '../../assets/whastapp.png';
import produtoOrganicoLogo from '../../assets/produto-organico-brasil-logo-3.png';

interface Product {
    produto: {
        nomeProduto: string;
    };
    descricao: string;
    organico: boolean;
    sazonalidades: string[];
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
    const [filtroProduto, setFiltroProduto] = useState('');
    const [filtroAgricultor, setFiltroAgricultor] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroPreco, setFiltroPreco] = useState('');
    const [filtroSazonalidade, setFiltroSazonalidade] = useState([]);
    const [filtroOrganico, setFiltroOrganico] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };


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

    const aplicarFiltros = async () => {
        try {
            let url = 'http://localhost:8080/api/MarketPlace/api';

            let hasParam = false;

            if (filtroAgricultor !== '') {
                url += `?agricultor=${filtroAgricultor}`;
                hasParam = true;
            }
            if (filtroProduto !== '') {
                if (hasParam) {
                    url += `&produtofilter=${filtroProduto}`;
                } else {
                    url += `?produtofilter=${filtroProduto}`;
                    hasParam = true;
                }
            }
            if (filtroCategoria !== '') {
                if (hasParam) {
                    url += `&categoria=${filtroCategoria}`;
                } else {
                    url += `?categoria=${filtroCategoria}`;
                    hasParam = true;
                }
            }
            if (filtroPreco !== '') {
                if (hasParam) {
                    url += `&valor=${filtroPreco}`;
                } else {
                    url += `?valor=${filtroPreco}`;
                    hasParam = true;
                }
            }
            if (filtroSazonalidade.length > 0) {
                const sazonalidadeQuery = filtroSazonalidade.map(mes => `sazonalidade=${mes}`).join('&');
                if (hasParam) {
                    url += `&${sazonalidadeQuery}`;
                } else {
                    url += `?${sazonalidadeQuery}`;
                    hasParam = true;
                }
            }
            if (filtroOrganico) {
                if (hasParam) {
                    url += '&organico=true';
                } else {
                    url += '?organico=true';
                }
            }

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                }
            });

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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

    const handleSazonalidadeChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFiltroSazonalidade([...filtroSazonalidade, value]);
        } else {
            setFiltroSazonalidade(filtroSazonalidade.filter(mes => mes !== value));
        }
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
                        <div className="card-filtro sticky-top">
                            <div className="card-body" style={{ width: "300px" }}>
                                <h5 className="card-title mb-3">Filtros</h5>
                                <div className="form-group">
                                    <label htmlFor="texto">Produto:</label>
                                    <input type="text" className="form-control" id="texto" onChange={(e) => setFiltroProduto(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="texto">Agricultor:</label>
                                    <input type="text" className="form-control" id="texto" onChange={(e) => setFiltroAgricultor(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoria">Categoria:</label>
                                    <select className="form-control" id="categoria" onChange={(e) => setFiltroCategoria(e.target.value)}>
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
                                    <div className="btn-group m-2" role="group" aria-label="Preço">
                                        <button type="button" className={`btn ${filtroPreco === 'ASC' ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={() => setFiltroPreco('ASC')}>▲ Asc</button>
                                        <button type="button" className={`btn ${filtroPreco === 'DESC' ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={() => setFiltroPreco('DESC')}>▼ Desc</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mes">Sazonalidade:</label>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="JANEIRO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('JANEIRO')} />
                                                <label className="form-check-label" htmlFor="janeiro">Janeiro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="FEVEREIRO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('FEVEREIRO')} />
                                                <label className="form-check-label" htmlFor="fevereiro">Fevereiro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="MARCO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('MARCO')} />
                                                <label className="form-check-label" htmlFor="marco">Março</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="ABRIL" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('ABRIL')} />
                                                <label className="form-check-label" htmlFor="abril">Abril</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="MAIO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('MAIO')} />
                                                <label className="form-check-label" htmlFor="maio">Maio</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="JUNHO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('JUNHO')} />
                                                <label className="form-check-label" htmlFor="junho">Junho</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="JULHO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('JULHO')} />
                                                <label className="form-check-label" htmlFor="julho">Julho</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="AGOSTO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('AGOSTO')} />
                                                <label className="form-check-label" htmlFor="agosto">Agosto</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="SETEMBRO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('SETEMBRO')} />
                                                <label className="form-check-label" htmlFor="setembro">Setembro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="OUTUBRO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('OUTUBRO')} />
                                                <label className="form-check-label" htmlFor="outubro">Outubro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="NOVEMBRO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('NOVEMBRO')} />
                                                <label className="form-check-label" htmlFor="novembro">Novembro</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" value="DEZEMBRO" onChange={handleSazonalidadeChange} checked={filtroSazonalidade.includes('DEZEMBRO')} />
                                                <label className="form-check-label" htmlFor="dezembro">Dezembro</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" id="organico" onChange={(e) => setFiltroOrganico(e.target.checked)} />
                                    <label className='ms-1 mt-2' htmlFor="organico">Orgânico</label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success mt-3" onClick={aplicarFiltros}>Aplicar filtro</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9" style={{ width: "970px" }}>
                        <div className="row">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
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
                                ))
                            ) : (
                                <div>Não há produtos disponíveis.</div>
                            )}
                        </div>
                        <div className='mb-5' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className='btn btn-secondary' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <button className='btn btn-success' onClick={() => paginate(currentPage + 1)} disabled={currentProducts.length < productsPerPage}>
                                Próxima
                            </button>
                        </div>
                    </div>

                </div>
            )}
            <Modal show={showModal} onHide={closeModal} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedProduct?.produto.nomeProduto}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel slide={false}>
                        {selectedProduct?.image.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img src={image} style={{ width: 500, height: 400 }} alt="..." />
                                {selectedProduct?.organico && (
                                    <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
                                        <img src={produtoOrganicoLogo} style={{ width: 90, height: 60 }} alt="Orgânico" />
                                    </div>
                                )}
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <p>{selectedProduct?.descricao}</p>
                    <h2><strong>R$ {selectedProduct?.valor.toFixed(2)}</strong></h2>
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
                <div>
                    <Link to="/cadastro-anuncio">
                        <button className="btn btn-primary btn-floating btn-lg" id="novoAnuncio" title="Novo Anúncio">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </Link>
                    <Link to="/lista-anuncio">
                        <button className="btn btn-primary btn-floating btn-lg" id="listaAnuncio" title="Meus Anúncios">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}