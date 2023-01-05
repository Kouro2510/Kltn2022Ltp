import Helmet from "../conpoments/Helmet/Helmet";
import {Col, Container, Row} from "reactstrap";
import {motion} from "framer-motion";
import heroImg from "../assets/images/logo.png"
import counter from "../assets/images/car-01-8.png"
import "../style/Home.css"
import {Link} from "react-router-dom";
import Service from "../service/service";
import Productlist from "../conpoments/UI/Productlist";
import React, {useEffect, useState} from "react";
import Clock from "../conpoments/UI/Clock";
import useGetData from "../custom-hooks/getData";
import BlogSection from "../conpoments/Blog/BlogSection";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore";
import {db} from "../firebase";
const Home = () => {
    const {data:products}=useGetData('products')
    const [blogs, setBlogs] = useState([]);
    const [trending,setTrending]=useState([]);
    const [bestsales,setBestsales]=useState([]);
    const [categoryProduct,setCategoryproduct]=useState([]);
    const year= new Date().getFullYear();
    const getBlogs = async () => {
        const blogRef = collection(db, "blogs");
        console.log(blogRef);
        const firstFour = query(blogRef, orderBy("title"), limit(4));
        const docSnapshot = await getDocs(firstFour);
        setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    useEffect(()=>{
        const Trending=products.filter((item)=>item.categoryTitle==='popular');
        const Bestsales=products.filter((item)=>item.categoryTitle==='sale');
        const Categoryproduct=blogs.filter((item)=>item.category==='Technology');
        setBestsales(Bestsales);
        setTrending(Trending);
        setCategoryproduct(Categoryproduct);
    },[products]);
    return(
        <Helmet title={"Home"}>
           <section className="hero_section">
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="hero_content">
                            <p className="hero_subtitle">Sản phẩm hot {year}</p>
                                <h2>Ở đây chúng tôi luôn đặt hài lòng khách hàng lên hàng đầu</h2>
                                <p>Chào mừng bạn đến với Car Store nơi làm bạn hài lòng</p>
                                <motion.button whileTap={{scale:1.2}} className="buy_btn"><Link to="/shop">Xem sản phẩm</Link></motion.button>
                            </div>
                        </Col>
                        <Col lg='6' md='6'>
                            <img src={heroImg} alt="/" width="100%"/>
                        </Col>
                    </Row>
                </Container>
           </section>
            <Service/>
            <section className="trending_products">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section_title">Sản Phẩm Nỗi Bật</h2>
                        </Col>
                        <Productlist data={trending}/>
                    </Row>
                </Container>
            </section>

            <section className="timer_count">
                <Container>
                    <Row className="position-relative">
                        <Col lg='6' md='6'>
                            <div className="clock_top-content">
                                <h1 className="text-white  mt-2 mb-3">Khung giờ vàng</h1>
                                <h3 className="text-white mb-2">Nhân dịp tết đến khi mua sản phẩm </h3>
                                <h3 className="text-white mb-2">sẽ được những món quà hấp dẫn</h3>
                            </div>
                            <Clock/>
                            <motion.button whileTap={{scale:1.2}} className="buy_btn store_btn"><Link to="/shop">Xem sản phẩm</Link></motion.button>
                        </Col>
                        <Col lg='6' md='12' className="text-end counter_img">
                            <img src={counter} alt="/" width="100%"/>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="popular_category mt-2 mb-2">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section_title">Blogs</h2>
                        </Col>
                        {blogs?.map((blog) => (
                            <BlogSection
                                key={blog.id}
                                {...blog}
                            />
                        ))}
                    </Row>
                </Container> <section className="best_sales">
                <Container>
                    <Row>
                        <Col lg="12" className="text-center">
                            <h2 className="section_title">Sản Phẩm Giảm Giá</h2>
                        </Col>
                        <Productlist data={bestsales}/>
                    </Row>
                </Container>
            </section>
            </section>
        </Helmet>
    )
}
export default Home;