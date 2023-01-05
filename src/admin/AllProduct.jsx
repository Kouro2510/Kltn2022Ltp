import {Col, Container, Row} from "reactstrap";
import getData from "../custom-hooks/getData";
import {doc,deleteDoc} from "firebase/firestore"
import {db} from "../firebase";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
const AllProduct = () => {
  const {data:productData}=getData('products');
  console.log(productData)
  const deleteProduct=async id=>{
    await deleteDoc(doc(db,"products",id));
    toast.success("delete")
  }
  return(
     <section>
       <Container>
         <Row>
           <Col lg="12">
             <button className="buy_btn mt-2"><Link to='/dashboard/add-product'>Thêm sản phẩm</Link></button>
             <table className="table">
               <thead>
               <tr>
                 <th>Hình Ảnh</th>
                 <th>Tóm tắt</th>
                 <th>Loại</th>
                 <th>Giá</th>
                 <th>Chức năng</th>
               </tr>
               </thead>
               <tbody>
               {productData.map((item)=>(
                 <tr key={item.id}>
                   <td><img src={item.imgUrl} width="10%" alt="/"/></td>
                   <td style={{width:"55%"}}>{item.shortDesc}</td>
                   <td>{item.category}</td>
                   <td>{item.price}</td>
                   <td><button className="btn btn-danger" onClick={()=>{deleteProduct(item.id)}}> Xóa Sản Phẩm</button></td>
                 </tr>
                 ))}
               </tbody>
             </table>
           </Col>
         </Row>
       </Container>
     </section>
  )
}
export default AllProduct