import React, { useContext, useState } from "react";
import ProductContext from "../Store/ProductContext";

const ProductForm = () => {
    const store = useContext(ProductContext);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
        availability: "High"
    });

    const handleUpdate = (key, value) =>
        setProduct(prevState => ({
            ...prevState,
            [key]: value
        }));

    const handleCreate = () => {
        store.addProduct(product);
        setProduct({ name: "", price: "", description: "", availability: "High" });
    };

    return (
        <div className="container">
            <h3>Add Product</h3>
            <div>
                <label htmlFor="product-name">Name: </label>
                <input
                    id="product-name"
                    type="text"
                    value={product.name}
                    onChange={event => handleUpdate("name", event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="product-price">Price: </label>
                <input
                    id="product-price"
                    type="text"
                    value={product.price}
                    onChange={event => handleUpdate("price", event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="product-description">Description: </label>
                <input
                    id="product-description"
                    type="text"
                    value={product.description}
                    onChange={event => handleUpdate("description", event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="product-availability">Availability: </label>
                <select
                    id="product-availability"
                    value={product.availability}
                    onChange={event => handleUpdate("availability", event.target.value)}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <button onClick={handleCreate}>Add</button>
        </div>
    );
};

export default ProductForm;