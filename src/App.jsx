import React, { useState, createContext, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Theme Context
export const ThemeContext = createContext();

// Custom Hooks
const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

// Sample Data
const statsData = [
  {
    title: "Total Users",
    value: "12,456",
    change: "+12%",
    positive: true,
    color: "#3b82f6",
    icon: "U",
  },
  {
    title: "Revenue",
    value: "₹45,678",
    change: "+8%",
    positive: true,
    color: "#10b981",
    icon: "R",
  },
  {
    title: "Orders",
    value: "1,234",
    change: "-2%",
    positive: false,
    color: "#f59e0b",
    icon: "O",
  },
  {
    title: "Growth",
    value: "23%",
    change: "+5%",
    positive: true,
    color: "#8b5cf6",
    icon: "G",
  },
];

const tableData = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    status: "active",
    role: "Admin",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    status: "pending",
    role: "User",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    status: "inactive",
    role: "User",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@example.com",
    status: "active",
    role: "Manager",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    status: "active",
    role: "User",
  },
  {
    id: 6,
    name: "Kavya Reddy",
    email: "kavya.reddy@example.com",
    status: "pending",
    role: "Manager",
  },
  {
    id: 7,
    name: "Aditya Joshi",
    email: "aditya.joshi@example.com",
    status: "active",
    role: "User",
  },
  {
    id: 8,
    name: "Ritu Agarwal",
    email: "ritu.agarwal@example.com",
    status: "inactive",
    role: "User",
  },
];

const chartData = [
  { name: "Jan", value: 400, revenue: 2400 },
  { name: "Feb", value: 300, revenue: 1398 },
  { name: "Mar", value: 500, revenue: 3800 },
  { name: "Apr", value: 400, revenue: 3908 },
  { name: "May", value: 600, revenue: 4800 },
  { name: "Jun", value: 550, revenue: 3800 },
];

const pieData = [
  { name: "Desktop", value: 400, color: "#3b82f6" },
  { name: "Mobile", value: 300, color: "#10b981" },
  { name: "Tablet", value: 200, color: "#f59e0b" },
];

const kanbanData = {
  todo: [
    {
      id: 1,
      title: "Design Homepage",
      description: "Create wireframes and mockups",
      assignee: "Arjun",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Setup Database",
      description: "Configure PostgreSQL database",
      assignee: "Priya",
      date: "2024-01-16",
    },
    {
      id: 3,
      title: "User Authentication",
      description: "Implement login and signup",
      assignee: "Vikram",
      date: "2024-01-17",
    },
  ],
  progress: [
    {
      id: 4,
      title: "API Development",
      description: "Build REST API endpoints",
      assignee: "Rajesh",
      date: "2024-01-14",
    },
    {
      id: 5,
      title: "Frontend Components",
      description: "Create reusable UI components",
      assignee: "Sneha",
      date: "2024-01-13",
    },
  ],
  review: [
    {
      id: 6,
      title: "Code Review",
      description: "Review authentication module",
      assignee: "Kavya",
      date: "2024-01-13",
    },
    {
      id: 7,
      title: "Testing Module",
      description: "Unit testing for user service",
      assignee: "Aditya",
      date: "2024-01-12",
    },
  ],
  done: [
    {
      id: 8,
      title: "Project Setup",
      description: "Initialize React project",
      assignee: "Arjun",
      date: "2024-01-12",
    },
    {
      id: 9,
      title: "Environment Config",
      description: "Setup development environment",
      assignee: "Ritu",
      date: "2024-01-11",
    },
  ],
};

// Components
const Header = () => {
  const { toggleTheme, theme } = React.useContext(ThemeContext);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 24px",
        backgroundColor: "var(--bg-primary)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h1
        style={{
          margin: 0,
          color: "var(--text-primary)",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Admin Dashboard
      </h1>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Profile
        </button>
      </div>
    </header>
  );
};

const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "D" },
    { id: "table", label: "Data Table", icon: "T" },
    { id: "charts", label: "Charts", icon: "C" },
    { id: "calendar", label: "Calendar", icon: "Cal" },
    { id: "kanban", label: "Kanban", icon: "K" },
    { id: "settings", label: "Settings", icon: "S" },
  ];

  return (
    <aside
      style={{
        width: collapsed ? "60px" : "240px",
        backgroundColor: "var(--bg-primary)",
        borderRight: "1px solid var(--border-color)",
        height: "100vh",
        position: "sticky",
        top: 0,
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute",
          right: "-12px",
          top: "20px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "1px solid var(--border-color)",
          backgroundColor: "var(--bg-primary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          zIndex: 1,
        }}
      >
        {collapsed ? "→" : "←"}
      </button>
      <nav style={{ padding: "20px 0", flex: 1 }}>
        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveView(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: collapsed ? "12px" : "12px 20px",
              margin: "4px 8px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor:
                activeView === item.id ? "var(--accent-color)" : "transparent",
              color: activeView === item.id ? "white" : "var(--text-primary)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{ fontSize: "16px", minWidth: "20px", fontWeight: "600" }}
            >
              {item.icon}
            </span>
            {!collapsed && (
              <span style={{ marginLeft: "12px", fontWeight: "500" }}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

const StatsCards = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "24px",
    }}
  >
    {statsData.map((stat, index) => (
      <div
        key={index}
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              fontWeight: "500",
            }}
          >
            {stat.title}
          </span>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: stat.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "700",
              color: "white",
            }}
          >
            {stat.icon}
          </div>
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          {stat.value}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: stat.positive ? "#10b981" : "#ef4444",
            fontWeight: "500",
          }}
        >
          {stat.change} from last month
        </div>
      </div>
    ))}
  </div>
);

