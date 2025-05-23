const AuthHero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="play-button">
          <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
          </svg>
        </div>
        <h1 className="hero-title">
          Digital
          <br />
          platform
          <br />
          for task
          <br />
          <span className="hero-title-dark">management.</span>
        </h1>
        <p className="hero-subtitle">
          You will never miss upcoming tasks.
          <br />
          But you will stay ahead in planning.
        </p>
      </div>
    </div>
  );
};

export default AuthHero;
