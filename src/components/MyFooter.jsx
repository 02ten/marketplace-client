import { Footer } from "flowbite-react";
import {NavLink} from "react-router-dom";
import {CONTACT_ROUTE, HOME_ROUTE, SUPPORT_ROUTE} from "../utils/consts.js";


function MyFooter() {
    return (
        <Footer container className="mt-auto">
            <Footer.Copyright  by="Маркетплейс™" year={2024} />
            <Footer.LinkGroup>
                <NavLink className="px-3" to={HOME_ROUTE}>О нас</NavLink>
                <NavLink className="px-3" to={CONTACT_ROUTE}>Контакты</NavLink>
                <NavLink className="px-3" to={SUPPORT_ROUTE}>Техническая поддержка</NavLink>
            </Footer.LinkGroup>
        </Footer>
    );
}

export default MyFooter
