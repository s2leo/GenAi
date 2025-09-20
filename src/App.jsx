import { Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import ChatPage from "./component/ChatPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
