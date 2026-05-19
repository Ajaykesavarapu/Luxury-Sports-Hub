import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container" onClick={toggleTheme}>
      <div className="theme-toggle-slider" />
      <button 
        className={`theme-toggle-btn ${theme === "light" ? "active" : ""}`}
        aria-label="Switch to Daylight Mode"
      >
        ☀️
      </button>
      <button 
        className={`theme-toggle-btn ${theme === "dark" ? "active" : ""}`}
        aria-label="Switch to Night Mode"
      >
        🌙
      </button>
    </div>
  );
};

export default ThemeToggle;
