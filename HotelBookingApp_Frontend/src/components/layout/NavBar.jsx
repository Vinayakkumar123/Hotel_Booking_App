import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logout from "../auth/Logout";
import "./NavBar.css"; // Import custom CSS for additional styling

const NavBar = () => {
	const [showAccount, setShowAccount] = useState(false);

	const handleAccountClick = () => {
		setShowAccount(!showAccount);
	};

	const isLoggedIn = localStorage.getItem("token");
	const userRole = localStorage.getItem("userRole");

	return (
		<nav className="navbar navbar-expand-lg bg-light px-5 shadow sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="navbar-brand fw-bold text-primary">
					<span className="hotel-color">HotelHop</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link text-dark" to={"/browse-all-rooms"}>
								Browse all rooms
							</NavLink>
						</li>

						{isLoggedIn && userRole === "ROLE_ADMIN" && (
							<li className="nav-item">
								<NavLink className="nav-link text-dark" to={"/admin"}>
									Admin
								</NavLink>
							</li>
						)}
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link text-dark" to={"/find-booking"}>
								Find my booking
							</NavLink>
						</li>

						<li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle text-dark ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}
							>
								Account
							</a>

							<ul
								className={`dropdown-menu dropdown-menu-end ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown"
							>
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
