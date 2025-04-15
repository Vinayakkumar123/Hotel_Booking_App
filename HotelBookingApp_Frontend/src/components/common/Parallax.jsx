import React from "react";
import { Container } from "react-bootstrap";

const Parallax = () => {
    const parallaxStyle = {
        background: "linear-gradient(135deg,rgb(19, 19, 20) 0%,rgb(101, 100, 100) 100%)", // Gradient background
        height: "50vh", // Adjust height as needed
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px", // Optional: Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
    };

    const textStyle = {
        position: "relative",
        zIndex: 2,
        color: "#fff", // White text
        textAlign: "center",
    };

    const headingStyle = {
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "15px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Subtle text shadow for better readability
    };

    const subheadingStyle = {
        fontSize: "2rem",
        fontWeight: "300",
        color: "#e0e0e0", // Light gray text
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Subtle text shadow
    };

    const highlightStyle = {
        color: "#ffdd57", // Bright yellow for emphasis
    };

    return (
        <div style={parallaxStyle} className="mb-5">
            <Container>
                <div style={textStyle}>
                    <h1 style={headingStyle}>
                        Experience the Best Hospitality at{" "}
                        <span style={highlightStyle}>HotelHop</span>
                    </h1>
                    <h3 style={subheadingStyle}>
                        We offer the best services for all your needs.
                    </h3>
                </div>
            </Container>
        </div>
    );
};

export default Parallax;