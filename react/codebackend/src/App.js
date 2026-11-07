import { useEffect, useState } from "react";
import React from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);


  const filteredUsers = users.filter((user) =>
    user.website.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h2>USER LIST</h2>
      
      <select
            className="form-select"
     
            onChange={(e) => setSearch(e.target.value)}
          >
            <option value=".org">.org</option>
            <option value=".in">.in</option>
            <option value="Deactive">.com</option>
          </select>
           <ul>
       
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.id} - {user.name} -{user.website}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;