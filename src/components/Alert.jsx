export default function Alert({ alert, content, className }) {
  return (
    <>
      <div className={`alert alert-${alert} ${className}`} role="alert">
        {content}
      </div>
    </>
  );
}
