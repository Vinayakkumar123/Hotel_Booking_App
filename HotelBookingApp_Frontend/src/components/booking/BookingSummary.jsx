import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const checkInDate = moment(booking.checkInDate);
	const checkOutDate = moment(booking.checkOutDate);
	const numberOfDays = checkOutDate.diff(checkInDate, "days");
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("UPI");
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	const handlePaymentSelection = (method) => {
		setPaymentMethod(method);
		if (method === "UPI") {
			setShowModal(true);
		} else {
			handleConfirmBooking();
		}
	};

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true);
		setTimeout(() => {
			setIsProcessingPayment(false);
			setIsBookingConfirmed(true);
			onConfirm(paymentMethod);
		}, 2000);
	};

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success");
		}
	}, [isBookingConfirmed, navigate]);

	return (
		<>
			<div className="card card-body mt-5">
				<h4 className="card-title hotel-color">Reservation Summary</h4>
				<p>Name: <strong>{booking.guestFullName}</strong></p>
				<p>Email: <strong>{booking.guestEmail}</strong></p>
				<p>Check-in Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong></p>
				<p>Check-out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong></p>
				<p>Number of Days Booked: <strong>{numberOfDays}</strong></p>
				<div>
					<h5 className="hotel-color">Number of Guest</h5>
					<strong>Adults: {booking.numOfAdults}</strong><br />
					<strong>Children: {booking.numOfChildren}</strong>
				</div>

				{payment > 0 ? (
					<>
						<p>Total payment: <strong>₹{payment}</strong></p>

						{!isBookingConfirmed && (
							<div>
								<p className="mt-2">Choose Payment Method:</p>
								<Button variant="outline-primary" className="me-2" onClick={() => handlePaymentSelection("UPI")}>Pay via UPI</Button>
								<Button variant="outline-secondary" onClick={() => handlePaymentSelection("Pay at Hotel")}>Pay at Hotel</Button>
							</div>
						)}

						{isProcessingPayment && (
							<div className="loading-overlay">
								<div className="spinner-container">
									{/* Spinner */}
									<div className="spinner-border text-primary" role="status">
										<span className="sr-only"></span>
									</div>
									{/* Static Loading Text */}
									<p className="mt-3 loading-text">Processing your payment... Please wait.</p>
								</div>
							</div>
						)}
					</>
				) : (
					<p className="text-danger">Check-out date must be after check-in date.</p>
				)}
			</div>

			{/* UPI Payment Modal */}
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Scan to Pay (UPI)</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Scan this QR code using any UPI app</p>
					<img src="/upi-qr.png" alt="UPI QR" className="img-fluid mb-3" />
					<p>Or click below to open UPI app:</p>
					<a
						className="btn btn-success"
						href={`upi://pay?pa=example@upi&pn=Hotel&am=${payment}&cu=INR`}
					>
						Open in UPI App
					</a>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
					<Button variant="primary" onClick={handleConfirmBooking}>I Have Paid</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default BookingSummary;