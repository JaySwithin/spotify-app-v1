import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {token ? (
          <>
            <h1>Logged in</h1>
            <button onClick={logout}>log out</button>

            {profile && 
            (
              <div>
                <h1>{profile.display_name}</h1>
                <h2>{profile.email}</h2>
              </div>
            )}
          </>
          
        ) : (
          <a className="App-link" href="http://localhost:8888/login">
            Login to spotify
          </a>
        )}
      </header>
    </div>
  );
}

export default App;
