import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Tag,
  Typography,
  Alert,
  Divider,
  message,
} from "antd";
import { useStore } from "@/store/useStore";
import { updateUser, createTransaction } from "@/services/api";
import { detectProvider } from "@/utils/detectProvider";
import { PROVIDER_COLORS } from "@/constants/constant";

const Transaction = () => {
  const { Title, Text } = Typography;
  const [form] = Form.useForm();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const phone = Form.useWatch("phone", form);
  const detectedProvider = detectProvider(phone);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const pkg = data;
  const providerMatch =
    phone?.length >= 4 && detectedProvider === pkg?.provider;
  const hasBalance = (user?.balance ?? 0) >= (pkg?.price ?? 0);

  const onFinish = async (values) => {
    try {
      if (user.balance < pkg.price) {
        message.error("Saldo tidak cukup");
        return;
      }

      if (detectedProvider !== pkg.provider) {
        message.error("Provider tidak sesuai dengan paket");
        return;
      }

      const newBalance = user.balance - pkg.price;

      const updatedUser = await updateUser(user.id, {
        balance: newBalance,
      });

      await createTransaction({
        userId: user.id,
        packageId: pkg.id,
        packageName: pkg.name,
        provider: pkg.provider,
        phone: values.phone,
        price: pkg.price,
        createdAt: new Date().toISOString(),
      });

      setUser(updatedUser);

      message.success("Transaksi berhasil✅");

      navigate("/success");
    } catch (err) {
      console.log(err);
      message.error("Terjadi kesalahan transaksi❌");
    }
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <Button
        type="link"
        onClick={() => navigate(-1)}
        style={{ paddingLeft: 0, marginBottom: 16 }}
      >
        ← Kembali
      </Button>

      <Title
        level={3}
        style={{ marginBottom: 4, fontFamily: "var(--font-display)" }}
      >
        Detail Pembelian
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 20 }}>
        Periksa detail sebelum melanjutkan
      </Text>

      <Card
        style={{ marginBottom: 14 }}
        styles={{ body: { padding: "16px 20px" } }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <Text
              strong
              style={{
                fontSize: 18,
                fontFamily: "var(--font-display)",
                display: "block",
              }}
            >
              {pkg.packageName}
            </Text>
            <Tag
              color={PROVIDER_COLORS[pkg.provider] || "default"}
              style={{ marginTop: 6 }}
            >
              {pkg.provider}
            </Tag>
            {pkg.quota && (
              <Text
                type="secondary"
                style={{ fontSize: 12, display: "block", marginTop: 4 }}
              >
                {pkg.quota}GB · {pkg.duration} hari
              </Text>
            )}
          </div>
          <Text
            strong
            style={{
              fontSize: 20,
              color: "var(--brand-blue)",
              fontFamily: "var(--font-display)",
            }}
          >
            Rp {pkg.price.toLocaleString("id-ID")}
          </Text>
        </div>
      </Card>

      {!hasBalance && (
        <Alert
          title={
            <span>
              Saldo tidak cukup (Rp{" "}
              {(user?.balance ?? 0).toLocaleString("id-ID")}).{" "}
              <Button
                type="link"
                size="small"
                style={{ padding: 0 }}
                onClick={() => navigate("/topup")}
              >
                Top Up sekarang →
              </Button>
            </span>
          }
          type="warning"
          showIcon
          style={{ marginBottom: 14 }}
        />
      )}

      <Card
        style={{ marginBottom: 14 }}
        styles={{ body: { padding: "16px 20px" } }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          initialValues={{ phone: pkg?.phone || "" }}
        >
          <Form.Item
            name="phone"
            label="Nomor HP Tujuan"
            rules={[
              { required: true, message: "Nomor HP wajib diisi" },
              { min: 10, message: "Nomor HP minimal 10 digit" },
              () => ({
                validator(_, value) {
                  if (!value || value.length < 4) return Promise.resolve();
                  if (detectProvider(value) !== pkg.provider)
                    return Promise.reject(
                      new Error(`Nomor tidak sesuai provider ${pkg.provider}`),
                    );
                  return Promise.resolve();
                },
              }),
            ]}
            style={{ marginBottom: phone?.length >= 4 ? 8 : 0 }}
          >
            <Input
              size="large"
              placeholder="Contoh: 08512345678"
              maxLength={16}
            />
          </Form.Item>

          {phone?.length >= 4 && (
            <div style={{ marginBottom: 16 }}>
              <Tag color={providerMatch ? "success" : "error"}>
                {providerMatch ? "✓" : "✕"} Terdeteksi:{" "}
                {detectedProvider || "Tidak diketahui"}
              </Tag>
            </div>
          )}

          <Divider style={{ margin: "12px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text type="secondary">Harga paket</Text>
            <Text>Rp {pkg.price.toLocaleString("id-ID")}</Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text type="secondary">Biaya layanan</Text>
            <Text style={{ color: "var(--success-text)" }}>Gratis</Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text type="secondary">Saldo tersedia</Text>
            <Text>Rp {(user?.balance ?? 0).toLocaleString("id-ID")}</Text>
          </div>
          <Divider style={{ margin: "10px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text strong style={{ fontSize: 15 }}>
              Total Bayar
            </Text>
            <Text
              strong
              style={{
                fontSize: 16,
                color: "var(--brand-blue)",
                fontFamily: "var(--font-display)",
              }}
            >
              Rp {pkg.price.toLocaleString("id-ID")}
            </Text>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            disabled={!hasBalance}
            style={{
              background: "var(--brand-dark)",
              borderColor: "var(--brand-dark)",
              height: 48,
              fontWeight: 500,
            }}
          >
            {"Konfirmasi & Bayar"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Transaction;
