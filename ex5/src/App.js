import ProductStore from "./Store/ProductStore";
import ProductForm from "./Components/ProductForm";
import Cart from "./Components/Cart";

import "./App.css";

function App() {
  return (
      <ProductStore>
        <ProductForm />
        <Cart />
      </ProductStore>
  );
}

export default App;