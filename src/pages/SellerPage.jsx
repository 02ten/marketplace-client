import {Button, Spinner} from "flowbite-react";
import AddProductModal from "../components/modals/AddProductModal.jsx";
import {useContext, useEffect, useState} from "react";
import {fetchMyProducts} from "../http/sellerAPI.jsx";
import {Context} from "../main.jsx";
import ProductElement from "../components/ProductElement.jsx";

function SellerPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const {sellerProducts} = useContext(Context)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        fetchMyProducts().then(data => sellerProducts.setProducts(data.data)).finally(()=>setLoading(false))
    })
    if(loading)
        return <Spinner animation={"grow"}/>
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <AddProductModal show={modalVisible} onHide={()=>setModalVisible(false)}/>
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div
                        className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div
                            className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Button onClick={() => setModalVisible(true)} pill>
                                Добавить товар
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Название</th>
                                <th scope="col" className="px-4 py-3">Категория</th>
                                <th scope="col" className="px-4 py-3">Описание</th>
                                <th scope="col" className="px-4 py-3">Цена</th>
                                <th scope="col" className="px-4 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                sellerProducts.products.map((item)=>
                                    <ProductElement key={item.id} item={item}/>
                                )
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default SellerPage
