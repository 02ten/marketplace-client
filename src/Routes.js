import {
    CART_ROUTE,
    CATALOG_ROUTE, CONTACT_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, MYPRODUCT_ROUTE,
    REGISTRATION_ROUTE, SUCCESS_ROUTE
} from "./utils/consts";
import Cart from "./pages/Cart.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import Contact from "./pages/Contact.jsx";
import SellerPage from "./pages/SellerPage.jsx";
import Successful from "./pages/Successful.jsx";


export const authRoutes = [

    {
        path: CART_ROUTE,
        Element: Cart
    },
    {
        path: SUCCESS_ROUTE,
        Element: Successful
    },

]
export const sellerRoutes = [
    {
        path: MYPRODUCT_ROUTE,
        Element: SellerPage
    }
]
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Element: Home
    },
    {
        path: CONTACT_ROUTE,
        Element: Contact
    },
    {
        path: CATALOG_ROUTE+':id',
        Element: Catalog
    },
    {
        path: LOGIN_ROUTE,
        Element: LoginForm
    },
    {
        path: REGISTRATION_ROUTE,
        Element: RegisterForm
    },

]