import React, { useEffect, useState } from 'react';
import { DadosAgricultor } from '../dadosAgricultor/index';

interface Anuncio {
    id: number,
    produto: {
        nomeProduto: "string"
    },
    valor: number,
    ativo: boolean,
}

export function ListaAnuncio() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const [agricultor, setAgricultor] = useState(null);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/agricultor/${user?.id}`, {
                headers: {
                    'Authorization': `Bearer ${user?.accessToken}`
                }
            });
            const data = await response.json();
            setAgricultor(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetch('http://localhost:8080/api/AnuncioAgricultor/api', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => setAnuncios(data))
            .catch(error => console.error(error));
    }, []);

    


    return (
        <div className="card mx-auto card-no-hover">
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Título</th>
                            <th className="text-center">Valor</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {anuncios.map((anuncio) => (
                            <tr key={anuncio.id}>
                                <td className="text-center">{anuncio.id}</td>
                                <td className="text-center">{anuncio.ativo ? 'Ativo' : 'Inativo'}</td>
                                <td className="text-center">{anuncio.produto.nomeProduto}</td>
                                <td className="text-center">{anuncio.valor}</td>
                                <td className="text-center">
                                    <button className="btn btn-primary">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}