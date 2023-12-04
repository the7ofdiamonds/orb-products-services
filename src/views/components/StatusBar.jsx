function StatusBarComponent(props) {
  const { message, messageType } = props;

  return (
    <>
      {message && (
        <div className={`status-bar card ${messageType}`}>
          <span>
            <h4>{message}</h4>
          </span>
        </div>
      )}
    </>
  );
}

export default StatusBarComponent;
