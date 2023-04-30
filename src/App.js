import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/");
      const data = response.data.results[0];
      const { name, email } = data;
      const user = { name, email };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    } else {
      fetchUser();
    }
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>
            Name: {user.name.first} {user.name.last}
          </p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchUser}>Refresh</button>
    </div>
  );
}

export default App;
