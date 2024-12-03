import React from 'react';

const EditItemModal = ({ show, setShow, editName, setEditName, editExpireDate, setEditExpireDate, handleUpdate }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold">Edit Item</h3>
        <div className="mt-4">
          <label className="block text-sm font-medium">🍉 Item Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
            value={editName} onChange={(e) => setEditName(e.target.value)} />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">⏰ Expiry Date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
            value={editExpireDate} onChange={(e) => setEditExpireDate(e.target.value)} />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Save
          </button>
          <button
            onClick={() => setShow(false)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;