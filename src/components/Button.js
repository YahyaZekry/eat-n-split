export default function Button({ children, onClick }) {
  // Return a button with onClick handler and children as its content
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
