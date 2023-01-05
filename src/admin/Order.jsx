import {Col, Container, Row} from "reactstrap";
import getData from "../custom-hooks/getData";
import {doc, deleteDoc, updateDoc} from "firebase/firestore"
import {db} from "../firebase";
import {toast} from "react-toastify";
const Order = () => {
    const {data:orderData}=getData('orders');
    const deleteProduct=async id=>{
        await deleteDoc(doc(db,"orders",id));
        toast.success("delete")
    }
    const handleUpdate= async  id=>{
        const statusDoc=doc(db,"orders",id)
        const statusUpdate={status:"Đã Xác Nhận"}
        await updateDoc(statusDoc,statusUpdate);
        toast.success("Upload complete")

    }
    return(
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Thành Phố</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderData.map((item)=>(
                                <tr >
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.city}</td>
                                    <td ><p style={{background:"green",color:"black",padding:"10px",width:"140px",borderRadius:"20px"}}>{item.status}</p></td>
                                    <td className="gap-2">
                                        <button className="btn btn-primary" onClick={()=>{handleUpdate(item.id)}}>Cập nhật</button>
                                        <button className="btn btn-danger" onClick={()=>{deleteProduct(item.id)}}>Hủy đơn</button>
                                    </td>
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
export default Order