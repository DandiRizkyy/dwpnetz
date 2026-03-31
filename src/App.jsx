import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import AuthRoute from "@/components/common/AuthRoute";
import Dashboard from "@/pages/Dashboard";
import Packages from "@/pages/Packages";
import Transaction from "@/pages/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/transaction" element={<Transaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
