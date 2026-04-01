import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header>Header</Header>

        <Content style={{ padding: "24px" }}>
          <Outlet />
        </Content>

        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
