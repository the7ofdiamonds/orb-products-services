function ErrorComponent(props) {
  const { error } = props;

  return (
    <main className="error">
      <div className="status-bar card error">
        <span>
          <h4>{error}</h4>
        </span>
      </div>
    </main>
  );
}

export default ErrorComponent;
