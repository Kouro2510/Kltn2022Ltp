import {Link} from "react-router-dom";
import {Col, Container, Row} from "reactstrap";
import getData from "../custom-hooks/getData";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import {toast} from "react-toastify";

const Blog = () => {
    const {data:blogData}=getData('blogs');
    const deleteProduct=async id=>{
        await deleteDoc(doc(db,"blogs",id));
        toast.success("delete")
    }
    return(
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <button className="buy_btn mt-2"><Link to='/dashboard/add-blog'>Thêm blog</Link></button>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Thể loại</th>
                                <th>Tag</th>
                                <th>Nỗi bật</th>
                                <th>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody>
                            {blogData.map((item)=>(
                                <tr key={item.id}>
                                    <td><img src={item.imgUrl} width="10%" alt="/"/></td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>{item.tags}</td>
                                    <td>{item.trending}</td>
                                    <td>
                                        <button className="btn btn-primary" ><Link to={`update/${item.id}`}>Cập nhật</Link></button>
                                        <button className="btn btn-danger" onClick={()=>{deleteProduct(item.id)}}>Xóa</button>
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
export default Blog