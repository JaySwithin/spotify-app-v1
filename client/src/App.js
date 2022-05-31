import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { Routes, Route, Link } from "react-router-dom";
import Playlist from "./pages/Playlist";
import PlaylistDetails from "./pages/PlaylistDetails";
import TopArtists from "./pages/TopArtists";
import TopTracks from "./pages/TopTracks";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-tracks" element={<TopTracks />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} />
            </Routes>
          </>
        ) : (
          <a className="App-link" href="http://localhost:8888/login">
            Login to spotify
          </a>
        )}
      </header>
    </div>
  );

  function Home() {
    return (
      <>
        {profile && (
          <div>
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>
          </div>
        )}
      </>
    );
  }
}

export default App;
