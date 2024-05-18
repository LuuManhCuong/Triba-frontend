import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import Account from "./page/Account";
import Analysis from "./page/Analysis";
import Cooperate from "./page/Cooperate";
import Group from "./page/Group";
import Honor from "./page/Honor";
import Personal from "./page/Personal";
import Setting from "./page/Setting";
import Follow from "./page/Follow";
import Login from "./components/auth/Login";
import Error from "./page/Error";
import Messenger from "./page/Messenger";
function App() {
  return (
    <Routes>
      <Route path="/error" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/cooperate" element={<Cooperate />} />
      <Route path="/group" element={<Group />} />
      <Route path="/honor" element={<Honor />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/follow" element={<Follow />} />
      <Route path="/messenger" element={<Messenger />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
