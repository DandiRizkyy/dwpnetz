import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      ini dashboard
      <br />
      <button onClick={() => navigate("/packages")}>beli paket</button>
    </>
  );
};

export default Dashboard;
