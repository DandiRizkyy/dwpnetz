import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Result } from "antd";

const Success = () => {
  const { Text } = Typography;
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const { trx, pkg, phone } = data;
  const packageInfo = [
    { label: "Paket", val: `${pkg?.packageName} ${pkg?.provider}` },
    { label: "Nomor tujuan", val: phone },
    {
      label: "Total bayar",
      val: `Rp ${pkg?.price?.toLocaleString("id-ID")}`,
      accent: true,
    },
    {
      label: "Waktu transaksi",
      val: new Date(trx?.createdAt).toLocaleString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      small: true,
    },
    {
      label: "ID Transaksi",
      val: `#${trx?.id?.toUpperCase?.() || "-"}`,
      mono: true,
    },
  ];
  useEffect(() => {
    if (!data) navigate("/");
  }, []);

  if (!data) return null;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <Card styles={{ body: { padding: "32px 28px" } }}>
        <Result
          status="success"
          title="Transaksi Berhasil!"
          subTitle="Paket data kamu sedang diproses dan akan aktif dalam beberapa menit."
          style={{ paddingBottom: 16 }}
        />

        <div
          style={{
            background: "var(--surface-1)",
            borderRadius: "var(--radius-md)",
            padding: "14px 18px",
            marginBottom: 24,
          }}
        >
          {packageInfo.map(({ label, val, accent, small, mono }) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid var(--border-default)",
              }}
            >
              <Text type="secondary" style={{ fontSize: 13 }}>
                {label}
              </Text>
              <Text
                strong={!small}
                style={{
                  fontSize: small ? 12 : mono ? 11 : 13,
                  color: accent ? "var(--brand-blue)" : undefined,
                  fontFamily: mono ? "monospace" : undefined,
                }}
              >
                {val}
              </Text>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button
            type="primary"
            block
            size="large"
            onClick={() => navigate("/")}
            style={{
              background: "var(--brand-dark)",
              borderColor: "var(--brand-dark)",
              height: 46,
              fontWeight: 500,
            }}
          >
            Kembali ke Dashboard
          </Button>
          <Button block size="large" onClick={() => navigate("/history")}>
            Lihat Riwayat
          </Button>
          <Button
            block
            onClick={() =>
              navigate("/transaction", {
                state: {
                  packageId: pkg?.packageId,
                  packageName: pkg?.packageName,
                  provider: pkg?.provider,
                  price: pkg?.price,
                  quota: pkg?.quota,
                  duration: pkg?.duration,
                  phone,
                },
              })
            }
            style={{
              color: "var(--brand-blue)",
              borderColor: "var(--brand-blue)",
            }}
          >
            Beli Lagi Paket Ini
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Success;
