function StatusBar(props) {
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

export default StatusBar;
