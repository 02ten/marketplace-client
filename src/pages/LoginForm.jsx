import {Button, Modal} from "flowbite-react";
import {auth} from "../http/userAPI.jsx";
import {useContext, useState} from "react";
import {Context} from "../main.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {HOME_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.js";
import {observer} from "mobx-react-lite";

const LoginForm = observer(() => {
    const {user} = useContext(Context)
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const click = async (e) => {
        try {
            e.preventDefault();
            const data = await auth(email, password)
            console.log(data)
            user.setUser(data);
            user.setIsAuth(true);
            navigate(HOME_ROUTE)
        } catch (ex) {
            setOpenModal(true)
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Войти в аккаунт
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ваш
                                    e-mail</label>
                                <input type="email" name="email" id="email"
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="youremail@gmail.com" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       required=""/>
                            </div>
                            <Button onClick={click.bind(this)} pill type="submit" className="w-full">Войти
                            </Button>
                            <NavLink to={REGISTRATION_ROUTE}
                                     className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Еще нет аккаунта? <a href="#"
                                                     className="font-medium text-primary-600 hover:underline dark:text-primary-500">Зарегистрируйтесь!</a>
                            </NavLink>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Ошибка</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Неправильный логин или пароль
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
});

export default LoginForm
