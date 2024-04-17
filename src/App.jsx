import NavBar from "./components/NavBar.jsx";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter.jsx";
import MyFooter from "./components/MyFooter.jsx";
import {useContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {Context} from "./main.jsx";
import {getAccessToken} from "./http/userAPI.jsx";
import {fetchCategories} from "./http/catalogAPI.jsx";
import {Spinner} from "flowbite-react";

function App() {
    const {user} = useContext(Context)
    let accessToken = localStorage.getItem("accessToken")
    let refreshToken = localStorage.getItem("refreshToken")
    const {categories} = useContext(Context)
    let currentDate = new Date()
    const [loading, setLoading] = useState(true)
    try {
        let decodedAccessToken = jwtDecode(accessToken);
        let decodedRefreshToken = jwtDecode(refreshToken);
        if (decodedAccessToken.exp * 1000 > currentDate.getTime()) {
            console.log('access token not expired')
            user.setUser(decodedAccessToken)
            user.setIsAuth(true)
            console.log(user.isAuth)
        } else if (decodedRefreshToken.exp * 1000 > currentDate.getTime()) {
            console.log('refresh token not expired')
            getAccessToken(refreshToken).then((e) => {
                console.log(e)
                localStorage.setItem('accessToken', e.data.accessToken)
                user.setUser(jwtDecode(e.data.accessToken))
                user.setIsAuth(true)
            })
        } else {
            console.log('both tokens are expired')
            user.setUser({'role':[]})
            user.setIsAuth(false)
        }
    } catch (e) {
        console.log(e)
        user.setUser({'role':[]})
        user.setIsAuth(false)
    }
    fetchCategories().then(data => categories.setCategories(data.data)).finally(() => setLoading(false))
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
            <NavBar/>
            <AppRouter className="flex-grow"></AppRouter>
            <MyFooter></MyFooter>
            </div>
        </BrowserRouter>
    );
}

export default App
