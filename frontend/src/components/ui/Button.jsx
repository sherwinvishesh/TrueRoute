export default function Button({ children, onClick }) {
    return (
      <button
        className="bg-blue-700 text-white px-8 py-4 rounded-xl text-xl shadow-lg hover:bg-blue-800 transition-all duration-300"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  