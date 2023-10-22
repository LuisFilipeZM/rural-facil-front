import { Router } from "./routes/routes";
import { BrowserRouter } from "react-router-dom";


export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}