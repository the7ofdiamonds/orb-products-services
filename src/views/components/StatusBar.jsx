function StatusBarComponent(props) {
  const { message, messageType } = props;

  return (
    <>
      {message && (
        <div className={`status-bar card ${messageType}`}>
          <span>{message}</span>
        </div>
      )}
    </>
  );
}

export default StatusBarComponent;
