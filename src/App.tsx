import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import SingleCatalogItem from "./pages/SingleCatalogItem/SingleCatalogItem";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:id" element={<SingleCatalogItem />} />
    </Routes>
  );
};

export default App;