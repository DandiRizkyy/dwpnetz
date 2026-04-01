import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      ini dashboard
      <br />
      <button onClick={() => navigate("/packages")}>beli paket</button>
      <button onClick={() => navigate("/history")}>ke menu history</button>
      <button onClick={() => navigate("/topup")}>aku mau topup</button>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        logout
      </button>
    </>
  );
};

export default Dashboard;
