import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Tag,
  Typography,
  Statistic,
  Row,
  Col,
  Modal,
  Divider,
} from "antd";
import { useStore } from "@/store/useStore";
import { getTransactions } from "@/services/api";

const Profile = () => {
  const [stats, setStats] = useState({ totalTrx: 0, totalSpend: 0 });
  const [logoutModal, setLogoutModal] = useState(false);
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const { Title, Text } = Typography;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const userInfos = [
    { label: "Nama lengkap", val: user?.name },
    { label: "Email", val: user?.email },
    { label: "ID Pengguna", val: `#${user?.id}` },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTransactions();

      const userTransactions = res.filter((trx) => trx.userId === user.id);
      setStats({
        totalTrx: userTransactions.length,
        totalSpend: userTransactions.reduce((s, t) => s + t.price, 0),
      });
    };

    fetchData();
  }, [user.id]);

  return (
    <div style={{ maxWidth: 520 }}>
      <Title
        level={3}
        style={{ marginBottom: 4, fontFamily: "var(--font-display)" }}
      >
        Profil Saya
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
        Informasi akun dan preferensi
      </Text>
      <Card
        style={{ marginBottom: 16 }}
        styles={{ body: { padding: "18px 20px" } }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "var(--brand-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              color: "white",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <Text
              strong
              style={{
                fontSize: 18,
                fontFamily: "var(--font-display)",
                display: "block",
              }}
            >
              {user?.name}
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {user?.email}
            </Text>
            <div>
              <Tag color="success" style={{ marginTop: 6 }}>
                Akun Aktif
              </Tag>
            </div>
          </div>
        </div>
      </Card>
      <div className="balance-card mb-4">
        <div className="balance-label">Saldo tersedia</div>
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
            + Top Up Saldo
          </Button>
        </div>
      </div>
      <Row gutter={[14, 14]} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card size="small" styles={{ body: { padding: "16px 20px" } }}>
            <Statistic
              title="Total Transaksi"
              value={stats.totalTrx}
              valueStyle={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card size="small" styles={{ body: { padding: "16px 20px" } }}>
            <Statistic
              title="Total Pengeluaran"
              value={stats.totalSpend}
              prefix="Rp"
              formatter={(v) => Number(v).toLocaleString("id-ID")}
              valueStyle={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
              }}
            />
          </Card>
        </Col>
      </Row>
      <Card
        title={
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            Informasi Akun
          </span>
        }
        style={{ marginBottom: 16 }}
        styles={{ body: { padding: 0 } }}
      >
        {userInfos.map(({ label, val }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: "1px solid var(--border-default)",
            }}
          >
            <Text type="secondary" style={{ fontSize: 13.5 }}>
              {label}
            </Text>
            <Text strong style={{ fontSize: 13.5 }}>
              {val}
            </Text>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 20px",
          }}
        >
          <Text type="secondary" style={{ fontSize: 13.5 }}>
            Riwayat transaksi
          </Text>
          <Button
            size="small"
            onClick={() => navigate("/history")}
            style={{
              color: "var(--brand-blue)",
              borderColor: "var(--brand-blue)",
            }}
          >
            Lihat →
          </Button>
        </div>
      </Card>

      <Button
        block
        danger
        size="large"
        onClick={() => setLogoutModal(true)}
        style={{ height: 46 }}
      >
        Keluar dari Akun
      </Button>
      <Modal
        title="Konfirmasi Logout"
        open={logoutModal}
        onOk={handleLogout}
        onCancel={() => setLogoutModal(false)}
        okText="Ya, Keluar"
        cancelText="Batal"
        okButtonProps={{ danger: true }}
        centered
      >
        <Text>
          Yakin mau keluar dari akun <strong>{user?.name}</strong>?
        </Text>
      </Modal>
    </div>
  );
};

export default Profile;
