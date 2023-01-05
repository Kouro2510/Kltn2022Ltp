import {Container, Form, FormGroup} from "reactstrap";

const Contact = () => {
    return(
        <>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4436614509846!2d106.62563971474964!3d10.853821092269044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1672842746861!5m2!1svi!2s"
                width="100%"
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <Container>
                <Form className="mb-2  d-flex flex-column " >
                    <div>
                        <FormGroup className="form-group">
                            <span>Name</span>
                            <input type="text" placeholder="Enter Name" required />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <span>Email</span>
                            <input type="text" placeholder="Enter Email" required />
                        </FormGroup>
                        <FormGroup className="form-group">
                            <span>Message</span>
                            <textarea type="text" placeholder="Message" required />
                        </FormGroup>
                    </div>
                    <button className="buy_btn" type={"submit"}>Add Contact</button>
                </Form>
            </Container>
        </>

    )
}
export default Contact;