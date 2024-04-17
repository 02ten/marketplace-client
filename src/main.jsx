import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CategoriesStore from "./stores/categoriesStore.jsx";
import UserStore from "./stores/userStore.js";
import OrdersStore from "./stores/ordersStore.js";
import ProductsStore from "./stores/productsStore.jsx";
import CartStore from "./stores/cartStore.js";
import SellerStore from "./stores/sellerStore.jsx";
export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            categories: new CategoriesStore(),
            orders: new OrdersStore(),
            products: new ProductsStore(),
            cart: new CartStore(),
            sellerProducts:new SellerStore()
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);
