import React from 'react';
import './style.css';

export function DetalheProduto() {
    return (
        <div className="container">
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
    );
}