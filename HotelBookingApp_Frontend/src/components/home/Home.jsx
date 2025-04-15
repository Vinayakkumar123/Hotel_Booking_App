import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import { useLocation } from "react-router-dom";

const Home = () => {
    const location = useLocation();

    // Retrieve any message passed via location state
    const message = location.state && location.state.message;
    const currentUser = localStorage.getItem("userId");

    return (
        <section>
            {/* Display a message if passed via location state */}
            {message && (
                <p className="text-warning text-center px-5 py-2">
                    {message}
                </p>
            )}

            {/* Display logged-in user information */}
            {currentUser && (
                <h6 className="text-success text-center py-2">
                    You are logged in as <strong>{currentUser}</strong>
                </h6>
            )}

            {/* Main Header Section */}
            <MainHeader />

            {/* Main Content */}
            <div className="container mt-5">
                {/* Room Search Section */}
                <div className="mb-5">
                    <RoomSearch />
                </div>

                {/* Room Carousel Section */}
                <div className="mb-5">
                    <RoomCarousel />
                </div>

                {/* Parallax Section */}
                <div className="mb-5">
                    <Parallax />
                </div>

                {/* Hotel Services Section */}
                <div className="mb-5">
                    <HotelService />
                </div>
            </div>
        </section>
    );
};

export default Home;