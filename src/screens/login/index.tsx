import logoHome from '../../assets/logo-home.svg'
import '../login/styles.css'

export function Login() {

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" >
            <div className="row" style={{ paddingLeft: 150, paddingRight: 150 }}>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <img src={logoHome} alt="logo" />
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <div className="card-entrar">
                        <h1 className='text-center'><strong>Entrar</strong></h1>
                        <form>
                            <div className="mb-2">
                                <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Insira seu E-mail" />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Insira sua senha" />
                            </div>
                            <div className="mb-2 form-check">
                                <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" />
                                <label className="form-check-label mt-1" htmlFor="exampleCheck1">Lembrar-me</label>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-success btn-lg mt-2 px-5">Entrar</button>
                            </div>
                            <div className="mt-3 d-flex justify-content-center align-items-center">
                                <p>Não possui conta? <a href="/cadastro-cliente">Cadastre-se já!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
