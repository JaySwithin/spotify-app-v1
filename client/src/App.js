import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { Routes, Route, Link } from "react-router-dom";
import Playlist from "./pages/Playlist";
import PlaylistDetails from "./pages/PlaylistDetails";
import TopArtists from "./pages/TopArtists";
import TopTracks from "./pages/TopTracks";
import styled from "styled-components/macro"
import { GlobalStyle } from './styles';



const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

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
      <GlobalStyle />
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
          <StyledLoginButton href="http://localhost:8888/login">
            Login to spotify
          </StyledLoginButton>
        )}
      </header>
    </div>
  );

  function Home() {
    return (
      <>
        {profile && (
          <div>
            <button onClick={logout}>Logout</button>
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>
          </div>
        )}
      </>
    );
  }
}

export default App;
