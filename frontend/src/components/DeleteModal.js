import React from 'react';

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDelete }) => {
  if (!showDeleteModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold">Are you sure you want to delete this item?</h3>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
            Yes, Delete
          </button>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;