import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    let today = new Date();
    return (
        <footer className="bg-dark text-light py-4 footer mt-lg-5">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start">
                        <p className="mb-0">
                            &copy; {today.getFullYear()} <span className="text-warning">HotelHop</span>. All rights reserved.
                        </p>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                        <a href="/privacy-policy" className="text-light me-3 text-decoration-none">
                            Privacy Policy
                        </a>
                        <a href="/terms-of-service" className="text-light text-decoration-none">
                            Terms of Service
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
