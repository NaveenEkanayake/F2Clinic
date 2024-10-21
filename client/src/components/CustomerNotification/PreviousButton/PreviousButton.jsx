const PreviousButton = ({ currentPage, handlePrevious }) => {
  return (
    <button
      onClick={handlePrevious}
      disabled={currentPage === 1}
      className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded disabled:opacity-50 ml-11"
    >
      Previous
    </button>
  );
};

export default PreviousButton;
