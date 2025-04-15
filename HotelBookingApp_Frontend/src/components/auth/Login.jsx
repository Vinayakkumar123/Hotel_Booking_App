import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<section className="container mt-5 mb-5 d-flex justify-content-center">
			<div className="col-md-8 col-lg-6 shadow-lg p-4 rounded bg-light">
				{errorMessage && (
					<div className="alert alert-danger text-center" role="alert">
						{errorMessage}
					</div>
				)}
	
				<h2 className="text-center text-primary mb-4">Login</h2>
				<form onSubmit={handleSubmit} className="mt-4">
					<div className="mb-3">
						<label htmlFor="email" className="form-label fw-bold">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
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
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
							placeholder="Enter your password"
							required
						/>
					</div>
	
					<div className="d-grid gap-2">
						<button type="submit" className="btn btn-primary btn-lg">
							Login
						</button>
					</div>
	
					<div className="text-center mt-3">
						<span>
							Don't have an account yet?{" "}
							<Link to={"/register"} className="text-decoration-none text-primary fw-bold">
								Register
							</Link>
						</span>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login
