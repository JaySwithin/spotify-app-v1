import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import { Routes, Route } from "react-router-dom";
import Playlist from "./pages/Playlist";
import PlaylistDetails from "./pages/PlaylistDetails";
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks } from "./pages";
import styled from 'styled-components/macro';


const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
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
          <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-tracks" element={<TopTracks />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/playlist/:id" element={<PlaylistDetails />} />
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </header>
    </div>
  );

}

export default App;
