import {Button, Dropdown, Navbar} from "flowbite-react";
import {
    CART_ROUTE,
    CATALOG_ROUTE,
    CONTACT_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE, MYPRODUCT_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts.js";
import {NavLink} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";
import CategoryElement from "./CategoryElement.jsx";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {categories} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('accessToken', '')
        localStorage.setItem('refreshToken', '')
    }
    return (
        <Navbar fluid rounded>
            {user.isAuth ?

                <div className="flex md:order-2">

                    <Dropdown
                        arrowIcon={true}
                        inline
                        label={
                            <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path fill-rule="evenodd"
                                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                      clip-rule="evenodd"/>
                            </svg>

                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.user.firstName}</span>
                            <span className="block truncate text-sm font-medium">{user.user.sub}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Профиль</Dropdown.Item>
                        {
                            user.user.roles.includes('SELLER')?
                                <Dropdown.Item><NavLink to={MYPRODUCT_ROUTE}>Мои товары</NavLink></Dropdown.Item>
                                :
                                <></>
                        }
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={logOut}>Выйти</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle/>
                </div>
                :
                <div className="flex md:order-2">
                    <NavLink to={LOGIN_ROUTE} className="max-w-sm me-2">
                        <Button>
                            Войти
                        </Button>
                    </NavLink>
                    <NavLink to={REGISTRATION_ROUTE}>
                        <Button className="max-w-sm">
                            Зарегистрироваться
                        </Button>
                    </NavLink>
                </div>
            }

            <Navbar.Collapse>
                <NavLink to={HOME_ROUTE}>Главная</NavLink>
                <NavLink to={CONTACT_ROUTE}>О нас</NavLink>
                <Dropdown
                    label="Каталог"
                    arrowIcon={true}
                    inline
                >

                    {
                        categories.categories.map(item=>
                                <Dropdown.Item key={item.id} item={item}>
                                <CategoryElement key={item.id} item={item}></CategoryElement>
                                </Dropdown.Item>
                        )
                    }
                </Dropdown>
            </Navbar.Collapse>
            <form className="w-96">
                <label htmlFor="default-search"
                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"> Поиск</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="TODO Название товара" required/>
                    <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Поиск
                    </button>
                </div>
            </form>
            {
                user.isAuth ?
                    <NavLink to={CART_ROUTE}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                  d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </NavLink>
                    :
                    <>
                    </>
            }

        </Navbar>
    );
});

export default NavBar
