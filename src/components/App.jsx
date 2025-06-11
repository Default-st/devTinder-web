import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./Body.jsx";
import { Login } from "./Login.jsx";
import { Profile } from "./Profile.jsx";
import { Feed } from "./Feed.jsx";
import { Logout } from "./Logout.jsx";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*  */}
    </>
  );
}

export default App;
