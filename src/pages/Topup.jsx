import { useState } from "react";
import { TOPUP_VALUE } from "@/constants/constant";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Typography,
  Result,
  message,
} from "antd";
import { useStore } from "@/store/useStore";
import { updateUser } from "@/services/api";

const Topup = () => {
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstStep, setFirstStep] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const setUser = useStore((s) => s.setUser);

  const { Title, Text } = Typography;

  const previewAmount =
    selected ?? (custom ? parseInt(custom.replace(/\D/g, ""), 10) || 0 : 0);

  const handleSubmit = async () => {
    const amount = previewAmount;
    if (!amount || amount < 10000) {
      message.warning("Minimum top up Rp 10.000");
      return;
    }
    if (amount > 5000000) {
      message.warning("Maksimum top up Rp 5.000.000 per transaksi");
      return;
    }

    setLoading(true);
    try {
      const newBalance = (user.balance ?? 0) + amount;
      const updated = await updateUser(user.id, { balance: newBalance });
      setUser(updated);
      setFinalAmount(amount);
      setFirstStep(true);
      setLoading(false);
    } catch {
      setLoading(false);
      message.error("Gagal melakukan top up. Coba lagi.");
    }
  };

  const handleCustomChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCustom(raw);
    setSelected(null);
  };

  const renderFirstStep = () => {
    return (
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <Card styles={{ body: { padding: "32px 28px" } }}>
          <Result
            status="success"
            title="Top Up Berhasil!"
            subTitle={
              <span>
                Saldo ditambahkan{" "}
                <strong>Rp {finalAmount.toLocaleString("id-ID")}</strong>. Saldo
                sekarang:{" "}
                <strong>
                  Rp {(user?.balance ?? 0).toLocaleString("id-ID")}
                </strong>
              </span>
            }
          />
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
              }}
            >
              Kembali ke Dashboard
            </Button>
            <Button block size="large" onClick={() => navigate("/packages")}>
              Beli Paket Sekarang
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const renderSecondStep = () => {
    return (
      <div style={{ maxWidth: 520 }}>
        <Title
          level={3}
          style={{ marginBottom: 4, fontFamily: "var(--font-display)" }}
        >
          Top Up Saldo
        </Title>
        <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
          Tambah saldo untuk beli paket data
        </Text>

        <Card
          style={{ marginBottom: 16 }}
          styles={{
            body: {
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <div>
            <Text
              type="secondary"
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              Saldo saat ini
            </Text>
            <Text
              strong
              style={{ fontFamily: "var(--font-display)", fontSize: 22 }}
            >
              Rp {(user?.balance ?? 0).toLocaleString("id-ID")}
            </Text>
          </div>
          <span style={{ fontSize: 32 }}>💳</span>
        </Card>

        <Card
          title={
            <span
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Pilih Nominal
            </span>
          }
          style={{ marginBottom: 16 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {TOPUP_VALUE.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setSelected(val);
                  setCustom("");
                }}
                style={{
                  padding: "12px 8px",
                  borderRadius: "var(--radius-sm)",
                  border:
                    selected === val
                      ? "2px solid var(--brand-blue)"
                      : "1.5px solid var(--border-default)",
                  background:
                    selected === val
                      ? "var(--brand-blue-light)"
                      : "var(--surface-0)",
                  color:
                    selected === val
                      ? "var(--brand-blue)"
                      : "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                Rp {(val / 1000).toFixed(0)}rb
              </button>
            ))}
          </div>

          <Divider style={{ margin: "12px 0" }}>atau nominal lain</Divider>

          <Form.Item style={{ marginBottom: 4 }}>
            <Input
              prefix={<Text type="secondary">Rp</Text>}
              size="large"
              placeholder="0"
              value={custom ? parseInt(custom).toLocaleString("id-ID") : ""}
              onChange={handleCustomChange}
            />
          </Form.Item>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Minimum Rp 10.000 · Maksimum Rp 5.000.000
          </Text>
        </Card>

        {previewAmount > 0 && (
          <Card
            style={{ marginBottom: 16 }}
            styles={{ body: { padding: "14px 18px" } }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text type="secondary">Nominal top up</Text>
              <Text strong>Rp {previewAmount.toLocaleString("id-ID")}</Text>
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text type="secondary">Saldo setelah top up</Text>
              <Text strong style={{ color: "var(--brand-blue)" }}>
                Rp{" "}
                {((user?.balance ?? 0) + previewAmount).toLocaleString("id-ID")}
              </Text>
            </div>
          </Card>
        )}

        <Button
          type="primary"
          block
          size="large"
          loading={loading}
          disabled={!previewAmount}
          onClick={handleSubmit}
          style={{
            background: "var(--brand-dark)",
            borderColor: "var(--brand-dark)",
            height: 48,
            fontWeight: 500,
          }}
        >
          {previewAmount > 0
            ? `Top Up Rp ${previewAmount.toLocaleString("id-ID")}`
            : "Pilih nominal dulu"}
        </Button>
      </div>
    );
  };

  return <>{firstStep ? renderFirstStep() : renderSecondStep()}</>;
};

export default Topup;
