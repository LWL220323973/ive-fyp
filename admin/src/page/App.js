import "../style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Menu from "./Menu";
import Drink from "./drink";
import StapleFood from "./stapleFood";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="menu" element={<Menu />}>
            <Route path="drinks" element={<Drink />} />
            <Route path="stapleFood" element={<StapleFood />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
