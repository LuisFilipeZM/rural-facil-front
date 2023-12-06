import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
        <div className="table-responsive mx-auto mt-3" style={{ maxWidth: "100vh" }}>
            <h5 className="text-center"><strong>Meus Anúncios</strong></h5>
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
                    {anuncios
                        .filter((anuncio) => anuncio.agricultor.acessoPessoa.id === user.id)
                        .map((anuncio) => (
                            <tr key={anuncio.id}>
                                <td className="text-center">{anuncio.id}</td>
                                <td className="text-center">{anuncio.ativo ? 'Ativo' : 'Inativo'}</td>
                                <td className="text-center">{anuncio.produto.nomeProduto}</td>
                                <td className="text-center">{anuncio.valor}</td>
                                <td className="text-center">
                                    <button className="btn btn-primary" onClick={() => navigate(`/editar-anuncio/${anuncio.id}`)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}