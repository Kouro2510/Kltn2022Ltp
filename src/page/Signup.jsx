import Helmet from "../conpoments/Helmet/Helmet";
import {Container, Row, Col, Form, FormGroup} from "reactstrap";
import {Link,useNavigate} from "react-router-dom";
import "../style/Login.css"
import {auth, db, storage} from "../firebase";
import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {setDoc,doc} from "firebase/firestore"
import {useState} from "react";
import {toast} from "react-toastify";
const Signup = () => {
    const [username,setUser]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [file,setFile]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const signUp=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential=await createUserWithEmailAndPassword(auth,email,password)
            const user=userCredential.user
            console.log(user)
            const storageRef=ref(storage,`images/${Date.now()+email}`);
            const uploadTask=uploadBytesResumable(storageRef,file);
            uploadTask.on((error)=>{
                toast.error((error.message))
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURl)=>{
                    updateProfile(user,{
                        displayName:username,
                        photoURL:downloadURl,
                    });
                    await setDoc(doc(db,"users",user.uid),{
                        uid:user.uid,
                        displayName:username,
                        email,
                        photoURL:downloadURl,
                    })
                })
            })
            setLoading(false);
            toast.success("Account Create");
            navigate("/login");
        }
        catch (e){

        }
    }
    return(
        <Helmet title="Sign Up">
            <section>
                <Container>
                    <Row>
                        {loading?(
                            <Col lg="12" className="text-center">
                                <h5 className="fw-bold">Loading.......</h5>
                            </Col>
                        ):(
                            <Col lg="6" className="m-auto text-center">
                                <h3 className="fw-bold fs-5">Đăng ký</h3>
                                <Form className="auth_form mb-5" onSubmit={signUp}>
                                    <FormGroup className="form-group">
                                        <input type="text" placeholder="Vui lòng nhập tên"
                                               value={username} onChange={e=>setUser(e.target.value)}/>
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <input type="email" placeholder="Enter your Email"
                                               value={email} onChange={e=>setEmail(e.target.value)}/>
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <input type="password" placeholder="Vui lòng nhập mật khẩu"
                                               value={password} onChange={e=>setPassword(e.target.value)}/>
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <input type="file" placeholder="Hãy chọn một bức hình"
                                               onChange={e=>setFile(e.target.files[0])}/>
                                    </FormGroup>
                                    <button className="buy_btn auth_btn">Đăng ký</button>
                                    <p>Bạn đã có tài khoản?{" "}
                                        <Link to={"/login"}>Đăng nhập</Link>
                                    </p>
                                </Form>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}
export default Signup;