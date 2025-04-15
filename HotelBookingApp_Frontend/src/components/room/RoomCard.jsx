    import React from "react";
    import { Card, Col } from "react-bootstrap";
    import { Link } from "react-router-dom";

    const RoomCard = ({ room }) => {
        console.log("room.description:", room.description); // ← Add in this line
        
        return (
            <Col key={room.id} className="mb-4" xs={12}>
                <Card>
                    <Card.Body className="d-flex flex-wrap align-items-center">
                        {/* Room Image */}
                        <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                            <Link to={`/book-room/${room.id}`}>
                                <Card.Img
                                    variant="top"
                                    src={`data:image/png;base64, ${room.photo}`}
                                    alt="Room Photo"
                                    style={{ width: "100%", maxWidth: "200px", height: "auto" }}
                                />
                            </Link>
                        </div>

                        {/* Room Details */}
                        <div className="flex-grow-1 ml-3 px-5">
                            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                            <Card.Title className="room-price">{room.roomPrice} / night</Card.Title>
                            <Card.Text>
                                <strong>Location:</strong> {room.location}
                            </Card.Text>
                            <Card.Text>
                                {String(room.description) || "No description available."} {/* Dynamic description */}
                            </Card.Text>
                        </div>

                        {/* Book Now Button */}
                        <div className="flex-shrink-0 mt-3">
                            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
                                Book Now
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    export default RoomCard;