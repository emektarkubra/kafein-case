export default function Alert({ alert, content }) {
  return (
    <>
      <div className={`alert alert-${alert}`} role="alert">
        {content}
      </div>
    </>
  );
}
