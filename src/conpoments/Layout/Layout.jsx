import React from "react";
import Header from "../header/header";
import Routers from "../../routers/Routers";
import Footer from "../footer/footer";
import {useLocation} from "react-router-dom";
import AdminNav from "../../admin/AdminNav";

const Layout = () => {


    return (
        <>


            <div>
                <Routers/>
            </div>
        </>
    )
}
export default Layout