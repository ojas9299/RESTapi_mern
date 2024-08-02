import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => setusers(response.data))
      .catch((err) => console.log(err));
  }, []);

  let deleteUser = async (id) => {
    try {
      console.log(id);
      setusers((prevUser) => prevUser.filter((user) => user._id != id));
      await axios.delete(`/api/users/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Link to="/newuser">
        <button className="border-2 border-black bg-green-300">New user</button>
      </Link>
      <div className="bg-blue-300 p-5 text-center my-5">
        <h1>users list</h1>
        {users.map((user) => (
          <div className="bg-purple-300 p-5 border-2 m-5" key={user._id}>
            <h3>Name : {user.name}</h3>
            <h3>Email : {user.email}</h3>
            <h3>age : {user.age}</h3>
            <button
              onClick={() => deleteUser(user._id)}
              className="border-2 border-black bg-blue-600 mx-5"
            >
              Delete
            </button>
            <Link to={`/api/users/${user._id}`}>
              <button className="border-2 border-black bg-blue-600">
                Update
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
