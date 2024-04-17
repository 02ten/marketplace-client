import {NavLink} from "react-router-dom";
import {CATALOG_ROUTE} from "../utils/consts.js";
import {Dropdown} from "flowbite-react";

function CategoryElement({item}) {
    return (
        <NavLink to={CATALOG_ROUTE+item.id}>{item.name}</NavLink>
    );
}

export default CategoryElement
