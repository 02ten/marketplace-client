
import {faRubleSign, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Spinner, Table, Button} from "flowbite-react";
import React, {useContext, useEffect, useState} from "react";
import {fetchImage} from "../http/imageAPI.jsx";
import {Context} from "../main.jsx";
import {deleteCart} from "../http/cartAPI.jsx";
import {useNavigate} from "react-router-dom";
import {CART_ROUTE} from "../utils/consts.js";
function CartElement({item, cart}) {
    const [loading,setLoading] = useState(true)
    const [subTotal, setSubTotal] = useState(item.subtotal)
    const [quantity, setQuantity] = useState(parseInt(item.quantity))
    const [image, setImage] = useState(null)
    const {navigate} = useNavigate()
    useEffect(()=>{
        setLoading(true)
        fetchImage(item.product.previewImageId).then(data=>setImage(data.data)).finally(()=>setLoading(false))
        }, [])
    if(loading)
        return <Spinner animation={"grow"}></Spinner>
    const remove = () =>{
        deleteCart(item.id)
            .then(() => cart.setCart(cart.cart.filter(e=>e.id !== item.id)))

    }
    const decreaseQuantity =()=>{

    }
    const increaseQuantity =()=>{

    }
    console.log(image)
    return (
        <Table.Row className="dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
                <img className="h-24 w-36" src={`data:image/jpeg;base64,${image.bytes}`} />
            </Table.Cell>
            <Table.Cell>{item.product.name}</Table.Cell>
            <Table.Cell>{item.product.category.name}</Table.Cell>
            <Table.Cell>{item.product.price} <FontAwesomeIcon icon={faRubleSign} /></Table.Cell>
            <Table.Cell>{item.quantity}</Table.Cell>
            <Table.Cell>{item.quantity * item.product.price} <FontAwesomeIcon icon={faRubleSign} /></Table.Cell>
            <Table.Cell><Button onClick={remove}><FontAwesomeIcon icon={faTrash} /></Button></Table.Cell>
            <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Edit
                </a>
            </Table.Cell>
        </Table.Row>
    );
}

export default CartElement
