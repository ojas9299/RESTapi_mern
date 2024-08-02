import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./Users.jsx";
import NewUser from "./newUser.jsx";
import "./App.css";
import UpdateUser from "./updateuser.jsx";

function App() {
  return (
    <Router>
      <div className="bg-gray-500 text-center py-5 mb-5">This Is my Navbar</div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path={`/api/users/:id`} element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
