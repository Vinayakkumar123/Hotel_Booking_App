import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "", photo: "" }]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllRooms()
            .then((data) => {
                setRooms(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="mt-5 text-center">Loading rooms...</div>;
    }
    if (errorMessage) {
        return <div className="text-danger mb-5 mt-5 text-center">Error: {errorMessage}</div>;
    }

    const sectionStyle = {
        background: "linear-gradient(135deg,rgb(241, 208, 47) 0%,rgb(36, 37, 38) 100%)", // Gradient background
        padding: "3rem 0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
    };

    const headingStyle = {
		fontSize: "2.5rem",
        color: "#fff", // White text for the heading
        fontWeight: "bold",
		
    };

    const subheadingStyle = {
        color: "rgb(255, 255, 255)", // Light gray text for the subheading
		fontSize: "1.5rem",
		fontWeight: "bold",
    };

    return (
        <section style={sectionStyle} className="mb-5">
            <Container>
                <h2 className="text-center mb-4" style={headingStyle}>
                    Explore Our Rooms
                </h2>
                <p className="text-center mb-4" style={subheadingStyle}>
                    Discover the perfect room for your stay. Comfortable, luxurious, and affordable.
                </p>
                <Carousel indicators={false} interval={5000}>
                    {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card className="h-100 border-0 shadow-sm">
                                            <Link to={`/book-room/${room.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${room.photo}`}
                                                    alt="Room Photo"
                                                    className="w-100"
                                                    style={{
                                                        height: "200px",
                                                        objectFit: "cover",
                                                        borderTopLeftRadius: "8px",
                                                        borderTopRightRadius: "8px",
                                                    }}
                                                />
                                            </Link>
                                            <Card.Body className="d-flex flex-column">
                                                <Card.Title className="text-primary fw-bold">{room.roomType}</Card.Title>
                                                <Card.Text className="text-muted mb-3">₹{room.roomPrice}/night</Card.Text>
                                                <div className="mt-auto">
                                                    <Link
                                                        to={`/book-room/${room.id}`}
                                                        className="btn btn-warning btn-sm w-100"
                                                        style={{ color: "#fff" }}
                                                    >
                                                        Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className="text-center mt-4">
                    <Link to={"/browse-all-rooms"} className="btn btn-outline-light">
                        Browse All Rooms
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default RoomCarousel;