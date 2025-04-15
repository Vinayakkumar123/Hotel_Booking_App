import React, { useState } from "react";
import moment from "moment";
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions";

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [bookingInfo, setBookingInfo] = useState({
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: "",
    });
    const [isDeleted, setIsDeleted] = useState(false);

    const emptyBookingInfo = {
        id: "",
        bookingConfirmationCode: "",
        room: { id: "", roomType: "" },
        roomNumber: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalNumOfGuests: "",
    };

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const data = await getBookingByConfirmationCode(confirmationCode);
            setBookingInfo(data);
            setError(null);
        } catch (error) {
            setBookingInfo(emptyBookingInfo);
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        }

        setTimeout(() => setIsLoading(false), 2000);
    };

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id);
            setIsDeleted(true);
            setSuccessMessage("Booking has been cancelled successfully!");
            setBookingInfo(emptyBookingInfo);
            setConfirmationCode("");
            setError(null);
        } catch (error) {
            setError(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setIsDeleted(false);
        }, 2000);
    };

    return (
        <>
            {/* Background Section */}
            <div
                className="container-fluid py-5"
                style={{
                    background: "rgb(58, 58, 58)", // Gradient background
                    minHeight: "100vh",
                }}
            >
                <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                    <h2 className="text-center mb-4 text-white fw-bold">Find My Booking</h2>
                    <form onSubmit={handleFormSubmit} className="col-md-6">
                        <div className="input-group mb-3 shadow-sm">
                            <input
                                className="form-control"
                                type="text"
                                id="confirmationCode"
                                name="confirmationCode"
                                value={confirmationCode}
                                onChange={handleInputChange}
                                placeholder="Enter the booking confirmation code"
                            />
                            <button type="submit" className="btn btn-primary input-group-text">
                                Find Booking
                            </button>
                        </div>
                    </form>

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="text-center mt-4">
                            <div className="spinner-border text-light" role="status"></div>
                            <p className="mt-2 text-white">Finding your booking...</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <div className="text-danger text-center mt-4">{error}</div>}

                    {/* Booking Information */}
                    {!isLoading && bookingInfo.bookingConfirmationCode && (
                        <div className="col-md-6 mt-4 mb-5 p-4 shadow rounded bg-light">
                            <h3 className="text-center text-success fw-bold">Booking Information</h3>
                            <hr />
                            <p>
                                <strong>Confirmation Code:</strong>{" "}
                                <span className="text-success">{bookingInfo.bookingConfirmationCode}</span>
                            </p>
                            <p>
                                <strong>Room Number:</strong> {bookingInfo.room.id}
                            </p>
                            <p>
                                <strong>Room Type:</strong> {bookingInfo.room.roomType}
                            </p>
                            <p>
                                <strong>Check-in Date:</strong>{" "}
                                {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                            </p>
                            <p>
                                <strong>Check-out Date:</strong>{" "}
                                {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                            </p>
                            <p>
                                <strong>Full Name:</strong> {bookingInfo.guestName}
                            </p>
                            <p>
                                <strong>Email Address:</strong> {bookingInfo.guestEmail}
                            </p>
                            <p>
                                <strong>Adults:</strong> {bookingInfo.numOfAdults}
                            </p>
                            <p>
                                <strong>Children:</strong> {bookingInfo.numOfChildren}
                            </p>
                            <p>
                                <strong>Total Guests:</strong> {bookingInfo.totalNumOfGuests}
                            </p>

                            {!isDeleted && (
                                <button
                                    onClick={() => handleBookingCancellation(bookingInfo.id)}
                                    className="btn btn-danger w-100 mt-3"
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    )}

                    {/* Success Message */}
                    {isDeleted && (
                        <div className="alert alert-success mt-3 fade show text-center">
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FindBooking;