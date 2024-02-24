export const Spinner = () => {
  return (
    <div
      className="spinner-border text-success spinner-border spinner-grow"
      role="status"
    >
      <span
        className="visually-hidden"
        style={{ width: "100px", height: "100px" }}
      ></span>
    </div>
  );
};
