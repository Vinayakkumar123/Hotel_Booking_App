import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Spinner } from "react-bootstrap";
import moment from "moment";
import { getAvailableRooms } from "../utils/ApiFunctions";
import RoomSearchResults from "./RoomSearchResult";
import RoomTypeSelector from "./RoomTypeSelector";

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const checkInMoment = moment(searchQuery.checkInDate);
        const checkOutMoment = moment(searchQuery.checkOutDate);
        if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
            setErrorMessage("Please enter valid dates");
            return;
        }
        if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
            setErrorMessage("Check-out date must be after check-in date");
            return;
        }
        setIsLoading(true);
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
            .then((response) => {
                setAvailableRooms(response.data);
                setTimeout(() => setIsLoading(false), 2000);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery({ ...searchQuery, [name]: value });
        const checkInDate = moment(searchQuery.checkInDate);
        const checkOutDate = moment(searchQuery.checkOutDate);
        if (checkInDate.isValid() && checkOutDate.isValid()) {
            setErrorMessage("");
        }
    };

    const handleClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: "",
        });
        setAvailableRooms([]);
    };

    return (
        <>
            <Container className="shadow-lg rounded bg-light mt-n5 mb-5 py-5 px-4">
                <h3 className="text-center text-secondary fw-bold mb-4">Find Your Perfect Room</h3>
                <Form onSubmit={handleSearch}>
                    <Row className="justify-content-center">
                        <Col xs={12} md={3} className="mb-3">
                            <Form.Group controlId="checkInDate">
                                <Form.Label className="fw-bold">Check-in Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkInDate"
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="shadow-sm"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="mb-3">
                            <Form.Group controlId="checkOutDate">
                                <Form.Label className="fw-bold">Check-out Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="checkOutDate"
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                    className="shadow-sm"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={3} className="mb-3">
                            <Form.Group controlId="roomType">
                                <Form.Label className="fw-bold">Room Type</Form.Label>
                                <div className="d-flex">
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery}
                                    />
                                    <Button variant="primary" type="submit" className="ms-2 shadow-sm">
                                        Search
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="text-center mt-4">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Finding available rooms...</p>
                    </div>
                )}

                {/* Search Results */}
                {!isLoading && availableRooms.length > 0 && (
                    <RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
                )}

                {/* No Results Message */}
                {!isLoading && availableRooms.length === 0 && !errorMessage && (
                    <p className="text-center text-muted mt-4">
                        No rooms available for the selected dates and room type.
                    </p>
                )}

                {/* Error Message */}
                {errorMessage && <p className="text-danger text-center mt-4">{errorMessage}</p>}
            </Container>
        </>
    );
};

export default RoomSearch;