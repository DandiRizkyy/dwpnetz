const PROVIDER_COLORS = {
  Telkomsel: "red",
  XL: "gold",
  Indosat: "purple",
  Tri: "blue",
  Smartfren: "green",
};

const PREFIX_PROVIDER = {
  "0811": "Telkomsel",
  "0812": "Telkomsel",
  "0813": "Telkomsel",
  "0821": "Telkomsel",
  "0822": "Telkomsel",
  "0823": "Telkomsel",
  "0851": "Telkomsel",
  "0852": "Telkomsel",
  "0853": "Telkomsel",
  "0817": "XL",
  "0818": "XL",
  "0819": "XL",
  "0859": "XL",
  "0877": "XL",
  "0878": "XL",
  "0814": "Indosat",
  "0815": "Indosat",
  "0816": "Indosat",
  "0855": "Indosat",
  "0856": "Indosat",
  "0857": "Indosat",
  "0858": "Indosat",
  "0895": "Tri",
  "0896": "Tri",
  "0897": "Tri",
  "0898": "Tri",
  "0899": "Tri",
  "0881": "Smartfren",
  "0882": "Smartfren",
  "0883": "Smartfren",
  "0884": "Smartfren",
  "0885": "Smartfren",
  "0886": "Smartfren",
  "0887": "Smartfren",
  "0888": "Smartfren",
  "0889": "Smartfren",
};

const TOPUP_VALUE = [20000, 50000, 100000, 150000, 200000, 500000];

const NAV_ITEMS = [
  { path: "/", icon: "AppstoreOutlined", label: "Beranda" },
  { path: "/packages", icon: "ShoppingOutlined", label: "Paket Data" },
  { path: "/history", icon: "FileTextOutlined", label: "Riwayat" },
  { path: "/topup", icon: "CreditCardOutlined", label: "Top Up" },
  { path: "/profile", icon: "UserOutlined", label: "Profil" },
];

const NAV_ITEMS_GUEST = [
  { path: "/", label: "Beranda" },
  { path: "/packages", label: "Paket Data" },
];

const PAGE_TITLES = {
  "/": "Beranda",
  "/dashboard": "Dashboard",
  "/packages": "Paket Data",
  "/transaction": "Detail Pembelian",
  "/history": "Riwayat Transaksi",
  "/success": "Transaksi Berhasil",
  "/profile": "Profil Saya",
  "/topup": "Top Up Saldo",
};

export {
  PROVIDER_COLORS,
  PREFIX_PROVIDER,
  TOPUP_VALUE,
  NAV_ITEMS,
  NAV_ITEMS_GUEST,
  PAGE_TITLES,
};
