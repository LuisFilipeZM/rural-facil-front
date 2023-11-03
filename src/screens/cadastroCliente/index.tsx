
import { useState } from 'react';
import './styles.css';


export function CadastroCliente() {

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    async function submitForm() {
        console.log('dsadas')
        await fetch('http://localhost:8080/api/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                cpf,
                email,
                dataNascimento,
                whatsapp,
            })
        })
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-login">
                        <h1 className='text-center'><strong>Cadastro</strong></h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Nome Completo</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" value={nome} onChange={e => setNome(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">CPF</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" value={cpf} onChange={e => setCpf(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Data de Nascimento</label>
                                <input type="date" className="form-control" id="exampleInputEmail1" value={dataNascimento} onChange={e => setDataNascimento(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Telefone/WhatsApp</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg" onClick={submitForm}>Cadastrar</button>
                            <div className="forgot-password mt-3">
                                <p>Já possui uma conta? <a href="/login">Faça login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}