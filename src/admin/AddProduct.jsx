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
                        <h4 className="mb-5 mt-2">Th??m s???n ph???m</h4>

                        <Form className="mb-2" onSubmit={AddProduct}>
                            <div>
                                <FormGroup className="form-group">
                                    <span>T??n s???n ph???m</span>
                                    <input type="text" placeholder="T??n" required value={enterTilte} onChange={e=>setEnterTitle(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <span>Gi???i thi???u ng???n g???n</span>
                                    <input type="text" placeholder="Gi???i thi???u ng???n g???n" required value={enterSortDesc} onChange={e=>setEnterSortDesc(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <span>Chi ti???t</span>
                                    <textarea type="text" placeholder="Chi ti???t" required value={enterDescription} onChange={e=>setEnterDescription(e.target.value)}/>
                                </FormGroup>
                            </div>
                            <div className="d-flex align-items-center gap-5 justify-content-between">
                                <FormGroup className="form-group w-50" >
                                    <span>Gi?? c???</span>
                                    <input type="text" placeholder="Gi?? c???" required value={enterPrice} onChange={e=>setEnterPrice(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group w-50">
                                    <span>Lo???i s???n ph???m</span>
                                    <select className="w-100 p-2" value={enterCategory} required onChange={e=>setEnterCategory(e.target.value)}>
                                        <option >Lo???i</option>
                                        <option value="Car">Xe</option>
                                        <option value="Car Item">Lo???i xe</option>
                                    </select>
                                </FormGroup>
                                <FormGroup className="form-group w-50">
                                    <span>Ti??u ????? s???n ph???m</span>
                                    <select className="w-100 p-2" value={enterCategoryTitle} required onChange={e=>setEnterCategoryTitle(e.target.value)}>
                                        <option >Ch???n ti??u ????? s???n ph???m</option>
                                        <option value="sale">Gi???m gi??</option>
                                        <option value="popular">N???i b???t</option>
                                    </select>
                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup className="form-group">
                                    <span>H??nh ???nh</span>
                                    <input type="file" onChange={e=>setEnterProductImg(e.target.files[0])} required/>
                                </FormGroup>
                            </div>
                            <button className="buy_btn" type={"submit"}>Th??m s???n ph???m </button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default AddProduct