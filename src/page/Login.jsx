import Helmet from "../conpoments/Helmet/Helmet";
import {Container, Row, Col, Form, FormGroup} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import "../style/Login.css"
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {toast} from "react-toastify";
import {auth} from "../firebase";
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const signIn=async (e)=>{
        e.preventDefault()
        setLoading(true);
        try {
            const userCrendential=await signInWithEmailAndPassword(auth,email,password)
            const user=userCrendential.user;
            setLoading(false);
            toast.success("Success");
            navigate("/")
        }
        catch (error){
            toast.error(error.message);
            setLoading(false)
            console.log(error.message)
        }
    }
    return(
       <Helmet title="Login">
            <section>
                <Container>
                    <Row>
                        {loading?(<Col lg="12"className="text-center">
                            <h5 className="fw-bold">Loading......</h5>
                        </Col>):(   <Col lg="6" className="m-auto text-center mb-2">
                            <h3 className="fw-bold fs-5">Đăng nhập</h3>
                            <Form className="auth_form" onSubmit={signIn}>
                                <FormGroup className="form-group">
                                    <input type="email" placeholder="Vui lòng nhập Email"
                                           value={email} onChange={e=>setEmail(e.target.value)}/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <input type="password" placeholder="Vui lòng nhập mật khẩu"
                                           value={password} onChange={e=>setPassword(e.target.value)}/>
                                </FormGroup>
                                <button className="buy_btn auth_btn">Đăng nhập</button>
                                <p>Bạn chưa có account{" "}
                                    <Link to={"/signup"}>Đăng ký ngay</Link>
                                </p>
                            </Form>
                        </Col>)}
                    </Row>
                </Container>
            </section>
       </Helmet>
    )
}
export default Login;