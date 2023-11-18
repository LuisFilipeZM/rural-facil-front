import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home";
import { DefaultLayout } from "../layouts/defaultLayout";
import { Login } from "../screens/login";
import { CadastroCliente } from "../screens/cadastroCliente";
import { DadosCliente } from "../screens/dadosCliente";
import { Mercado } from "../screens/mercado";
import { DetalheProduto } from "../screens/detealheProduto";
import { CadastroProduto } from "../screens/cadastroProduto";


export function Router () {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-cliente" element={<CadastroCliente />} />
                <Route path="/dados-cliente" element={<DadosCliente />} />
                <Route path="/mercado" element={<Mercado />} />
                <Route path="/produto" element={<DetalheProduto />} />
                <Route path="/cadastro-produto" element={<CadastroProduto />} />r
            </Route>
        </Routes>
    );
}