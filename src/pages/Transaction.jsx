import { useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";

const Transaction = () => {
  const location = useLocation();
  const pkg = location.state;

  const onFinish = (values) => {
    console.log("Beli paket:", pkg);
    console.log("Nomor:", values.phone);
  };

  return (
    <div>
      <h2>Transaksi</h2>

      <p>{pkg?.name}</p>
      <p>Rp {pkg?.price}</p>

      <Form onFinish={onFinish}>
        <Form.Item name="phone" rules={[{ required: true }]}>
          <Input placeholder="Nomor HP" />
        </Form.Item>

        <Button htmlType="submit">Beli</Button>
      </Form>
    </div>
  );
};

export default Transaction;
