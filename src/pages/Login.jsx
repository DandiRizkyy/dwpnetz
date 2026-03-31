import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { loginUser } from "@/services/api";
import bcrypt from "bcryptjs";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const onFinish = async (values) => {
    try {
      const user = await loginUser(values.email);

      if (!user) {
        message.error("User tidak ditemukan");
        return;
      }

      const isMatch = bcrypt.compareSync(values.password, user.password);

      if (!isMatch) {
        message.error("Password salah");
        return;
      }

      setUser(user);

      message.success("Login berhasil 🚀");
      navigate("/");
    } catch (err) {
      console.log(err);
      message.error("Terjadi kesalahan");
    }
  };

  return (
    <div>
      <Card>
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email wajib diisi" }]}
          >
            <Input placeholder="Masukkan email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password wajib diisi" }]}
          >
            <Input.Password placeholder="Masukkan password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
