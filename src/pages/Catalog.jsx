import ProductCard from "../components/ProductCard.jsx";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {useParams} from "react-router-dom";
import {fetchImagesByCategoryId, fetchProductsByCategoryId} from "../http/catalogAPI.jsx";
import {Button, Modal, Spinner} from "flowbite-react";
import {observer} from "mobx-react-lite";


const Catalog = observer(() =>{
    const {products} = useContext(Context)
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true)
        fetchProductsByCategoryId(id)
            .then(data =>products.setAllProducts(data.data))
            .then(()=>fetchImagesByCategoryId(id)
                .then(data => products.setImages(data.data))
                .then()
        ).finally(() => setLoading(false))
    }, [id, products])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <div className="flex flex-wrap">
        {
            products.allProducts.map(item=>
                <ProductCard images={products.images} key={item.id} item={item} loading={loading}/>

            )

        }

        </div>
    );
})

export default Catalog
