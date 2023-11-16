import './style.css';

export function Mercado() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Filtros</h5>
                            <div className="form-group">
                                <label htmlFor="texto">Filtrar por texto:</label>
                                <input type="text" className="form-control" id="texto"  />
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
                                <button className='btn btn-success mt-3'>Filtrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="card-img-top"
                                    alt="Imagem do produto"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Produto 1</h5>
                                    <p className="card-text">
                                        Descrição do produto 1
                                    </p>
                                    <p className="card-text">
                                        Preço: R$ 10,00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="card-img-top"
                                    alt="Imagem do produto"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Produto 2</h5>
                                    <p className="card-text">
                                        Descrição do produto 2
                                    </p>
                                    <p className="card-text">
                                        Preço: R$ 20,00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="card-img-top"
                                    alt="Imagem do produto"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Produto 3</h5>
                                    <p className="card-text">
                                        Descrição do produto 3
                                    </p>
                                    <p className="card-text">
                                        Preço: R$ 30,00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="card-img-top"
                                    alt="Imagem do produto"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Produto 4</h5>
                                    <p className="card-text">
                                        Descrição do produto 4
                                    </p>
                                    <p className="card-text">
                                        Preço: R$ 40,00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <img
                                    src="https://via.placeholder.com/150"
                                    className="card-img-top"
                                    alt="Imagem do produto"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Produto 5</h5>
                                    <p className="card-text">
                                        Descrição do produto 5
                                    </p>
                                    <p className="card-text">
                                        Preço: R$ 50,00
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}