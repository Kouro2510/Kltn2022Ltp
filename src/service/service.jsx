import React from "react";
import {motion} from "framer-motion";
import {Col, Container, Row} from "reactstrap";
import './service.css'
import serviceData from "../assets/data/serviceData";
const Service = () => {
  return(
      <section className="services">
            <Container>
                <Row>
                    {serviceData.map((item,key)=>(
                        <Col lg="3" md="4" key={key}>
                            <motion.div whileHover={{scale:1.1}} className="service_item" style={{background:`${item.bg}`}}>
                            <span>
                                <i className={item.icon}></i>
                            </span>
                                <div>
                                    <h3>
                                        {item.title}
                                    </h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
      </section>
  )
}
export default Service