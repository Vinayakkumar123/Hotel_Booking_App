import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"

const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

    // Styles
    const titleStyle = {
        color: "#007bff", // Blue color for the title
        fontWeight: "bold",
        fontSize: "2.5rem", // Reduced font size for the title
        textAlign: "center",
        marginBottom: "1.5rem",
        fontFamily: "'Roboto', sans-serif",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    }

    const successTextStyle = {
        color: "#28a745", // Bright green for success
        fontWeight: "bold",
        fontSize: "2rem", // Reduced font size for success text
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Subtle shadow for better readability
        fontFamily: "'Roboto', sans-serif",
    }

    const errorTextStyle = {
        color: "#dc3545", // Bright red for error
        fontWeight: "bold",
        fontSize: "2rem", // Reduced font size for error text
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Subtle shadow for better readability
        fontFamily: "'Roboto', sans-serif",
    }

    const messageTextStyle = {
        color: "#343a40", // Dark gray for message text
        fontSize: "1.5rem", // Reduced font size for message details
        marginTop: "1rem",
        fontFamily: "'Open Sans', sans-serif", // Clean font for body text
    }

    const containerStyle = {
        background: "linear-gradient(to bottom, #ffffff, #f8f9fa)", // Gradient background
        padding: "2.5rem", // Reduced padding
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Stronger shadow for a card-like effect
        textAlign: "center",
        maxWidth: "650px", // Slightly reduced width
        margin: "2.5rem auto",
        border: "2px solid #007bff", // Blue border for emphasis
    }

    const buttonStyle = {
        marginTop: "1.5rem", // Reduced margin
        padding: "0.6rem 1.2rem", // Reduced padding
        fontSize: "1.2rem", // Reduced button text size
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        textDecoration: "none",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
    }

    const buttonHoverStyle = {
        backgroundColor: "#0056b3", // Darker blue on hover
        transform: "scale(1.05)", // Slight zoom effect
    }

    return (
        <div className="container">
            <Header title="Booking Status" />

            {/* Main Container */}
            <div className="container" style={containerStyle}>
                {message ? (
                    <div>
                        <h3 style={successTextStyle}>🎉 Booking Successful!</h3>
                        <p style={messageTextStyle}>{message}</p>
                    </div>
                ) : (
                    <div>
                        <h3 style={errorTextStyle}>❌ Booking Failed!</h3>
                        <p style={messageTextStyle}>{error}</p>
                    </div>
                )}
                <Link
                    to="/"
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                    Go Back to Home
                </Link>
            </div>
        </div>
    )
}

export default BookingSuccess