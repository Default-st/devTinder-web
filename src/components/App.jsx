import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Body } from "./Body.jsx";
import { Login } from "./Login.jsx";
import { Profile } from "./Profile.jsx";
import { Feed } from "./Feed.jsx";
import { Logout } from "./Logout.jsx";
import { Connections } from "./Connections.jsx";
import { Requests } from "./Requests.jsx";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />{" "}
            <Route path="/connections" element={<Connections />} />{" "}
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*  */}
    </>
  );
}

export default App;
