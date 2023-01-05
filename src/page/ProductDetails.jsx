import Helmet from "../conpoments/Helmet/Helmet";
import CommonSelection from "../conpoments/UI/CommonSelection";
import {Col, Container, Row} from "reactstrap";
import {useParams} from "react-router-dom";
import "../style/ProductDetails.css"
import {motion} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import Productlist from "../conpoments/UI/Productlist";
import {useDispatch} from "react-redux";
import {cartActions} from "../redux/slices/Cartslide";
import {toast} from "react-toastify";
import {db} from "../firebase";
import {doc,getDoc} from "firebase/firestore";
import useGetData from "../custom-hooks/getData";

const ProductDetails = () => {
    const [tab,setTab]=useState('desc')
    const {data:products}=useGetData('products')
    const [product,setProduct]=useState({});
    const {id}=useParams();
    const [trending,setTrending]=useState([]);
    const dispatch=useDispatch();
    const docRef=doc(db,"products",id);
    useEffect(()=>{
        const getProduct=async ()=>{
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                setProduct(docSnap.data())
            }
            else {
                toast.error("No Product")
            }
        }
        getProduct()
    })
    useEffect(()=>{
        const Trending=products.filter((item)=>item.categoryTitle==='trade');
        setTrending(Trending);
    },[products]);
    const {imgUrl,productName,price,description,shortDesc,category}=product;
    const [rating,setRating]=useState(null);

    const addToCart=()=>{
        try{
            dispatch(
                cartActions.addItem({
                    id,image:imgUrl,productName,price
                })
            );
            toast.success("Product is add success")
        }
        catch (e){
            toast.error("Error!!")
        }
    };
    useEffect(()=>{
        window.scrollTo(0,0);
    },[product])
    return(
       <Helmet title={productName}>
           <CommonSelection title={productName}/>
           <section className="pt-0 mt-3 mb-3">
               <Container>
                   <Row>
                       <Col lg='6'>
                            <img src={imgUrl} alt="/" className="w-100"/>
                       </Col>
                       <Col lg='6'>
                           <div className="product_details">
                               <h2>{productName}</h2>
                               <div className="product_rating d-flex align-items-center gap-5 mb-4">
                                   <div>
                                       <span onClick={()=>setRating(1)}>
                                         <i className="ri-star-s-fill"></i>
                                       </span>
                                       <span onClick={()=>setRating(2)}>
                                           <i className="ri-star-s-fill"></i>
                                       </span>
                                       <span onClick={()=>setRating(3)}>
                                          <i className="ri-star-s-fill"></i>
                                       </span>
                                       <span onClick={()=>setRating(4)}>
                                         <i className="ri-star-s-fill"></i>
                                       </span>
                                       <span onClick={()=>setRating(5)}>
                                          <i className="ri-star-half-fill"></i>
                                       </span>
                                   </div>
                               </div>
                               <div className="d-flex align-items-center gap-5"><span className="product_price">{price} Vnđ</span>
                               <span> Category: {category}</span></div>
                               <p className="mt-3">{shortDesc}</p>
                               <motion.button whileTap={{scale:1.3}} className="buy_btn" onClick={addToCart}>Thêm vào giỏ hàng</motion.button>
                           </div>
                       </Col>
                   </Row>
               </Container>
           </section>
           <section>
               <Container>
                   <Row>
                       <Col lg="12">
                           <div className="tab_wrapper d-flex align-items-center gap-5">
                               <h6 className={`${tab==='desc'?'active_tab':''}`} onClick={()=>{setTab('desc')}}>Chi tiết</h6>
                           </div>
                               {tab ==="desc"?(
                                   <div className="tab_content mt-5 mb-5">
                                       {description}
                                   </div>
                               ):<div className="product_review mt-5 mb-5">
                               </div>}
                       </Col>
                       <Col lg="12" className="mt-5 ">
                           <h2 className="related_title">Bạn có thể thích</h2>
                           <div className="d-flex">
                               <Productlist data={products}/>
                           </div>
                       </Col>
                   </Row>
               </Container>
           </section>
       </Helmet>
    )
}
export default ProductDetails;