import React, {useEffect, useState} from "react";
import CommonSelection from "../conpoments/UI/CommonSelection";
import Helmet from "../conpoments/Helmet/Helmet";
import "../style/Shop.css"
import {Col, Container, Row} from "reactstrap";
import Productlist from "../conpoments/UI/Productlist";
import getData from "../custom-hooks/getData";


const Shop = ({ setActive, active }) => {
    const {data:productData}=getData('products');




  return(
      <Helmet title="Shop">
          <CommonSelection title="Sản phẩm"/>
          <section>
              <Container>
                  <Row>
                      <Col lg="12"className="d-flex productlist">
                             <Productlist data={productData}/>
                         </Col>
                  </Row>
              </Container>
          </section>
      </Helmet>
  )
}
export default Shop;