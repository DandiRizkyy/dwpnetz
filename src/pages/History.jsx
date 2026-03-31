import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { getTransactions } from "@/services/api";

const History = () => {
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
          </div>
        ))
      )}
    </div>
  );
};

export default History;
