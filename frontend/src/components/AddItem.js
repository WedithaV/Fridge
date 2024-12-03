import React from 'react';

const AddItem = ({ name, setName, expiredate, setExpiredate, handleSave }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-4xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">🍉 Item Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">⏰ Expiry Date</label>
          <input
            type="date"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={expiredate} onChange={(e) => setExpiredate(e.target.value)} />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-800 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-1200 mt-6">
          ADD TO FRIDGE
        </button>
      </div>
      <p className="text-sm text-gray-500">⚠️ We Don't Want More Than One Piece Of The Same Food In Our Fridge.</p>
    </div>
  );
};

export default AddItem;