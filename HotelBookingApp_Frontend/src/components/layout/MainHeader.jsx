import React from "react";

const MainHeader = () => {
	return (
		<header
			className="d-flex align-items-center justify-content-center text-center bg-dark text-white"
			style={{
				backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hotel-banner.jpg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "60vh",
				minHeight: "400px",
			}}
		>
			<div className="container">
				<h1 className="display-3 fw-bold mb-3">
					Welcome to <span className="text-warning">HotelHop</span>
				</h1>
				<h3 className="fw-light mb-4">Where Every Stay Feels Like Coming Home</h3>
				<p className="lead">Discover premium comfort at unbeatable prices</p>
			</div>
		</header>
	);
};

export default MainHeader;