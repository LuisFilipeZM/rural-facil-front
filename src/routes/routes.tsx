import { Routes, Route } from "react-router-dom";
import { Home } from "../screens/home";
import { DefaultLayout } from "../layouts/defaultLayout";
import { Login } from "../screens/login";
import { CadastroCliente } from "../screens/cadastroCliente";

export function Router () {
    return (
        <Routes>
            
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-cliente" element={<CadastroCliente />} />
            </Route>
        </Routes>
    );
}