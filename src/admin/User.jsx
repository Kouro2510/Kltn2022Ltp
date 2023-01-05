import {Col, Container, Row} from "reactstrap";
import useGetData from "../custom-hooks/getData";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import {toast} from "react-toastify";

const User = () => {
    const {data:usersData}=useGetData('users');
    const deleteProduct=async id=>{
        await deleteDoc(doc(db,"users",id));
        toast.success("delete")
    }
  return(
      <section>
          <Container>
              <Row>
                  <Col lg="12">
                      <h4 className="fw-bold mt-3">Người dùng</h4>
                  </Col>
                  <Col lg="12" className="pt-5">
                      <table className="table">
                          <thead>
                          <tr>
                              <th>Hình Ảnh</th>
                              <th>Tên</th>
                              <th>Email</th>
                              <th>Thao tác</th>
                          </tr>
                          </thead>
                          <tbody>
                          {usersData.map((item)=>(
                              <tr key={item.uid}>
                                  <td><img src={item.photoURL} width="10%" alt="/"/></td>
                                  <td>{item.displayName}</td>
                                  <td>{item.email}</td>
                                  <td>
                                      {" "}
                                      <button className="btn btn-danger" onClick={()=>{deleteProduct(item.uid)}}>Xóa</button></td>
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
export default User