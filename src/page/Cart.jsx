import React, {useState} from "react";
import "../style/cart.css"
import Helmet from "../conpoments/Helmet/Helmet";
import CommonSelection from "../conpoments/UI/CommonSelection";
import {motion} from "framer-motion";
import {Col, Container, Form, FormGroup, Row} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {cartActions} from "../redux/slices/Cartslide";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";
import {toast} from "react-toastify";
const Cart = () => {
  const cartItem =useSelector((state) => state.cart.cartItem);
    console.log(cartItem)
    const [enterName,setEnterName]=useState('');
    const [enterPhonenumber,setEnterPhonenumber]=useState('');
    const [enterAddress,setEnterAddress]=useState('');
    const [enterEmail,setEnterEmail]=useState('');
    const [enterCity,setEnterCity]=useState('');
    const navitage=useNavigate()
    const AddProduct=async(e)=>{
        e.preventDefault()
        try {
            const docRef=await collection(db,'orders')
                    await addDoc(docRef,{
                        name:enterName,
                        email:enterEmail,
                        phone:enterPhonenumber,
                        address:enterAddress,
                        city:enterCity,
                        status:"chưa xác nhận"
                    });
                toast.success("Đặt hàng thành công");
                navitage("/home")
        }
        catch (e){
            toast.error("Đặt hàng thất bại")
        }
    }
  return(
      <Helmet title="cart">
        <CommonSelection title="Shopping Cart"/>
        <section>
          <Container>
            <Row>
              <Col lg="9">
                {cartItem.length===0?(<h4 className="text-center">No item please chose item to <Link to="/shop" style={{color:"blue", textUnderlineOffset:"auto"}}>Shop</Link></h4>):(
                    <table className="table bodered">
                  <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cartItem.map((item)=>(
                      <Tr item={item} />
                  ))}
                  </tbody>
                </table>)}

              </Col>
              <Col lg="3">
                <div className="mt-3">
                    <Form className="billing_from">
                        <FormGroup className="form-group">
                            <input type={"name"} placeholder="Enter your name" value={enterName} onChange={e=>setEnterName(e.target.value)}/>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <input type={"email"} placeholder="Enter your email" value={enterEmail} onChange={e=>setEnterEmail(e.target.value)}/>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <input type={"text"} placeholder="Enter Phone Number" value={enterPhonenumber} onChange={e=>setEnterPhonenumber(e.target.value)}/>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <input type={"text"} placeholder="Street Address" value={enterAddress} onChange={e=>setEnterAddress(e.target.value)}/>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <input type={"text"} placeholder="City" value={enterCity} onChange={e=>setEnterCity(e.target.value)}/>
                        </FormGroup>
                    </Form>
                </div>
                  <div>
                      <button className="buy_btn w-100"><Link to="/shop">Tiếp tục mua sắm</Link></button>
                      <button className="buy_btn w-100 mt-2 mb-4"  onClick={AddProduct}> Đặt hàng</button>
                  </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
  )
}
const Tr =({item})=>{
    const dispatch=useDispatch();
    const deleteProduct=()=>{
        dispatch(cartActions.deleteItem(item.id))
    }
    return(
        <tr>
            <td>
                <img src={item.image}  alt="/"/>
            </td>
            <td>
                {item.productName}
            </td>
            <td>
                {item.price}
            </td>
            <td>
                {item.quality}
            </td>
            <td>
                <motion.i onSubmit={deleteProduct} whileTap={{scale:1.5}} className="ri-delete-bin-2-line"></motion.i>
            </td>
        </tr>
    )
}
export default Cart;