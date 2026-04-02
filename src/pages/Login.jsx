import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { loginUser } from "@/services/api";
import bcrypt from "bcryptjs";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { Title, Text } = Typography;
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const user = await loginUser(values.email);

      if (!user) {
        message.error({ content: "Email tidak terdaftar", key: "login-error" });
        setLoading(false);
        return;
      }

      const isMatch = bcrypt.compareSync(values.password, user.password);

      if (!isMatch) {
        message.error({ content: "Password salah", key: "login-error" });
        setLoading(false);
        return;
      }
      setUser(user);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error({ content: "Terjadi kesalahan", key: "login-error" });
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-blob1" />
      <div className="login-bg-blob2" />

      <div className="login-card">
        <Title
          level={3}
          style={{
            marginBottom: 4,
            fontFamily: "var(--font-display)",
            textAlign: "center",
          }}
        >
          Selamat datang
        </Title>
        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: 24,
            fontSize: 13.5,
            textAlign: "center",
          }}
        >
          Login untuk mulai beli paket data
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email wajib diisi" },
              { type: "email", message: "Format email tidak valid" },
            ]}
          >
            <Input size="large" placeholder="nama@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Password wajib diisi" }]}
          >
            <Input.Password size="large" placeholder="Masukkan password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8, marginTop: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                background: "var(--brand-dark)",
                borderColor: "var(--brand-dark)",
                height: 48,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", fontSize: 12 }}
        >
          Demo user: <br /> Email: user@gmail.com || Password: test123
        </Text>
      </div>
    </div>
  );
};

export default Login;
