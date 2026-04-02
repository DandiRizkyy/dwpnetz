import { useState } from "react";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import { Modal, Drawer } from "antd";
import {
  MenuOutlined,
  PoweroffOutlined,
  CreditCardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useStore } from "@/store/useStore";
import { NAV_ITEMS, NAV_ITEMS_GUEST } from "@/constants/constant";

const NAV_ICON_MAP = {
  AppstoreOutlined: <AppstoreOutlined />,
  ShoppingOutlined: <ShoppingOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  CreditCardOutlined: <CreditCardOutlined />,
  UserOutlined: <UserOutlined />,
};

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : null;

  const handleLogout = () => {
    logout();
    navigate("/");
    setLogoutModal(false);
  };

  const navItems = user ? NAV_ITEMS : NAV_ITEMS_GUEST;

  return (
    <div className="app-shell">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <div className="navbar-logo-icon">D</div>
            <div>
              <div className="navbar-logo-text">DWP Netz</div>
              <div className="navbar-logo-sub">Paket Data Internet</div>
            </div>
          </Link>

          <nav className="navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-link ${location.pathname === item.path ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="navbar-right">
            {user ? (
              <>
                <div
                  className="navbar-balance"
                  onClick={() => navigate("/topup")}
                  title="Top Up Saldo"
                >
                  <CreditCardOutlined />
                  <span>Rp {(user?.balance ?? 0).toLocaleString("id-ID")}</span>
                </div>
                <div
                  className="navbar-avatar"
                  onClick={() => navigate("/profile")}
                  title={user?.name}
                >
                  {initials}
                </div>
                <button
                  className="navbar-logout-btn"
                  onClick={() => setLogoutModal(true)}
                  title="Keluar"
                >
                  <PoweroffOutlined />
                </button>
              </>
            ) : (
              <button
                className="navbar-login-btn"
                onClick={() => navigate("/login")}
              >
                <LoginOutlined /> Masuk
              </button>
            )}

            <button
              className="navbar-hamburger"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            DWP Netz
          </span>
        }
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={240}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`drawer-nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
            >
              {item.icon && (
                <span style={{ fontSize: 15 }}>{NAV_ICON_MAP[item.icon]}</span>
              )}
              {item.label}
            </button>
          ))}

          {user ? (
            <>
              <div
                style={{
                  borderTop: "1px solid var(--border-default)",
                  margin: "8px 0",
                }}
              />
              <div
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                }}
              >
                {user.name}
              </div>
              <button
                className="drawer-nav-link"
                style={{ color: "var(--danger-text)" }}
                onClick={() => {
                  setDrawerOpen(false);
                  setLogoutModal(true);
                }}
              >
                <PoweroffOutlined /> Keluar
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  borderTop: "1px solid var(--border-default)",
                  margin: "8px 0",
                }}
              />
              <button
                className="drawer-nav-link"
                onClick={() => {
                  navigate("/login");
                  setDrawerOpen(false);
                }}
              >
                <LoginOutlined /> Masuk
              </button>
            </>
          )}
        </div>
      </Drawer>

      <main className="page-content">
        <div className="page-body">
          <Outlet />
        </div>
      </main>

      <Modal
        title="Konfirmasi Logout"
        open={logoutModal}
        onOk={handleLogout}
        onCancel={() => setLogoutModal(false)}
        okText="Ya, Keluar"
        cancelText="Batal"
        okButtonProps={{ danger: true }}
        centered
      >
        Yakin mau keluar dari akun <strong>{user?.name}</strong>?
      </Modal>
    </div>
  );
};

export default MainLayout;
