import React, { useState, useEffect, useContext } from "react";
import { updateUserProfile } from "../api/api"; // Import API function
import AuthContext from "../context/AuthContext";
import "./Profile.css"; // Ensure styles for form

const Profile = () => {
    const { user, setUser, token } = useContext(AuthContext); // Get user and token from context

    // State to store form values
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        // phone: user?.phone || "",
        // address: user?.address || "",
        password: "",
        preferences: user?.preferences || [],
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                password: "",
                preferences: user.preferences || [],
            });
        }
    }, [user]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(user._id, formData, token);
            setUser(updatedUser.user); // Update global user state
            setMessage("Profile updated successfully!");
        } catch (error) {
            setMessage(error.message || "Failed to update profile.");
        }
    };

    return (
        <div className="profile-container">
            <h2>Update Profile</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />

                <label>Password (Leave empty if not changing):</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                <label>Preferences (comma-separated genres):</label>
                <input
                    type="text"
                    name="preferences"
                    value={formData.preferences.join(", ")}
                    onChange={(e) => setFormData({ ...formData, preferences: e.target.value.split(", ") })}
                />

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
