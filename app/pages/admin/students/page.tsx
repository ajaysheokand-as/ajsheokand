"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "../../../../components/layouts/adminLayout";
import axios from "axios";

type User = {
  email: string;
  name: string;
  phone: string;
};

type Result = {
    score: number;
    percentage: string
}

type Student = {
  name: string;
  email: string;
  phone: string;
  user: User;
  userId: string;
  date: string;
  result: Result;
};

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const studentsPerPage = 10;
  const maxPageButtons = 10;
  // Pagination calculations
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Create an array of page numbers to display
  const pageNumbers = () => {
    const total = Math.ceil(filteredStudents.length / studentsPerPage);
    const start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const end = Math.min(total, start + maxPageButtons - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get("/api/users");
//       //   console.log("This is response=>",response)
//       //   setStudents(response.data.data);
//       //   setFilteredStudents(response.data.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    //   second: '2-digit',
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', options).format(date);
  };
  
  const fetchResults = async () => {
    try {
      const response = await axios.get("/api/result");
    //   console.log("This is result=>", response);
      setStudents(response.data.data);
      setFilteredStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchResults();
    // fetchStudents();
  }, []);



  useEffect(() => {
    const filtered = students.filter((student) => {
      const studentDate = new Date(student.date);
      const isWithinDateRange =
        (!startDate || studentDate >= new Date(startDate)) &&
        (!endDate || studentDate <= new Date(endDate));
      const isNameMatch = student?.user?.name
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase());
      return isNameMatch && isWithinDateRange;
    });
    setFilteredStudents(filtered);
  }, [searchTerm, students, startDate, endDate]);
  
  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      <div className="mb-4 flex justify-between items-center">
      <input
  type="text"
  placeholder="Search by name..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="border rounded py-2 px-4 w-full max-w-xs"
/>
        <div className="flex space-x-4">
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="border rounded py-2 px-4"
    />
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="border rounded py-2 px-4"
    />
  </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 py-3 px-4 text-left">Date</th>
              <th className="w-1/6 py-3 px-4 text-left">Name</th>
              <th className="w-1/6 py-3 px-4 text-left">Email</th>
              <th className="w-1/6 py-3 px-4 text-left">Phone</th>
              <th className="w-1/6 py-3 px-4 text-left">MCQ Result</th>
              {/* <th className="w-1/6 py-3 px-4 text-left">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {!currentStudents
              ? "Loading..."
              : currentStudents?.map((student, index) => {
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <td className="border py-3 px-4">{formatDate(student?.date)}</td>
                      <td className="border py-3 px-4">{student?.user?.name}</td>
                      <td className="border py-3 px-4">{student?.user?.email}</td>
                      <td className="border py-3 px-4">{student?.user?.phone}</td>
                      <td className="border py-3 px-4">{student?.result.score + "/30"}</td>
                      {/* <td className="border py-3 px-4">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 ml-2">
                    Delete
                  </button>
                </td> */}
                    </tr>
                  );
                })}
          </tbody>
        </table>
        <div className="flex justify-between mt-4 items-center">
          <button
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
          <div className="flex items-center">
            {pageNumbers().map((number) => (
              <button
                key={number}
                className={`px-4 mx-2 py-2 rounded ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
          </div>
          <button
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
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
              onChange={(e) => {
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

export default Students;
