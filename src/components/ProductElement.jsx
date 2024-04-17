
import {faRubleSign} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Dropdown} from "flowbite-react";
import {deleteProduct} from "../http/sellerAPI.jsx";
function ProductElement({item}) {
    const remove = () =>{
        deleteProduct(item.id).then(()=>window.location.reload())
    }
    return (
        <tr className="border-b dark:border-gray-700">
            <th scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
            <td className="px-4 py-3">{item.category.name}</td>
            <td className="px-4 py-3">{item.description}</td>
            <td className="px-4 py-3">{item.price} <FontAwesomeIcon icon={faRubleSign} /></td>
            <td className="px-3 py-3 flex items-center justify-end">
                <Dropdown size='sm' label='Действия' placement='left'>
                    <Dropdown.Item onClick={remove} color='red'>Удалить</Dropdown.Item>
                    <Dropdown.Item>TODO Изменить</Dropdown.Item>
                </Dropdown>
            </td>
        </tr>
    );
}

export default ProductElement
