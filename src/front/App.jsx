import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/App.css";
import { Footer } from "./components/footer.jsx";
import { Landing } from "./pages/landing.jsx";
import { NotFound } from "./pages/404.jsx";
import { Clients } from "./pages/clients.jsx";
import { Expedientes } from "./pages/expedientes.jsx";
import { SingleClient } from "./pages/singleClient.jsx";

function App() {
  const basename = import.meta.env.VITE_BASENAME || "/";

  return (
      <div>
          <BrowserRouter basename={basename}>
              <Routes>
                  <Route element={<Landing />} path="/" />
                  <Route element={<Clients />} path="/clientes"/>
                  <Route element={<Expedientes />} path="/expedientes"/>
                  <Route element={<SingleClient />} path ="/client/:theid" />
                  <Route element={<NotFound />} path="*" />
              </Routes>
              <Footer />
          </BrowserRouter>
      </div>
  );
}

export default App;
