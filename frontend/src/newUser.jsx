import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewForm() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState("");
  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  let handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const newuser = { name: Name, email: Email, age: Age };
      try {
        axios.post("/api/users", newuser).then((response) => {
          setusers((prevusers) => [...prevusers, response.data]);
          setName("");
          setEmail("");
          setAge("");
          navigate("/users");
        });
      } catch (err) {
        console.log(err);
      }
    },
    [Name, Email, Age]
  );

  return (
    <>
      <div className="border-2 border-black bg-cyan-200">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label>
              Name:
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="my-2">
            <label>
              Email:
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="my-2">
            <label>
              Age:
              <input
                type="number"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
          </div>
          <button className="my-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
