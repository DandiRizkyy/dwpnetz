import { useEffect, useState } from "react";
import { Card, Button, Tag, Typography, Spin, Empty } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import { useStore } from "@/store/useStore";
import { getTransactions } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { PROVIDER_COLORS } from "@/constants/constant";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Semua");
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const { Title, Text } = Typography;
  const filterProviders = new Set(transactions.map((t) => t.provider));

  const providers = ["Semua", ...filterProviders];
  const filtered =
    filter === "Semua"
      ? transactions
      : transactions.filter((t) => t.provider === filter);

  const handleRepeat = (trx) => {
    navigate("/transaction", {
      state: {
        packageId: trx.packageId,
        packageName: trx.packageName,
        provider: trx.provider,
        price: trx.price,
        quota: trx.quota,
        duration: trx.duration,
        phone: trx.phone,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTransactions();

      const userTransactions = res
        .filter((trx) => trx.userId === user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setLoading(false);
      setTransactions(userTransactions);
    };

    fetchData();
  }, [user.id]);

  return (
    <div>
      <Title
        level={3}
        style={{ marginBottom: 4, fontFamily: "var(--font-display)" }}
      >
        Riwayat Transaksi
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
        Semua transaksi pembelian paket datamu
      </Text>

      {transactions.length > 0 && (
        <div className="filter-tabs mb-4">
          {providers.map((p) => (
            <button
              key={p}
              className={`filter-tab ${filter === p ? "active" : ""}`}
              onClick={() => setFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <Empty
            description="Belum ada transaksi"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button
              type="primary"
              onClick={() => navigate("/packages")}
              style={{ background: "var(--brand-blue)" }}
            >
              Beli Paket Sekarang
            </Button>
          </Empty>
        </Card>
      ) : (
        <Card styles={{ body: { padding: 0 } }}>
          {filtered.map((trx) => (
            <div key={trx.id} className="trx-item">
              <div
                className="trx-icon"
                style={{ background: "var(--brand-blue-light)" }}
              >
                <WifiOutlined style={{ fontSize: 18 }} />
              </div>
              <div className="trx-info">
                <div className="trx-title">
                  {trx.packageName || "Paket Data"}{" "}
                  <Tag
                    color={PROVIDER_COLORS[trx.provider] || "default"}
                    style={{ fontSize: 10 }}
                  >
                    {trx.provider}
                  </Tag>
                </div>
                <div className="trx-sub">{trx.phone}</div>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {new Date(trx.createdAt).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </div>
              <div className="trx-right">
                <div className="trx-amount">
                  -Rp {trx.price.toLocaleString("id-ID")}
                </div>
                <Tag color="success" style={{ marginTop: 4, marginBottom: 6 }}>
                  Sukses
                </Tag>
                <div>
                  <Button
                    size="small"
                    onClick={() => handleRepeat(trx)}
                    style={{
                      color: "var(--brand-blue)",
                      borderColor: "var(--brand-blue)",
                    }}
                  >
                    Beli Lagi
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default History;
