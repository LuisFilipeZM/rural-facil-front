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
    const [sazonalidades, setSazonalidades] = useState<string[]>([]);
    const [valor, setValor] = useState(0);
    const [ativo, setAtivo] = useState(true);
    const [showSuccessModal, setSuccessModal] = useState(false);
    const [showErrorModal, setErrorModal] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [agricultor, setAgricultor] = useState(null);
    const [foto1, setFoto1] = useState('');
    const [foto2, setFoto2] = useState('');
    const [foto3, setFoto3] = useState('');
    const [foto4, setFoto4] = useState('');
    const [foto5, setFoto5] = useState('');

    useEffect(() => {
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

        fetchData();
    }, []);


    async function submitForm(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/anuncio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.accessToken}`
            },
            body: JSON.stringify({
                agricultor: {
                    id: agricultor?.id,
                },
                categoria,
                ativo,
                classificacao,
                descricao,
                organico,
                produto: {
                    nomeProduto: nomeProduto,
                },
                sazonalidades,
                valor,
                foto1,
                foto2,
                foto3,
                foto4,
                foto5
            })
        });
        if (response.ok) {
            setSuccessModal(true);
        } else {
            const mensagem = response.json();
            setErrorModal(true, response.erro);
        }
    }

    function handleSazionalidadeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        if (sazonalidades.includes(value)) {
            setSazonalidades(sazonalidades.filter(item => item !== value));
        } else {
            setSazonalidades([...sazonalidades, value]);
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-login m-3">
                        <h1 className='text-center m-2'>Cadastro de Anúncio</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Titulo:</label>
                                <input type="text" className="form-control" id="name" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Preço:</label>
                                <input type="number" className="form-control" id="price" value={valor} onChange={e => setValor(Number(e.target.value))} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descrição:</label>
                                <input type="text" className="form-control" id="description" value={descricao} onChange={e => setDescricao(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoria" className="form-label">Categoria:</label>
                                <select className="form-control" id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} required>
                                    <option value="">Selecionar categoria</option>
                                    <option value="MUDAS_SEMENTES">MUDAS/SEMENTES</option>
                                    <option value="HORTALICAS">HORTALIÇAS</option>
                                    <option value="GRAOS">GRÃOS</option>
                                    <option value="LATICINIOS">LATICÍNIOS</option>
                                    <option value="SUINO">SUÍNO</option>
                                    <option value="SUINO_PROCESSADO">SUÍNO PROCESSADO</option>
                                    <option value="BOVINO">BOVINO</option>
                                    <option value="BOVINO_PROCESSADO">BOVINO PROCESSADO</option>
                                    <option value="OVINO">OVINO</option>
                                    <option value="OVINO_PROCESSADO">OVINO PROCESSADO</option>
                                    <option value="AVES_GRANJA">AVES/GRANJA</option>
                                    <option value="PADARIA">PADARIA</option>
                                    <option value="MASSAS">MASSAS</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="organico" className="form-label me-3">Orgânico:</label>
                                <input type="checkbox" id="organico" style={{ transform: "scale(1.5)" }} checked={organico} onChange={e => setOrganico(e.target.checked)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mes" className="form-label">Sazionalidade:</label>
                                <div className="row">
                                    <div className="col">
                                        <input type="checkbox" id="janeiro" value="JANEIRO" checked={sazonalidades.includes("JANEIRO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="janeiro" className="ms-3">Janeiro</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="fevereiro" value="FEVEREIRO" checked={sazonalidades.includes("FEVEREIRO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="fevereiro" className="ms-3">Fevereiro</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="marco" value="MARCO" checked={sazonalidades.includes("MARCO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="marco" className="ms-3">Março</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="abril" value="ABRIL" checked={sazonalidades.includes("ABRIL")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="abril" className="ms-3">Abril</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="checkbox" id="maio" value="MAIO" checked={sazonalidades.includes("MAIO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="maio" className="ms-3">Maio</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="junho" value="JUNHO" checked={sazonalidades.includes("JUNHO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="junho" className="ms-3">Junho</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="julho" value="JULHO" checked={sazonalidades.includes("JULHO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="julho" className="ms-3">Julho</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="agosto" value="AGOSTO" checked={sazonalidades.includes("AGOSTO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="agosto" className="ms-3">Agosto</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="checkbox" id="setembro" value="SETEMBRO" checked={sazonalidades.includes("SETEMBRO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="setembro" className="ms-3">Setembro</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="outubro" value="OUTUBRO" checked={sazonalidades.includes("OUTUBRO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="outubro" className="ms-3">Outubro</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="novembro" value="NOVEMBRO" checked={sazonalidades.includes("NOVEMBRO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="novembro" className="ms-3">Novembro</label>
                                    </div>
                                    <div className="col">
                                        <input type="checkbox" id="dezembro" value="DEZEMBRO" checked={sazonalidades.includes("DEZEMBRO")} onChange={handleSazionalidadeChange} style={{ transform: "scale(1.5)" }} />
                                        <label htmlFor="dezembro" className="ms-3">Dezembro</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="images" className="form-label">Imagens (1 à 5):</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="images"
                                    multiple
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => {
                                        const selectedImages = Array.from(e.target.files);
                                        const maxImages = 5;
                                        const limitedImages = selectedImages.slice(0, maxImages); // Limita a seleção a 5 imagens

                                        const imagePromises = limitedImages.map((image) => {
                                            return new Promise((resolve, reject) => {
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    const base64Image = reader.result as string;
                                                    resolve(base64Image);
                                                };
                                                reader.onerror = reject;
                                                reader.readAsDataURL(image);
                                            });
                                        });

                                        Promise.all(imagePromises).then((base64Images) => {
                                            // Atualiza os estados com as imagens selecionadas, limitando a um máximo de 5
                                            setFoto1(base64Images[0] || '');
                                            setFoto2(base64Images[1] || '');
                                            setFoto3(base64Images[2] || '');
                                            setFoto4(base64Images[3] || '');
                                            setFoto5(base64Images[4] || '');
                                        });
                                    }}
                                required
                                />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg" onClick={submitForm}>Cadastrar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showSuccessModal} onHide={() => setSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Produto cadastrado com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>O produto foi cadastrado com sucesso.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSuccessModal(false)}>
                        <Link to="/lista-anuncio">Fechar</Link>
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showErrorModal} onHide={() => setErrorModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao cadastrar o produto!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Algo de errado aconteceu, favor tente novamente!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setErrorModal(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
