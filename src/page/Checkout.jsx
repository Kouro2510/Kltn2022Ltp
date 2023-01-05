import {Container, Row, Col, FormGroup, Form} from "reactstrap";
import Helmet from "../conpoments/Helmet/Helmet";
import CommonSelection from "../conpoments/UI/CommonSelection";
import "../style/checkout.css"
const Checkout = () => {
    return(
        <Helmet title="Check Out">
            <CommonSelection title="Check Out"/>
            <section className="mt-3">
                <Container>
                    <Row>
                        <Col lg="8">
                            <h6 className="mb-4 fw-bold">Billing Information</h6>
                            <Form className="billing_from">
                                <FormGroup className="form-group">
                                    <input type={"name"} placeholder="Enter your name"/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <input type={"email"} placeholder="Enter your email"/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <input type={"number"} placeholder="Enter Phone Number"/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <input type={"text"} placeholder="Street Address"/>
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <input type={"text"} placeholder="City"/>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col lg="4">
                            <div className="checkout_cart">
                            </div>
                            <button className="buy_btn checkout_btn w-100">Place an order</button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}
export default Checkout;