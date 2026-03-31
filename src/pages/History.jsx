import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { getTransactions } from "@/services/api";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTransactions();

      const userTransactions = res.filter((trx) => trx.userId === user.id);

      setData(userTransactions);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>History Transaksi</h2>

      {data.length === 0 ? (
        <p>Belum ada transaksi</p>
      ) : (
        data.map((trx) => (
          <div key={trx.id}>
            <p>Nomor: {trx.phone}</p>
            <p>Harga: Rp {trx.price}</p>
            <p>Tanggal: {new Date(trx.createdAt).toLocaleString()}</p>
            <hr />
            <button
              onClick={() =>
                navigate("/transaction", {
                  state: {
                    packageId: trx.packageId,
                    packageName: trx.packageName,
                    provider: trx.provider,
                    price: trx.price,
                    phone: trx.phone,
                  },
                })
              }
            >
              Beli Lagi
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
