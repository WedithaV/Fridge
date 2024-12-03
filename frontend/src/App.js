import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const App = () => {
  const [name, setName] = useState('');
  const [expiredate, setExpiredate] = useState('');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editExpireDate, setEditExpireDate] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal after delete
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false); // State for success modal after adding item
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false); // State for success modal after editing item

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5038/api/item')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const url = 'http://localhost:5038/api/item';
    const data = {
      "name": name,
      expireDate: expiredate ? new Date(expiredate).toISOString() : null
    };
    axios.post(url, data)
      .then((result) => {
        getData();
        clearFields();
        setShowAddSuccessModal(true); // Show success modal after adding item
      }).catch((error) => {
        setErrorMessage('Error: ' + error);
        setShowErrorModal(true);
      });
  };

  const handleEdit = (id) => {
    setShow(true);
    axios.get(`http://localhost:5038/api/item/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditExpireDate(result.data.expireDate ? format(new Date(result.data.expireDate), 'yyyy-MM-dd') : '');
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const url = `http://localhost:5038/api/item/${editId}`;
    const updatedExpireDate = editExpireDate ? new Date(editExpireDate).toISOString() : null;
    const data = {
      "name": editName,
      "expireDate": updatedExpireDate
    };

    axios.put(url, data)
      .then((result) => {
        getData();
        clearFields();
        setShow(false);
        setShowEditSuccessModal(true); // Show success modal after editing item
      })
      .catch((error) => {
        setErrorMessage('Update failed: ' + error);
        setShowErrorModal(true);
      });
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deleteItemId !== null) {
      axios.delete(`http://localhost:5038/api/item/${deleteItemId}`)
        .then((result) => {
          getData();
          setShowDeleteModal(false); // Close delete modal
          setShowSuccessModal(true); // Show success modal after deletion
        })
        .catch((error) => {
          setErrorMessage('Error: ' + error);
          setShowErrorModal(true);
        });
    }
  };

  const clearFields = () => {
    setName('');
    setExpiredate('');
    setEditName('');
    setEditExpireDate('');
    setEditId('');
  };

  const getExpiryClass = (expireDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expireDate);
    const diffInTime = expiryDate.getTime() - currentDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    const baseClass = "text-xs font-semibold py-1 rounded w-24 text-center";

    if (diffInDays < 0) {
      return `${baseClass} bg-red-100 text-red-800`; // Expired
    } else if (diffInDays <= 30) {
      return `${baseClass} bg-yellow-100 text-yellow-800`; // Expiring soon
    } else {
      return `${baseClass} bg-green-100 text-green-800`; // Healthy
    }
  };

  const getShoppingRecommendation = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const shoppingDay = data.length < 5 ? (dayOfWeek + 2) % 7 : -1;

    if (shoppingDay === -1) {
      return '🛒 No shopping needed at the moment!';
    }

    // Calculate the shopping day
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `🌞 It's better to go shopping before this ${daysOfWeek[shoppingDay]}`;
  };

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return (
    <div className="flex flex-col items-center py-10 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">{greeting}, Johny!</h1>
      <p className="text-gray-500 mt-2">{getShoppingRecommendation()}</p>

      {/* Add Item Box */}
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 mt-6">
            ADD TO FRIDGE
          </button>
        </div>
        <p className="text-sm text-gray-500">⚠️ We Don't Want More Than One Piece Of The Same Food In Our Fridge.</p>
      </div>

      {/* Item List Box */}
      <div className="bg-blue-50 rounded-lg mt-8 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 ml-auto">Total items — {data.length}</h2>
        </div>
        <ul className="space-y-4">
          {data && data.length > 0 ? data.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-200 hover:outline hover:outline-2 hover:outline-blue-500">
              <div className="flex justify-between items-center w-full">
                <div className="flex-shrink w-40">
                  <p className="text-gray-800 font-semibold inline mr-10 cursor-pointer" onClick={() => handleEdit(item.id)}>{item.name}</p>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-500 text-sm inline pl-4">Expiry date — {item.expireDate ? format(new Date(item.expireDate), 'dd/MM/yyyy') : 'N/A'}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getExpiryClass(item.expireDate)}>{getExpiryClass(item.expireDate).includes("bg-red-100") ? "Expired" : getExpiryClass(item.expireDate).includes("bg-yellow-100") ? "Expiring Soon" : "Healthy"}</span>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="text-gray-400 hover:text-red-600">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            </li>
          )) : 'Loading...'}
        </ul>
      </div>

      {/* Edit Modal */}
      {show && (
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
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
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
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Item deleted successfully!</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
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
      )}

      {/* Success Modal after Add */}
      {showAddSuccessModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Item added successfully!</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowAddSuccessModal(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal after Edit */}
      {showEditSuccessModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold">Item edited successfully!</h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowEditSuccessModal(false)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
