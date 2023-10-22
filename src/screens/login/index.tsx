import logoHome from '../../assets/logo-home.svg'
import './styles.css'

export function Login() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div className="row" style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <img src={logoHome} alt="logo" />
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="card-login">
                        <h1 className='text-center'><strong>Entrar</strong></h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Lembrar-me</label>
                            </div>
                            <button type="submit" className="btn btn-success btn-lg">Entrar</button>
                            <div className="forgot-password mt-2">
                                <p>Esqueceu a senha?<a href="">Clique aqui</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
