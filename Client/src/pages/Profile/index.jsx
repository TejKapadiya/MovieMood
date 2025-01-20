import React, { useState } from 'react';

function Profile() {
  // Sample user data (this can be fetched from an API in a real application)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Springfield',
  });

  // Local state for the form inputs
  const [formData, setFormData] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save or update the user details (this could be an API call)
    setUser(formData);
    setIsEditing(false); // Exit edit mode after saving
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="h-10 w-full border border-gray-400 rounded-md pl-5 focus:border-gray-900 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-10 w-full border border-gray-400 rounded-md pl-5 focus:border-gray-900 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="h-10 w-full border border-gray-400 rounded-md pl-5 focus:border-gray-900 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="h-10 w-full border border-gray-400 rounded-md pl-5 focus:border-gray-900 focus:outline-none"
            />
          </div>

          <button type="submit" className="w-full h-12 bg-blue-600 text-white rounded-md mt-6 hover:bg-blue-700 focus:outline-none">
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <div className="space-y-2 mb-6">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full h-12 bg-green-600 text-white rounded-md mt-6 hover:bg-green-700 focus:outline-none"
          >
            Change Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
