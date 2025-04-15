import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi
} from "react-icons/fa";

const HotelService = () => {
  return (
    <Container
      className="py-5"
      style={{
        backgroundColor: "#f0f8ff", // Light pastel blue for the container
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-5">
        <h3 className="fw-bold mb-3" style={{ color: "#343a40" }}>
          Services at <span className="text-primary">HotelHop</span>
        </h3>
        <div className="d-flex align-items-center justify-content-center">
          <FaClock className="me-2 fs-4 text-primary" />
          <span className="fs-5" style={{ color: "#343a40" }}>24-Hour Front Desk</span>
        </div>
      </div>

      {/* Services Cards Section */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {[
          { icon: <FaWifi />, title: "WiFi", text: "Stay connected with high-speed internet access." },
          { icon: <FaUtensils />, title: "Breakfast", text: "Start your day with a delicious breakfast buffet." },
          { icon: <FaTshirt />, title: "Laundry", text: "Keep your clothes clean and fresh with our laundry service." },
          { icon: <FaCocktail />, title: "Mini-bar", text: "Enjoy a refreshing drink or snack from our in-room mini-bar." },
          { icon: <FaParking />, title: "Parking", text: "Park your car conveniently in our on-site parking lot." },
          { icon: <FaSnowflake />, title: "Air Conditioning", text: "Stay cool and comfortable with our air conditioning system." }
        ].map((service, index) => (
          <Col key={index}>
            <Card
              className="h-100 shadow-lg border-0 service-card"
              style={{
                backgroundColor: "#ffffff", // White background for cards
                borderRadius: "10px"
              }}
            >
              <Card.Body className="text-center p-4">
                <div className="icon-wrapper mb-3">
                  <span className="service-icon fs-2 text-primary">
                    {service.icon}
                  </span>
                </div>
                <Card.Title className="fw-bold mb-3" style={{ color: "#343a40" }}>
                  {service.title}
                </Card.Title>
                <Card.Text className="text-muted">{service.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HotelService;