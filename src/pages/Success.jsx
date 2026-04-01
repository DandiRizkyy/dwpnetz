import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      ini success page
      <button onClick={() => navigate("/")}>kembali ke beranda</button>
    </>
  );
};

export default Success;
