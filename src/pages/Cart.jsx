import React, {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {fetchCart} from "../http/cartAPI.jsx";
import {Modal, Label, Radio, Spinner, Table, TextInput, Button} from "flowbite-react";
import CartElement from "../components/CartElement.jsx";
import {observer} from "mobx-react-lite";
import {createOrder} from "../http/orderAPI.jsx";

const Cart = observer(() => {
    const {cart} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState('')
    const [telephone, setTelephone] = useState('')
    const [payment, setPayment] = useState('');
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        setLoading(true)
        fetchCart().then(data => cart.setCart(data.data)).finally(() => setLoading(false))
    }, [cart])
    if (loading)
        return <Spinner animation={"grow"}/>
    const createFormData = () => {
        const formData = {
            'address': address,
            'payment': payment,
            'telephone': telephone
        }
        createOrder(formData).then(() => cart.setCart([])).finally(() => setOpenModal(true))

    }

    return (
        <div className="w-full flex flex-wrap justify-around">
            <Table className="grow">
                <Table.Head>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell>Название</Table.HeadCell>
                    <Table.HeadCell>Категория</Table.HeadCell>
                    <Table.HeadCell>Цена</Table.HeadCell>
                    <Table.HeadCell>Количество</Table.HeadCell>
                    <Table.HeadCell>Подытог</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {cart.cart.length === 0 ?
                        <div className="flex justify-center items-center">
                            <label className="text-center font-bold text-lg">Ваша корзина пуста</label>
                        </div>
                        :
                        cart.cart.map(item =>
                            <CartElement key={item.id} item={item} cart={cart}></CartElement>
                        )
                    }
                </Table.Body>
            </Table>
            {
                cart.cart.length !== 0 ?
                    <div className="flex grow max-w-md flex-col">
                        <div className="flex justify-center items-center">
                            <label className="font-bold text-lg">Оформление заказа</label>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="input-gray" color="gray" value="Номер телефона"/>
                            </div>
                            <TextInput value={telephone} onChange={e => setTelephone(e.target.value)} id="input-gray"
                                       placeholder="Номер телефона" required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="input-info" value="Адрес"/>
                            </div>
                            <TextInput value={address} onChange={e => setAddress(e.target.value)} id="input-info"
                                       placeholder="г. Моква, ул. ..., д. ,,," required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="input-gray" color="gray" value="Тип оплаты"/>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setPayment(e.target.value)} id="card" name="payment"
                                       value="card"/>
                                <Label htmlFor="card">Картой</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onChange={e => setPayment(e.target.value)} id="cash" name="payment"
                                       value="cash"/>
                                <Label htmlFor="cash">Наличными</Label>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <Button onClick={createFormData} pill>Оформить заказ</Button>
                        </div>
                    </div>
                    :
                    <></>
            }
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Уведомление</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Заказ успешно создан
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
})

export default Cart
