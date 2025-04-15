import React, { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import { Link } from "react-router-dom"

const AddRoom = () => {
	const [newRoom, setNewRoom] = useState({
		photo: null,
		roomType: "Select room type",
		roomPrice: "",
		location: "",// add location to the room
		description: ""
	})

	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [imagePreview, setImagePreview] = useState("");

	const handleRoomInputChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		if (name === "roomPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = "";
			}
		}
		setNewRoom({ ...newRoom, [name]: value })
	};

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			console.log("New room data being sent:", newRoom);
			const success = await addRoom(
				newRoom.photo,
				newRoom.roomType,
				newRoom.roomPrice,
				newRoom.location,
				newRoom.description
			);
			if (success !== undefined) {
				setSuccessMessage("A new room was  added successfully !")
				setNewRoom({ photo: null, roomType: "", roomPrice: "", location: "", description: "" });
				setImagePreview("");
				setErrorMessage("");
				document.getElementById("photo").value = ""; // Reset the file input
			} else {
				setErrorMessage("Error adding new room")
			}
		} catch (error) {
			setErrorMessage(error.message || "Error adding new room");
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6 shadow-lg p-4 rounded bg-light">
						<h2 className="text-center text-primary mt-3 mb-4">Add a New Room</h2>

						{successMessage && (
							<div className="alert alert-success fade show text-center">
								{successMessage}
							</div>
						)}

						{errorMessage && (
							<div className="alert alert-danger fade show text-center">
								{errorMessage}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label htmlFor="roomType" className="form-label fw-bold">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleRoomInputChange}
										newRoom={newRoom}
									/>
								</div>
							</div>

							<div className="mb-4">
								<label htmlFor="roomPrice" className="form-label fw-bold">
									Room Price
								</label>
								<input
									required
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									value={newRoom.roomPrice}
									onChange={handleRoomInputChange}
									placeholder="Enter room price"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="location" className="form-label fw-bold">
									Location
								</label>
								<input
									required
									type="text"
									className="form-control"
									id="location"
									name="location"
									value={newRoom.location}
									onChange={handleRoomInputChange}
									placeholder="Enter room location"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="description" className="form-label fw-bold">
									Description
								</label>
								<textarea
									required
									className="form-control"
									id="description"
									name="description"
									value={newRoom.description}
									onChange={handleRoomInputChange}
									placeholder="Enter room description"
									rows="4"
								></textarea>
							</div>

							<div className="mb-4">
								<label htmlFor="photo" className="form-label fw-bold">
									Room Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<div className="text-center mt-3">
										<img
											src={imagePreview}
											alt="Preview room photo"
											style={{ maxWidth: "100%", maxHeight: "300px" }}
											className="img-thumbnail"
										/>
									</div>
								)}
							</div>

							<div className="d-grid gap-2 d-md-flex justify-content-between mt-4">
								<Link to={"/existing-rooms"} className="btn btn-outline-info btn-lg">
									View Existing Rooms
								</Link>
								<button type="submit" className="btn btn-primary btn-lg">
									Save Room
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default AddRoom
