import React from "react";
import { useLocalObservable } from "mobx-react";
import ProductContext from "./ProductContext";

const ProductStore = ({ children }) => {
    const productStore = useLocalObservable(() => ({
        products: [],
        addProduct: product => {
            productStore.products.push(product);
        },
        removeProduct: product => {
            productStore.products = productStore.products.filter(i => i !== product);
        },
        get productCount() {
            return productStore.products.length;
        }
    }));

    return (
        <ProductContext.Provider value={productStore}>{children}</ProductContext.Provider>
    );
};

export default ProductStore;