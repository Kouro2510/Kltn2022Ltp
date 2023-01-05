import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../page/Home";
import Cart from "../page/Cart";
import Checkout from "../page/Checkout";
import Login from "../page/Login";
import ProductDetails from "../page/ProductDetails";
import Shop from "../page/Shop";
import Contact from "../page/Contact";
import Signup from "../page/Signup";
import ProtectedRouter from "./ProtectedRouter";
import AllProduct from "../admin/AllProduct";
import AddProduct from "../admin/AddProduct";
import Dashboard from "../admin/Dashboard";
import User from "../admin/User";
import Blog from "../admin/Blog";
import AddEditBlog from "../admin/AddBlog";
import BlogPage from "../page/Blog";
import {useLocation} from "react-router-dom";
import Detail from "../page/Detail";
import {auth} from "../firebase";
import AdminNav from "../admin/AdminNav";
import Header from "../conpoments/header/header";
import Footer from "../conpoments/footer/footer";
import TagBlog from "../page/TagBlog";
import CategoryBlog from "../page/CategoryBlog";
import Order from "../admin/Order";

const Routers = () => {
    const [active, setActive] = useState("home");
    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, []);
    const location=useLocation();
    return (
        <>
            {location.pathname.startsWith("/dashboard")?<AdminNav/>: <Header  setActive={setActive}
                                                                              active={active} user={user}/>}
            <Routes>
                <Route path='/' element={<Navigate to='home'/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path="/*" element={<ProtectedRouter/>}>
                    <Route path='checkout' element={<Checkout/>}/>
                    <Route path='dashboard/all-product' element={<AllProduct/>}/>
                    <Route path='dashboard/add-product' element={<AddProduct/>}/>
                    <Route path='dashboard/users' element={<User/>}/>
                    <Route path='dashboard/blogs' element={<Blog/>}/>
                    <Route path='dashboard/add-blog' element={<AddEditBlog/>}/>
                    <Route path='dashboard/orders' element={<Order/>}/>
                    <Route
                        path="dashboard/blogs/create"
                        element={
                                <AddEditBlog  setActive={setActive} />
                        }
                    />
                    <Route
                        path="dashboard/blogs/update/:id"
                        element={
                            <AddEditBlog  setActive={setActive} />
                        }
                    />
                </Route>
                <Route path='/checkout' element={<ProtectedRouter>
                    <Checkout/>
                </ProtectedRouter>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/shop/:id' element={<ProductDetails/>}/>
                <Route path='/shop' element={<Shop setActive={setActive}/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/blog' element={<BlogPage setActive={setActive}/>}/>
                <Route
                    path="/search"
                    element={<BlogPage setActive={setActive} user={user} />}
                />
                <Route
                    path="/detail/:id"
                    element={<Detail setActive={setActive} user={user} />}
                />

                <Route path="/tag/:tag" element={<TagBlog setActive={setActive} />} />
                <Route path="/category/:category" element={<CategoryBlog setActive={setActive}  />} />
            </Routes>
            <Footer/>
        </>
    )
}
export default Routers;