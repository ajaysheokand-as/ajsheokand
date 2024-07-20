'use client'
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../../components/layouts/adminLayout';
import axios from 'axios';

type Result = {
    score: number;
    percentage: string;
  };

type Item = {
    _id: string;
    userId: string;
    email: string;
    phone: string;
    name:string;
    date: string;
    noOfQues: string;
    result: Result

  };

const Quiz: React.FC = () => {
  const [item, setItem] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItem, setFilteredItem] = useState<Item[]>([]);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ItemPerPage = 10;
  const maxPageButtons = 10;
  // Pagination calculations
  const indexOfLastItem = currentPage * ItemPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemPerPage;
//   console.log("indexOfLastItem",indexOfLastItem, "indexOfFirstItem",indexOfFirstItem)
  const currentItem = item.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
//   console.log("currentItem",currentItem)
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Create an array of page numbers to display
  const pageNumbers = () => {
    const total = Math.ceil(item.length / ItemPerPage);
    const start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const end = Math.min(total, start + maxPageButtons - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get('/api/test'); 
        // console.log("This is response=>",response.data?.data)
        setItem(response?.data?.data);
        setFilteredItem(response?.data?.data);
      } catch (error) {
        console.error('Error fetching Item:', error);
      }
    };

    fetchItem();
  }, []);

  useEffect(() => {
    const filtered = filteredItem.filter(item =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItem(filtered);
  }, [searchTerm, item]);

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">Quiz Result</h2>
      {/* <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded py-2 px-4 w-full max-w-xs"
        />
      </div> */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 py-3 px-4 text-left">Name</th>
              <th className="w-1/6 py-3 px-4 text-left">Email</th>
              <th className="w-1/6 py-3 px-4 text-left">Phone</th>
              <th className="w-1/6 py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItem?.map((item, index) => {
                // console.log("item=>",item)
                return (
              <tr
                key={item._id}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                <td className="border py-3 px-4">{item?.userId}</td>
                <td className="border py-3 px-4">{item?.date}</td>
                <td className="border py-3 px-4">{item?.result.score}</td>
                <td className="border py-3 px-4">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        <div className="flex justify-between mt-4 items-center">
          <button
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
          <div className="flex items-center">
            {pageNumbers().map(number => (
              <button
                key={number}
                className={`px-4 mx-2 py-2 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
          <div className="ml-4">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={e => {
                const page = Number(e.target.value);
                if (page >= 1 && page <= totalPages) paginate(page);
              }}
              className="border rounded py-2 px-4"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Quiz;