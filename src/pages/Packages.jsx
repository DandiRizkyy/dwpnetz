import { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getPackages } from "@/services/api";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPackages();
      setPackages(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Daftar Paket</h2>

      {packages.map((pkg) => (
        <div key={pkg.id}>
          <p>{pkg.provider}</p>
          <p>{pkg.name}</p>
          <p>Rp {pkg.price}</p>

          <Button
            onClick={() =>
              navigate("/transaction", {
                state: {
                  packageId: pkg.id,
                  packageName: pkg.name,
                  provider: pkg.provider,
                  price: pkg.price,
                },
              })
            }
          >
            Beli
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Packages;
