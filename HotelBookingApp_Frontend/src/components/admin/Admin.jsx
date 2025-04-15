import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css"; 

const Admin = () => {
  return (
    <section className="admin-container">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      
      <div className="admin-buttons">
        <Link to="/existing-rooms" className="admin-btn">
          Manage Rooms
        </Link>
        <Link to="/existing-bookings" className="admin-btn">
          Manage Bookings
        </Link>
      </div>
    </section>
  );
};

export default Admin;