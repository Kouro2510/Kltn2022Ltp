import {Col, Container, Form, FormGroup, Row} from "reactstrap";
import {db,storage} from "../firebase";
import { ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { collection,addDoc} from "firebase/firestore"
import {useState} from "react";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

const AddProduct = () => {
    const [enterTilte,setEnterTitle]=useState('');
    const [enterSortDesc,setEnterSortDesc]=useState('');
    const [enterDescription,setEnterDescription]=useState('');
    const [enterCategory,setEnterCategory]=useState('');
    const [enterCategoryTitle,setEnterCategoryTitle]=useState('');
    const [enterPrice,setEnterPrice]=useState('');
    const [enterProductImg,setEnterProductImg]=useState(null);
    const navitage=useNavigate()
    const AddProduct=async(e)=>{
        e.preventDefault()
       try {
           const docRef=await collection(db,'products')
           const storageRef=ref(storage,`productImg/${Date.now()+enterProductImg.name}`)
           const uploadTask=uploadBytesResumable(storageRef,enterProductImg)
           uploadTask.on(()=>{
               toast.error("Image not update");
           },()=>{
               getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl)=>{
                   await addDoc(docRef,{
                       productName:enterTilte,
                       shortDesc:enterSortDesc,
                       description:enterDescription,
                       category:enterCategory,
                       categoryTitle:enterCategoryTitle,
                       price:enterPrice,
                       imgUrl:downloadUrl
                   });
               })
               toast.success("Product has been Add");
               navitage("/dashboard/all-product")
           })
       }
       catch (e){
            toast.error("Product not Add")
       }
    }
    return(
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        <h4 className="mb-5 mt-2">Thêm sản phẩm</h4>

                        <Form className="mb-2" onSubmit={AddProduct}>
                            <div>
                                <FormGroup className="form-group">
                                    <span>Tên sản phẩm</span>
                                    <input type="text" placeholder="Tên" required value={enterTilte} onChange={e=>setEnterTitle(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <span>Giới thiệu ngắn gọn</span>
                                    <input type="text" placeholder="Giới thiệu ngắn gọn" required value={enterSortDesc} onChange={e=>setEnterSortDesc(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <span>Chi tiết</span>
                                    <textarea type="text" placeholder="Chi tiết" required value={enterDescription} onChange={e=>setEnterDescription(e.target.value)}/>
                                </FormGroup>
                            </div>
                            <div className="d-flex align-items-center gap-5 justify-content-between">
                                <FormGroup className="form-group w-50" >
                                    <span>Giá cả</span>
                                    <input type="text" placeholder="Giá cả" required value={enterPrice} onChange={e=>setEnterPrice(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group w-50">
                                    <span>Loại sản phẩm</span>
                                    <select className="w-100 p-2" value={enterCategory} required onChange={e=>setEnterCategory(e.target.value)}>
                                        <option >Loại</option>
                                        <option value="Car">Xe</option>
                                        <option value="Car Item">Loại xe</option>
                                    </select>
                                </FormGroup>
                                <FormGroup className="form-group w-50">
                                    <span>Tiêu đề sản phẩm</span>
                                    <select className="w-100 p-2" value={enterCategoryTitle} required onChange={e=>setEnterCategoryTitle(e.target.value)}>
                                        <option >Chọn tiêu đề sản phẩm</option>
                                        <option value="sale">Giảm giá</option>
                                        <option value="popular">Nỗi bật</option>
                                    </select>
                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup className="form-group">
                                    <span>Hình ảnh</span>
                                    <input type="file" onChange={e=>setEnterProductImg(e.target.files[0])} required/>
                                </FormGroup>
                            </div>
                            <button className="buy_btn" type={"submit"}>Thêm sản phẩm </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default AddProduct