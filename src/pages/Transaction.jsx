import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useStore } from "@/store/useStore";
import { updateUser, createTransaction } from "@/services/api";
import { detectProvider } from "@/utils/detectProvider";

const Transaction = () => {
  const [form] = Form.useForm();
  const phone = Form.useWatch("phone", form);
  const provider = detectProvider(phone);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const pkg = data;

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  console.log("isi data", data);
  const onFinish = async (values) => {
    try {
      if (user.balance < pkg.price) {
        message.error("Saldo tidak cukup");
        return;
      }

      if (provider !== pkg.provider) {
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

  console.log("werr", user);
  return (
    <div>
      <h2>Transaksi</h2>

      <div style={{ marginBottom: 16 }}>
        <p>
          <strong>{pkg?.packageName}</strong>
        </p>
        <p>{pkg?.provider}</p>
        <p>Rp {pkg?.price}</p>
        <p>Saldo: Rp {user?.balance}</p>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          phone: data?.phone,
        }}
      >
        <Form.Item name="phone" rules={[{ required: true }]}>
          <Input placeholder="Nomor HP" />
        </Form.Item>
        <p style={{ color: provider === pkg.provider ? "green" : "red" }}>
          Provider: {provider}
        </p>
        <Button type="primary" htmlType="submit">
          Beli
        </Button>
      </Form>
    </div>
  );
};

export default Transaction;
