import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tag, Typography, Spin } from "antd";
import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getPackages } from "@/services/api";
import { PROVIDER_COLORS } from "@/constants/constant";
import { useStore } from "@/store/useStore";

const Landing = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const { Title, Text } = Typography;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPackages();
      setPackages(res.slice(0, 6));
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleBuy = (pkg) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/transaction", {
      state: {
        packageId: pkg.id,
        packageName: pkg.name,
        provider: pkg.provider,
        price: pkg.price,
        quota: pkg.quota,
        duration: pkg.duration,
      },
    });
  };

  const features = [
    {
      icon: (
        <ThunderboltOutlined
          style={{ fontSize: 24, color: "var(--brand-blue)" }}
        />
      ),
      title: "Aktivasi Instan",
      desc: "Paket langsung aktif setelah pembayaran berhasil",
    },
    {
      icon: (
        <SafetyCertificateOutlined
          style={{ fontSize: 24, color: "var(--brand-blue)" }}
        />
      ),
      title: "Transaksi Aman",
      desc: "Sistem keamanan berlapis untuk setiap transaksi",
    },
    {
      icon: (
        <CustomerServiceOutlined
          style={{ fontSize: 24, color: "var(--brand-blue)" }}
        />
      ),
      title: "Semua Provider",
      desc: "Telkomsel, XL, Indosat, Tri, Smartfren tersedia",
    },
  ];

  return (
    <div>
      <div className="landing-hero">
        <div className="landing-hero-blob1" />
        <div className="landing-hero-blob2" />
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <ThunderboltOutlined /> Aktivasi Instan
          </div>
          <Title
            level={1}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              color: "white",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Paket Data Internet
            <br />
            <span style={{ color: "var(--brand-accent)" }}>Murah & Cepat</span>
          </Title>
          <Text
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 16,
              display: "block",
              marginBottom: 32,
              maxWidth: 480,
            }}
          >
            Beli paket data untuk semua provider favoritmu. Harga terjangkau,
            proses kilat, langsung aktif.
          </Text>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/packages")}
              style={{
                background: "var(--brand-accent)",
                borderColor: "var(--brand-accent)",
                height: 48,
                paddingInline: 28,
                fontWeight: 600,
              }}
              icon={<ArrowRightOutlined />}
            >
              Lihat Semua Paket
            </Button>
            {!user && (
              <Button
                size="large"
                ghost
                onClick={() => navigate("/login")}
                style={{
                  height: 48,
                  paddingInline: 28,
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                }}
              >
                Masuk Akun
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="landing-features">
        {features.map((f, i) => (
          <div key={i} className="landing-feature-card">
            <div className="landing-feature-icon">{f.icon}</div>
            <div>
              <div className="landing-feature-title">{f.title}</div>
              <div className="landing-feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <Title
              level={3}
              style={{ fontFamily: "var(--font-display)", marginBottom: 2 }}
            >
              Paket Pilihan
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Paket terpopuler dari berbagai provider
            </Text>
          </div>
          <Button
            type="link"
            onClick={() => navigate("/packages")}
            style={{ color: "var(--brand-blue)", fontWeight: 500 }}
          >
            Lihat semua →
          </Button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60 }}>
            <Spin size="large" />
          </div>
        ) : (
          <div className="pkg-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="pkg-card"
                onClick={() => handleBuy(pkg)}
              >
                <Tag
                  color={PROVIDER_COLORS[pkg.provider] || "default"}
                  style={{ width: "fit-content" }}
                >
                  {pkg.provider}
                </Tag>
                <div className="pkg-name">{pkg.name}</div>
                <div className="pkg-meta">
                  {pkg.quota}GB · {pkg.duration} hari
                </div>
                <div className="pkg-price">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </div>
                <Button
                  type="primary"
                  block
                  size="small"
                  style={{ marginTop: 6, background: "var(--brand-blue)" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuy(pkg);
                  }}
                >
                  {user ? "Beli Sekarang" : "Masuk untuk Beli"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {!user && (
        <div className="landing-cta">
          <div className="landing-cta-blob" />
          <Title
            level={3}
            style={{
              fontFamily: "var(--font-display)",
              color: "white",
              marginBottom: 8,
            }}
          >
            Siap beli paket data?
          </Title>
          <Text
            style={{
              color: "rgba(255,255,255,0.65)",
              display: "block",
              marginBottom: 24,
            }}
          >
            Daftar atau masuk sekarang untuk mulai transaksi
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/login")}
            style={{
              background: "white",
              color: "var(--brand-dark)",
              borderColor: "white",
              fontWeight: 600,
              height: 48,
              paddingInline: 32,
            }}
          >
            Masuk Sekarang
          </Button>
        </div>
      )}
    </div>
  );
};

export default Landing;
