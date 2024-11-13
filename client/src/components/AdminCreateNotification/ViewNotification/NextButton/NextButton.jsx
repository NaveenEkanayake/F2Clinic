const NextButton = ({ currentPage, totalPages, handleNext }) => {
  return (
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded disabled:opacity-50 mr-11"
    >
      Next
    </button>
  );
};

export default NextButton;
