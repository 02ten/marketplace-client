import {Button, Modal, Label, Textarea, Alert} from "flowbite-react";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.jsx";
import {addNewProduct, fetchMyProducts} from "../../http/sellerAPI.jsx";
import {Dropdown} from "flowbite-react";

const AddProductModal = observer(({show, onHide}) => {
    // const {restaurants} = useContext(Context)
    const [name, setName] = useState('');
    const [price, setPrice] = useState(1.0);
    const [description, setDescription] = useState('')
    const {categories} = useContext(Context)
    const [categoryId, setCategoryId] = useState(categories.categories[0].id)
    const [category, setCategory] = useState(categories.categories[0].name)
    const [filePreview, setFilePreview] = useState(null);
    const [warning, setWarning] = useState(false)
    const [error, setError] = useState(false)
    //const [galleryFiles, setGalleryFiles] = useState(null)
    const selectFilePreview = e => {
        setFilePreview(e.target.files[0])
    }
    const addProduct = () => {
        if (name === '' || price < 1 || description === '' || filePreview === null) {
            setWarning(true)
            return
        }
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('previewImage', filePreview)
        formData.append('categoryId', categoryId)
        setName('')
        setPrice(1.0)
        setDescription('')
        setFilePreview(null)
        setWarning(false)
        addNewProduct(formData).then(() => window.location.reload()).catch(() => setError(true))

    }

    return (
        <Modal show={show} onClose={onHide}>
            <Modal.Header>Добавление нового товара</Modal.Header>
            <Modal.Body>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_email" id="floating_email"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           value={name}
                           onChange={e => setName(e.target.value)}
                           placeholder=" " required/>
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Название
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="number"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           value={price}
                           step='0.01'
                           min='1'
                           onChange={e => setPrice(e.target.value)}
                           placeholder=" " required/>
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Цена</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <div className="max-w-md">
                        <div className="mb-4 block">
                            <Label htmlFor="comment" value="Описание товара"/>
                        </div>
                        <Textarea value={description}
                                  onChange={e => setDescription(e.target.value)} id="comment"
                                  placeholder="Опишите свой товар" required rows={6}/>
                    </div>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="categories" value="Выберите категорию, к которой вы относите свой товар"/>
                    </div>
                    <Dropdown id="categories" label={category}>
                        {
                            categories.categories.map(item =>
                                <Dropdown.Item onClick={e => {
                                    setCategoryId(item.id)
                                    setCategory(item.name)
                                }} key={item.id}>{item.name}</Dropdown.Item>
                            )
                        }
                    </Dropdown>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="file-upload" value="Загрузка фотографии для превью"/>
                    </div>
                    <input type='file' onChange={selectFilePreview} id="file-upload"/>
                </div>
                {/*<div className="flex w-full items-center justify-center mt-4">*/}
                {/*    <Label*/}
                {/*        htmlFor="dropzone-file"*/}
                {/*        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"*/}
                {/*    >*/}
                {/*        <div className="flex flex-col items-center justify-center pb-6 pt-5">*/}
                {/*            <svg*/}
                {/*                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"*/}
                {/*                aria-hidden="true"*/}
                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                {/*                fill="none"*/}
                {/*                viewBox="0 0 20 16"*/}
                {/*            >*/}
                {/*                <path*/}
                {/*                    stroke="currentColor"*/}
                {/*                    strokeLinecap="round"*/}
                {/*                    strokeLinejoin="round"*/}
                {/*                    strokeWidth="2"*/}
                {/*                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"*/}
                {/*                />*/}
                {/*            </svg>*/}
                {/*            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">*/}
                {/*                <span className="font-semibold">Фотографии для галереи</span>*/}
                {/*            </p>*/}
                {/*            <p className="text-xs text-gray-500 dark:text-gray-400">Максимум 5 фотографий. Максимальный*/}
                {/*                размер (800x400px)</p>*/}
                {/*        </div>*/}
                {/*        <FileInput multiple onChange={selectFilesGallery} id="dropzone-file" className="hidden"/>*/}
                {/*    </Label>*/}
                {/*</div>*/}
                {
                    warning ?
                        <Alert className='mt-4' color="failure">
                            <span className="font-medium">Проверьте корректность введенных данных</span>
                        </Alert>
                        :
                        <></>
                }
                {
                    error ?
                        <Alert className='mt-4' color="failure">
                            <span className="font-medium">Произошла ошибка</span>
                        </Alert>
                        :
                        <></>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button pill color="success" onClick={addProduct}>Добавить</Button>
                <Button pill color="failure" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>

    );
});

export default AddProductModal
