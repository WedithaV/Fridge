import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const ItemList = ({ data, handleEdit, handleDeleteClick, getExpiryClass }) => {
  return (
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
  );
};

export default ItemList;