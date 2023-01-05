import {Container, Row} from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import "../style/Admin-nav.css"
import {NavLink} from "react-router-dom";

const adminNav=[

    {
        display:"Sản phẩm",
        path:'/dashboard/all-product'
    },
    {
        display:"Đơn hàng",
        path:'/dashboard/orders'
    },
    {
        display:"Người dùng",
        path:'/dashboard/users'
    },
    {
        display:"Blogs",
        path:'/dashboard/blogs'
    },
]
const AdminNav = () => {
    const {currentUser}=useAuth();
  return(
    <>
        <header className="admin_header">
            <Container>
                <div className="admin_nav-wrapper-top">
                    <div className="logo">
                        <h1>CarStore</h1>
                    </div>
                    <div className="search_box">
                        <input type={"text"} placeholder={"Seach....."}/>
                        <span><i className="ri-search-line"></i></span>
                    </div>
                    <div className="admin_nav-top-right">
                        <span><i className="ri-notification-3-line"></i></span>
                        <span><i className="ri-settings-2-line"></i></span>
                        <img src={currentUser.photoURL} alt="/"/>
                    </div>
                </div>
            </Container>
        </header>
        <section className="admin-menu">
            <Container>
                <Row>
                    <div className="admin_navigation">
                        <ul className="admin_menu-list">
                            {adminNav.map((item,index)=>(
                                <li className="admin_menu-item" key={index}>
                                    <NavLink className={navClass=> navClass.isActive?' active_admin-menu':""} to={item.path}>{item.display}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Row>
            </Container>
        </section>
    </>
  )
}
export default AdminNav