import { useEffect, useState } from "react";
import { Button, Tag, Typography, Spin, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { getPackages } from "@/services/api";
import { PROVIDER_COLORS } from "@/constants/constant";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const filteredProviderName = new Set(packages.map((p) => p.provider));
  const providers = ["Semua", ...filteredProviderName];
  const filtered =
    activeFilter === "Semua"
      ? packages
      : packages.filter((p) => p.provider === activeFilter);

  const handleBuy = (pkg) => {
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPackages();
      setPackages(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title
        level={3}
        style={{ marginBottom: 4, fontFamily: "var(--font-display)" }}
      >
        Pilih Paket
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
        Temukan paket data yang sesuai kebutuhanmu
      </Text>

      <div className="filter-tabs mb-4">
        {providers.map((provider) => (
          <button
            key={provider}
            className={`filter-tab ${activeFilter === provider ? "active" : ""}`}
            onClick={() => setActiveFilter(provider)}
          >
            {provider}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : filtered.length === 0 ? (
        <Empty description="Tidak ada paket untuk provider ini" />
      ) : (
        <div className="pkg-grid">
          {filtered.map((pkg) => (
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
                Beli Sekarang
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
