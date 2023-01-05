import React from "react";
import Productcart from "./Productcart";

const Productlist = ({data}) => {
    return (
        <>
            {data?.map((item,index)=>(
                <Productcart item={item} key={index}/>
            ))}

        </>
    )
}
export default Productlist