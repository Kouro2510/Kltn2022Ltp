import React, {useEffect, useRef} from "react";
import "./header.css";
import {Container, Row} from "reactstrap";
import logo from "../../assets/images/sedan-car-front.png"
import {Link, NavLink, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import userIcon from "../../assets/images/user-icon.png"
import {useSelector} from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import {signOut} from "firebase/auth"
import {auth} from "../../firebase";
import {toast} from "react-toastify";
const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const totalQuality = useSelector(state => state.cart.totalQuatity)
    const menuToggle = () => menuRef.current.classList.toggle('active_menu');
    const {currentUser} = useAuth();
    console.log(currentUser);
    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky_header')
            } else {
                headerRef.current.classList.remove('sticky_header')
            }
        })
    }
    useEffect(() => {
        stickyHeaderFunc();
        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    })
    const nav_link = [{
        path: 'home', display: 'Trang chủ',
    }, {
        path: 'shop', display: 'Sản phẩm',
    }, {
        path: 'blog', display: 'Blog',
    }, {
        path: 'contact', display: 'Liên hệ',
    }]
    const navigate = useNavigate();
    const navigateToCart = () => {
        navigate("/cart")
    }
    const profileActionRef=useRef(null);
    const logOut=()=>{
        signOut(auth).then(()=>{
            toast.success('logout');
            navigate("/home")
        }).catch(err=>{
            toast.error(err.message);
        })
    }
    const toogleProfileAction=()=>profileActionRef.current.classList.toggle('show_profileAction')
    return (<header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav_wapper">
                    <div className="logo">
                        <img src={logo} alt="/"/>
                        <div>
                            <h1>Car Store</h1>
                        </div>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {nav_link.map((item, key) => (<li className="nav_item" key={key}>
                                <NavLink to={item.path}
                                         className={(navClass) => navClass.isActive ? 'nav_active' : ''}>{item.display}</NavLink>
                            </li>))}
                        </ul>
                    </div>
                    <div className="nav_icons">
                 <span className="fav_icon">
                  <i className="ri-heart-line"></i>
                     <span className="badge">1</span>
                </span>
                        <span className="cart_icon" onClick={navigateToCart}>
                  <i className="ri-shopping-bag-line"></i>
                     <span className="badge">{totalQuality}</span>
                </span>
                        <span className="profile">
                  <motion.img whileTap={{scale: 1.2}} src={currentUser ? currentUser?.photoURL : userIcon} onClick={toogleProfileAction} alt="/"/>
                            <div className="profile_actions" ref={profileActionRef}>
                                {
                                    currentUser ? <div className="d-flex flex-column align-items-center justify-content-center">
                                        <span onClick={logOut}>Đăng xuất</span>
                                        <Link to="/dashboard/all-product">Trang Admin</Link>
                                    </div> : <div className="d-flex flex-column align-items-center justify-content-center">
                                        <Link to="/login">Đăng nhập</Link>
                                        <Link to="/signup">Đăng ký</Link>
                                        <Link to="/dashboard/all-product">Trang Admin</Link>

                                    </div>
                                }
                            </div>

                </span>
                        <div className="mobile_menu">
                <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                </span>
                        </div>
                    </div>

                </div>
            </Row>
        </Container>
    </header>)
}
export default Header;