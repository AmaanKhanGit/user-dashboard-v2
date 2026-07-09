import "./Loading.css";

const Loading = () => {
  return (
    <section
      className="loading-screen"
      role="status"
      aria-live="polite"
      aria-label="Loading application"
    >
      <div className="loading-card">
        <div className="loading-orbital" aria-hidden="true">
          <span className="loading-orb" />
          <span className="loading-orb loading-orb--secondary" />
        </div>

        <div className="loading-copy">
          <h2 className="loading-title">Preparing your workspace</h2>
          <p className="loading-text">Setting up your dashboard experience.</p>
        </div>
      </div>
    </section>
  );
};

export default Loading;
