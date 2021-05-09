import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import ProductContext from "../Store/ProductContext";

const Cart = () => {
    const store = useContext(ProductContext);

    return useObserver(() => (
        <div className="container">
            <h3>Added Products</h3>
            {store.products.map(product => (
                <div className="row">
                    <div className="cell">
                        <strong>Name: </strong> {product.name}
                    </div>
                    <div className="cell">
                        <strong>Price: </strong> {product.price}
                    </div>
                    <div className="cell">
                        <strong>Description:</strong> {product.description}
                    </div>
                    <div className="cell">
                        <strong>Availability:</strong> {product.availability}
                    </div>
                    <div className="cell">
                        <button onClick={() => store.removeProduct(product)}>Delete</button>
                    </div>
                </div>
            ))}
            <div>
                <strong>
                    Number of products: {store.productCount}
                </strong>
            </div>
        </div>
    ));
};

export default Cart;