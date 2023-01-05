import React from "react";
import {motion} from "framer-motion";
import "../../style/Product-cart.css"
import {Col} from "reactstrap";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {cartActions} from "../../redux/slices/Cartslide";
import {toast} from "react-toastify";

const Productcart = ({item}) => {
    const dispatch=useDispatch();
    const addToCart=()=>{
        dispatch(cartActions.addItem({
            id:item.id,
            productName:item.productName,
            price:item.price,
            image:item.imgUrl,
        }));
        toast.success("Product has add to cart");
    }
    return (
        <Col lg='3' md='4' className="mb-2">
            <div className="product_item">
                <div className="product_img">
                    <motion.img whileHover={{scale:0.9}} src={item.imgUrl} width="100%" alt=""/>
                </div>
              <div className="p-2 product_info">
                  <h3 className="product_name"><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                  <span>{item.category}</span>
              </div>
                <div className="product_card-bottom d-flex align-items-center  justify-content-between">
                    <span className="price">{item.price}vnđ</span>
                    <motion.span whileTap={{scale:1.3}} onClick={addToCart}>
                        <i className="ri-add-line"></i>
                    </motion.span>
                </div>
            </div>
        </Col>
    )
}
export default Productcart