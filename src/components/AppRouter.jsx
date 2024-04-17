import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes, sellerRoutes} from "../Routes";
import {useContext} from "react";
import {Context} from "../main.jsx";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>}/>
            )}
            {user.isAuth === true && user.user.roles.includes('SELLER') && sellerRoutes.map(({path, Element})=>
                <Route key={path} path={path} element={<Element/>}/>
            )}
            {publicRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={<Element/>}/>
            )}
            <Route
                path="*" element={<Navigate to ="/" replace />}
            />
        </Routes>
    );
})

export default AppRouter