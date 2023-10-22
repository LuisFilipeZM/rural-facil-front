import './styles.css';

export function CadastroCliente() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="card-login">
                        <h1 className='text-center'><strong>Cadastro</strong></h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Nome Completo</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">CPF</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Telefone/WhatsApp</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Crie Sua Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Repita Sua Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="btn btn-success btn-lg">Cadastrar</button>
                            <div className="forgot-password mt-3">
                                <p>Já possui uma conta?<a href="">Faça login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}