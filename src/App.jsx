import Home from "./components/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import SharedLayout from "./pages/SharedLayout";
import AddIncome from "./pages/AddIncome";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<SharedLayout />}>
              <Route path="/" index element={<Home />} />
              <Route path="/addExpense" element={<AddExpense />} />
              <Route path="/addIncome" element={<AddIncome />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
