import logoHome from '../../assets/logo-home.svg'

export function Home() {
    return (
        <div className="row container-fluid" style={{paddingLeft: 150, paddingRight: 150}}>
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-6">
                    <h1>Rural Fácil</h1>
                    <p style={{maxWidth: '800px', textAlign: 'justify'}}>Somos um marketplace que conecta diretamente consumidores a produtores locais de agricultura familiar.
                        Oferecemos produtos frescos e artesanais, promovendo a sustentabilidade e apoiando pequenos agricultores. Navegue, escolha,
                        e receba seus produtos com comodidade enquanto contribui para a economia local e o cultivo sustentável
                    </p>
                    <button className="btn btn-success">Acesse agora ➤</button>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <img src={logoHome} alt="logo" />
                </div>
            </div>
        </div>
    );
}