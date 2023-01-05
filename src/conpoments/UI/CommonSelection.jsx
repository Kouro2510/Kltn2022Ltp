import React from "react";
import {Container} from "reactstrap";
import "../../style/CommonSelection.css"
const CommonSelection = ({title}) => {
  return(
      <section className="common_selection">
        <Container className="text-center">
          <h1>{title}</h1>
        </Container>
      </section>
  )
}
export default CommonSelection