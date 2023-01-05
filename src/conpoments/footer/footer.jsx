import React from "react";
import "./footer.css"
import {Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import {Link} from "react-router-dom";
const Footer = () => {
    const year=new Date().getFullYear();
    return(
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg='4'>
                        <div className="logo">
                            <div>
                                <h1 className="text-white">Car Store</h1>
                            </div>
                        </div>
                        <p></p>
                    </Col>
                    <Col lg='3'>
                        <div className="footer_quick-link">
                            <h4 className="quick_links-title">
                                Về chúng tôi
                            </h4>
                            <ListGroup>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Giới thiệu</Link>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='#'>Quy chế hoạt động</Link>
                                </ListGroupItem>

                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='2'>
                        <div className="footer_quick-link">
                            <h4 className="quick_links-title">
                              Đường dẫn nhanh
                            </h4>
                            <ListGroup>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/shop'>Mua hàng</Link>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/cart'>Giỏ Hàng</Link>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/blog'>Blog</Link>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to='/'>Privacy Policy</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='3'>
                        <div className="footer_quick-link">
                            <h4 className="quick_links-title">
                                Liên hệ với chúng tôi
                            </h4>
                            <ListGroup>
                                <ListGroupItem className="ps-0 border-0  d-flex align-items-center gap-2">
                                    <span><i className="ri-map-pin-line"></i></span>
                                    <p>318 Quốc Lộ 1A,Quận 12,TP.Hồ Chí Minh</p>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0  d-flex align-items-center gap-2">
                                    <span><i className="ri-phone-line"></i></span>
                                    <p>+0933083958</p>
                                </ListGroupItem>
                                <ListGroupItem className="ps-0 border-0  d-flex align-items-center gap-2">
                                    <span><i className="ri-mail-line"></i></span>
                                    <p>CarShop@gmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
                <Col lg='12'>
                    <p className="footer_coppyright">Coppy right Thanh Phuong {year}</p>
                </Col>
            </Container>
        </footer>
    )
}
export default Footer;