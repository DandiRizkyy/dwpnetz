import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/common/MainLayout";
import Login from "@/pages/Login";
import AuthRoute from "@/components/common/AuthRoute";
import Dashboard from "@/pages/Dashboard";
import Packages from "@/pages/Packages";
import Transaction from "@/pages/Transaction";
import History from "@/pages/History";
import Success from "@/pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AuthRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/history" element={<History />} />
            <Route path="/success" element={<Success />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
