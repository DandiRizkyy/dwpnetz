import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Tag,
  Typography,
  Statistic,
  Row,
  Col,
  Empty,
} from "antd";
import { useStore } from "@/store/useStore";
import { getTransactions, getPackages } from "@/services/api";
import { PROVIDER_COLORS } from "@/constants/constant";

const Dashboard = () => {
  const [recentTrx, setRecentTrx] = useState([]);
  const [popularPkgs, setPopularPkgs] = useState([]);
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const { Text } = Typography;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 11) return "Selamat pagi";
    if (h < 15) return "Selamat siang";
    if (h < 18) return "Selamat sore";
    return "Selamat malam";
  };

  const totalSpend = recentTrx.reduce((s, t) => s + t.price, 0);

  useEffect(() => {
    const load = async () => {
      const [trxs, pkgs] = await Promise.all([
        getTransactions(),
        getPackages(),
      ]);
      const mine = trxs
        .filter((t) => t.userId === user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setRecentTrx(mine);
      setPopularPkgs(pkgs.slice(0, 4));
    };
    load();
  }, [user.id]);

  return (
    <div>
      <div className="balance-card mb-4">
        <div className="balance-label">
          {greeting()}, {user?.name?.split(" ")[0] ?? "Kak"} 👋
        </div>
        <div className="balance-amount">
          Rp {(user?.balance ?? 0).toLocaleString("id-ID")}
        </div>
        <div className="balance-actions">
          <Button
            ghost
            size="small"
            onClick={() => navigate("/topup")}
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
          >
            + Top Up
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => navigate("/packages")}
            style={{
              background: "white",
              color: "var(--brand-dark)",
              borderColor: "white",
              fontWeight: 500,
            }}
          >
            Beli Paket
          </Button>
        </div>
      </div>

      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        <Col xs={12} sm={8}>
          <Card size="small" styles={{ body: { padding: "16px 20px" } }}>
            <Statistic
              title="Transaksi"
              value={recentTrx.length}
              valueStyle={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
              }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card size="small" styles={{ body: { padding: "16px 20px" } }}>
            <Statistic
              title="Total Pengeluaran"
              value={totalSpend}
              prefix="Rp"
              formatter={(v) => Number(v).toLocaleString("id-ID")}
              valueStyle={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small" styles={{ body: { padding: "16px 20px" } }}>
            <Statistic
              title="Paket Tersedia"
              value={`${popularPkgs.length}+`}
              valueStyle={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={recentTrx.length ? 14 : 24}>
          <Card
            title={
              <span
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                Transaksi Terbaru
              </span>
            }
            extra={
              <Button
                type="link"
                size="small"
                onClick={() => navigate("/history")}
              >
                Lihat semua →
              </Button>
            }
            styles={{ body: { padding: 0 } }}
          >
            {recentTrx.length === 0 ? (
              <div style={{ padding: "32px 24px" }}>
                <Empty
                  description="Belum ada transaksi"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                >
                  <Button
                    type="primary"
                    onClick={() => navigate("/packages")}
                    style={{ background: "var(--brand-blue)" }}
                  >
                    Beli Paket Pertama
                  </Button>
                </Empty>
              </div>
            ) : (
              recentTrx.map((trx) => (
                <div key={trx.id} className="trx-item">
                  <div
                    className="trx-icon"
                    style={{ background: "var(--brand-blue-light)" }}
                  >
                    📶
                  </div>
                  <div className="trx-info">
                    <div className="trx-title">
                      {trx.packageName || "Paket Data"}
                    </div>
                    <div className="trx-sub">
                      {trx.phone} ·{" "}
                      {new Date(trx.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                  <div className="trx-right">
                    <div className="trx-amount">
                      -Rp {trx.price.toLocaleString("id-ID")}
                    </div>
                    <Tag color="success" style={{ marginTop: 4 }}>
                      Sukses
                    </Tag>
                  </div>
                </div>
              ))
            )}
          </Card>
        </Col>

        {recentTrx.length > 0 && (
          <Col xs={24} lg={10}>
            <Card
              title={
                <span
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  Paket Populer
                </span>
              }
              styles={{
                body: {
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                },
              }}
            >
              {popularPkgs.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() =>
                    navigate("/transaction", {
                      state: {
                        packageId: pkg.id,
                        packageName: pkg.name,
                        provider: pkg.provider,
                        price: pkg.price,
                        quota: pkg.quota,
                        duration: pkg.duration,
                      },
                    })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-default)",
                    cursor: "pointer",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--surface-1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div>
                    <Text strong style={{ fontSize: 14 }}>
                      {pkg.name}
                    </Text>
                    <div>
                      <Tag
                        color={PROVIDER_COLORS[pkg.provider] || "default"}
                        style={{ fontSize: 10, marginTop: 2 }}
                      >
                        {pkg.provider}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {pkg.duration} hari
                      </Text>
                    </div>
                  </div>
                  <Text
                    strong
                    style={{ color: "var(--brand-blue)", fontSize: 13 }}
                  >
                    Rp {pkg.price.toLocaleString("id-ID")}
                  </Text>
                </div>
              ))}
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
