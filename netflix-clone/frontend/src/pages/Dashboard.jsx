import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("authUser") || "null");

  function handleLogout() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    navigate("/");
  }

  const placeholderTitles = Array.from({ length: 12 }, (_, i) => `Title ${i + 1}`);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <span className="brand-logo">CineFlix</span>
        <div className="user-info">
          <span>Hi, {user?.name || "Member"}</span>
          <button className="logout-button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <section className="dashboard-hero">
        <h1>Welcome back{user ? `, ${user.name}` : ""}!</h1>
        <p>You're signed in as {user?.email}. This is a dummy dashboard for demo purposes.</p>
      </section>

      <section className="dashboard-grid">
        {placeholderTitles.map((title) => (
          <div className="dashboard-card" key={title}>
            {title}
          </div>
        ))}
      </section>
    </div>
  );
}
