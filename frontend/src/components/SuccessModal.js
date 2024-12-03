import React from 'react';

const SuccessModal = ({ showSuccessModal, setShowSuccessModal, message }) => {
  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold">{message}</h3>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowSuccessModal(false)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;