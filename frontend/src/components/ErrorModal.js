import React from 'react';

const ErrorModal = ({ showErrorModal, setShowErrorModal, errorMessage }) => {
  if (!showErrorModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold text-red-600">Error</h3>
        <p>{errorMessage}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowErrorModal(false)}
            className="bg-red-600 text-white py-2 px-4 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;