import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import EditItemModal from './components/EditItemModal';
import DeleteModal from './components/DeleteModal';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAddSuccessModal, setShowAddSuccessModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    getData();
  }, []);

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
        setShowAddSuccessModal(true);
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
        setShowEditSuccessModal(true);
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
          setShowDeleteModal(false);
          setShowSuccessModal(true);
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
      return `${baseClass} bg-red-100 text-red-800`;
    } else if (diffInDays <= 30) {
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    } else {
      return `${baseClass} bg-green-100 text-green-800`;
    }
  };

  const getShoppingRecommendation = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const shoppingDay = data.length < 5 ? (dayOfWeek + 2) % 7 : -1;

    if (shoppingDay === -1) {
      return '🛒 No shopping needed at the moment!';
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `🌞 It's better to go shopping before this ${daysOfWeek[shoppingDay]}`;
  };

  return (
    <div className="flex flex-col items-center py-10 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">{greeting}, Johny!</h1>
      <p className="text-gray-500 mt-2">{getShoppingRecommendation()}</p>

      <AddItem
        name={name}
        setName={setName}
        expiredate={expiredate}
        setExpiredate={setExpiredate}
        handleSave={handleSave}
      />

      <ItemList
        data={data}
        handleEdit={handleEdit}
        handleDeleteClick={handleDeleteClick}
        getExpiryClass={getExpiryClass}
      />

      <EditItemModal
        show={show}
        setShow={setShow}
        editName={editName}
        setEditName={setEditName}
        editExpireDate={editExpireDate}
        setEditExpireDate={setEditExpireDate}
        handleUpdate={handleUpdate}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDelete={handleDelete}
      />

      <SuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        message="Item deleted successfully!"
      />

      <SuccessModal
        showSuccessModal={showAddSuccessModal}
        setShowSuccessModal={setShowAddSuccessModal}
        message="Item added successfully!"
      />

      <SuccessModal
        showSuccessModal={showEditSuccessModal}
        setShowSuccessModal={setShowEditSuccessModal}
        message="Item edited successfully!"
      />

      <ErrorModal
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default App;