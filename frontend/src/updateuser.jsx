import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data when the component mounts or ID changes
    axios
      .get(`/api/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((err) => console.log("Error fetching user:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user data
      await axios.put(`/api/users/${id}`, user);
      navigate("/users"); // Redirect after updating
    } catch (err) {
      console.log("Error updating user:", err);
    }
  };

  return (
    <div className="border-2 border-black bg-cyan-200 text-black">
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label>
            Name:
            <textarea
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })} // Update user.name on change
              placeholder={user.name}
              required
            />
          </label>
        </div>
        <div className="my-2">
          <label>
            Email:
            <input
              type="email"
              value={user.email} // Bind the input value to user.email
              onChange={(e) => setUser({ ...user, email: e.target.value })} // Update user.email on change
              required
            />
          </label>
        </div>
        <div className="my-2">
          <label>
            Age:
            <input
              type="number"
              value={user.age} // Bind the input value to user.age
              onChange={(e) => setUser({ ...user, age: e.target.value })} // Update user.age on change
              required
            />
          </label>
        </div>
        <button className="my-2" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
