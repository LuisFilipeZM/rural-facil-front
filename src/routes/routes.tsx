import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "../screens/home";
import { DefaultLayout } from "../layouts/defaultLayout";
import { Login } from "../screens/login";
import { CadastroCliente } from "../screens/cadastroCliente";
import { DadosCliente } from "../screens/dadosCliente";
import { Mercado } from "../screens/mercado";
import { DetalheProduto } from "../screens/detealheProduto";
import { CadastroProduto } from "../screens/cadastroProduto";
import { CadastroAgricultor } from "../screens/cadastroAgricultor";

export function Router() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("user");

        if (!accessToken && !["/", "/login", "/cadastro-cliente"].includes(window.location.pathname)) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-cliente" element={<CadastroCliente />} />
                <Route path="/dados-cliente" element={<DadosCliente />} />
                <Route path="/mercado" element={<Mercado />} />
                <Route path="/produto" element={<DetalheProduto />} />
                <Route path="/cadastro-produto" element={<CadastroProduto />} />
                <Route path="/cadastro-agricultor" element={<CadastroAgricultor/>} />
            </Route>
        </Routes>
    );
}