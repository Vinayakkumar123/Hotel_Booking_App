import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"

const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ firstName: "", lastName: "", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<section className="container mt-5 mb-5 d-flex justify-content-center">
			<div className="col-md-8 col-lg-6 shadow-lg p-4 rounded bg-light">
				{errorMessage && (
					<div className="alert alert-danger text-center" role="alert">
						{errorMessage}
					</div>
				)}
				{successMessage && (
					<div className="alert alert-success text-center" role="alert">
						{successMessage}
					</div>
				)}

				<h2 className="text-center text-primary mb-4">Register</h2>
				<form onSubmit={handleRegistration}>
					<div className="mb-3">
						<label htmlFor="firstName" className="form-label fw-bold">
							First Name
						</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={registration.firstName}
							onChange={handleInputChange}
							placeholder="Enter your first name"
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="lastName" className="form-label fw-bold">
							Last Name
						</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={registration.lastName}
							onChange={handleInputChange}
							placeholder="Enter your last name"
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label fw-bold">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
							placeholder="Enter your email"
							required
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label fw-bold">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
							placeholder="Enter your password"
							required
						/>
					</div>

					<div className="d-grid gap-2">
						<button type="submit" className="btn btn-primary btn-lg">
							Register
						</button>
					</div>

					<div className="text-center mt-3">
						<span>
							Already have an account?{" "}
							<Link to={"/login"} className="text-decoration-none text-primary fw-bold">
								Login
							</Link>
						</span>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Registration
