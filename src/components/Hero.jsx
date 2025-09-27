function Hero({ title, description = null, link = null, linkFunction = null }) {
  return (
    <div className="hero">
      <h1 className="hero-title">{title}</h1>
      {description && <p className="hero-description">{description}</p>}
      {link && (
        <p className="hero-link" onClick={linkFunction}>
          {link}
        </p>
      )}
    </div>
  );
}

export default Hero;
