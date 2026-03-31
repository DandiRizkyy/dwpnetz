import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useStore } from "@/store/useStore";
import { updateUser, createTransaction } from "@/services/api";

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pkg = location.state;

  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const onFinish = async (values) => {
    try {
      if (user.balance < pkg.price) {
        message.error("Saldo tidak cukup");
        return;
      }

      const newBalance = user.balance - pkg.price;

      const updatedUser = await updateUser(user.id, {
        balance: newBalance,
      });

      await createTransaction({
        userId: user.id,
        packageId: pkg.id,
        phone: values.phone,
        price: pkg.price,
        createdAt: new Date().toISOString(),
      });

      setUser(updatedUser);

      message.success("Transaksi berhasil✅");

      navigate("/");
    } catch (err) {
      console.log(err);
      message.error("Terjadi kesalahan transaksi❌");
    }
  };

  return (
    <div>
      <h2>Transaksi</h2>

      <p>{pkg?.name}</p>
      <p>Rp {pkg?.price}</p>
      <p>Saldo: Rp {user?.balance}</p>

      <Form onFinish={onFinish}>
        <Form.Item name="phone" rules={[{ required: true }]}>
          <Input placeholder="Nomor HP" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Beli
        </Button>
      </Form>
    </div>
  );
};

export default Transaction;
