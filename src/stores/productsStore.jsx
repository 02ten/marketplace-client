import {makeAutoObservable} from "mobx";

export default class ProductsStore{
    constructor() {
        this._allProducts = []
        this._images = []
        makeAutoObservable(this)
    }
    setAllProducts(products){
        this._allProducts=products
    }
    get allProducts(){
        return this._allProducts
    }
    setImages(images){
        this._images=images
    }
    get images(){
        return this._images
    }
}