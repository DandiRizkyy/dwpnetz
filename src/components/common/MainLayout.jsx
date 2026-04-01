import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Modal } from "antd";
import { useStore } from "@/store/useStore";
import { PAGE_TITLES, NAV_ITEMS } from "@/constants/constant";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    : "?";

  const currentTitle = PAGE_TITLES[location.pathname] || "DWP Netz";

  const goTo = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <div>
            <div className="logo-text">DWP Netz</div>
            <span className="logo-sub">Paket Data Internet</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu</div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => goTo(item.path)}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={() => goTo("/profile")}>
            <div className="user-avatar">{initials}</div>
            <div className="user-info">
              <div className="user-name">{user?.name || "Pengguna"}</div>
              <div className="user-email">{user?.email || ""}</div>
            </div>
          </div>

          <button
            className="nav-link"
            onClick={() => setLogoutModal(true)}
            style={{ color: "rgba(255,100,100,0.75)", marginTop: 4 }}
          >
            <span style={{ fontSize: 16 }}>⏻</span>
            Keluar
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="topbar-title">{currentTitle}</div>
          <div className="topbar-balance">
            💳 Rp {(user?.balance ?? 0).toLocaleString("id-ID")}
          </div>
        </header>

        <main className="page-body">
          <Outlet />
        </main>

        <nav className="mobile-bottom-nav">
          <div className="mobile-nav-items">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                className={`mobile-nav-item ${location.pathname === item.path ? "active" : ""}`}
                onClick={() => goTo(item.path)}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

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