const DataTable = () => {
  const [search, setSearch] = useState("");

  const filteredData = tableData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Users
        </h3>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid var(--border-color)",
            borderRadius: "6px",
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            outline: "none",
            width: "200px",
          }}
        />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            {["Name", "Email", "Role", "Status"].map((header) => (
              <th
                key={header}
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "var(--text-secondary)",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr
              key={user.id}
              style={{ borderBottom: "1px solid var(--border-color)" }}
            >
              <td
                style={{ padding: "12px 20px", color: "var(--text-primary)" }}
              >
                {user.name}
              </td>
              <td
                style={{ padding: "12px 20px", color: "var(--text-secondary)" }}
              >
                {user.email}
              </td>
              <td
                style={{ padding: "12px 20px", color: "var(--text-primary)" }}
              >
                {user.role}
              </td>
              <td style={{ padding: "12px 20px" }}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor:
                      user.status === "active"
                        ? "#dcfce7"
                        : user.status === "pending"
                        ? "#fef3c7"
                        : "#fee2e2",
                    color:
                      user.status === "active"
                        ? "#166534"
                        : user.status === "pending"
                        ? "#92400e"
                        : "#991b1b",
                  }}
                >
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ChartsSection = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "24px",
    }}
  >
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px 0",
          color: "var(--text-primary)",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Revenue Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey="name" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px 0",
          color: "var(--text-primary)",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Device Usage
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() - 1))
              )
            }
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.setMonth(currentDate.getMonth() + 1))
              )
            }
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "1px",
          backgroundColor: "var(--border-color)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            style={{
              padding: "12px",
              backgroundColor: "var(--bg-secondary)",
              textAlign: "center",
              fontWeight: "600",
              color: "var(--text-secondary)",
              fontSize: "12px",
            }}
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            style={{
              padding: "12px",
              backgroundColor: "var(--bg-primary)",
              textAlign: "center",
              color: "var(--text-primary)",
              cursor: day ? "pointer" : "default",
              ...(day && isToday(day)
                ? {
                    backgroundColor: "#3b82f6",
                    color: "white",
                    fontWeight: "600",
                  }
                : {}),
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  return (
    <div>
      <h2
        style={{
          marginBottom: "20px",
          color: "var(--text-primary)",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        Project Board
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {Object.entries(kanbanData).map(([column, items]) => (
          <div
            key={column}
            style={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  textTransform: "capitalize",
                }}
              >
                {column}
              </span>
              <span
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                  borderRadius: "12px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {items.length}
              </span>
            </div>
            {items.map((task) => (
              <div
                key={task.id}
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                  }}
                >
                  {task.title}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    marginBottom: "12px",
                  }}
                >
                  {task.description}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>Assignee: {task.assignee}</span>
                  <span>{task.date}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsView = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    timezone: "UTC",
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3
          style={{
            margin: "0 0 20px 0",
            color: "var(--text-primary)",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          General Settings
        </h3>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "var(--text-primary)",
              fontWeight: "500",
            }}
          >
            Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleChange("language", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: "var(--text-primary)",
              fontWeight: "500",
            }}
          >
            Timezone
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--border-color)",
              borderRadius: "6px",
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
          </select>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "var(--bg-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          padding: "24px",
        }}
      >
        <h3
          style={{
            margin: "0 0 20px 0",
            color: "var(--text-primary)",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Preferences
        </h3>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange("notifications", e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Enable Notifications
          </label>
        </div>
        <button
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const themeValue = useTheme();

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <>
            <StatsCards />
            <ChartsSection />
          </>
        );
      case "table":
        return <DataTable />;
      case "charts":
        return <ChartsSection />;
      case "calendar":
        return <CalendarView />;
      case "kanban":
        return <KanbanBoard />;
      case "settings":
        return <SettingsView />;
      default:
        return <StatsCards />;
    }
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "var(--bg-secondary)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <style>{`
                    :root {
                        --bg-primary: #ffffff;
                        --bg-secondary: #f8fafc;
                        --text-primary: #1e293b;
                        --text-secondary: #64748b;
                        --border-color: #e2e8f0;
                        --accent-color: #3b82f6;
                    }
                    
                    [data-theme="dark"] {
                        --bg-primary: #1e293b;
                        --bg-secondary: #0f172a;
                        --text-primary: #f1f5f9;
                        --text-secondary: #94a3b8;
                        --border-color: #334155;
                        --accent-color: #3b82f6;
                    }
                    
                    * {
                        box-sizing: border-box;
                    }
                    
                    body {
                        margin: 0;
                        font-family: system-ui, -apple-system, sans-serif;
                    }
                `}</style>
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
