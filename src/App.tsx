import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import { Provider } from "react-redux";
import { store } from "./store";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
