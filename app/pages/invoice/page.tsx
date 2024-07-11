// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Table from '../../../components/common/table';
// import Pagination from '../../../components/common/pagination';
// import Search from '../../../components/common/search';
// import {dummyInvoices} from '../../../data/dummyInvoice'

// const Invoices: React.FC = () => {
//   const router = useRouter();
//   // const searchParams = useSearchParams();
//   const [invoices, setInvoices] = useState(dummyInvoices);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   // useEffect(() => {
//   //   const page = searchParams.get('page') || '1';
//   //   const query = searchParams.get('query') || '';
//   //   fetchInvoices(parseInt(page), query);
//   // }, [searchParams]);

//   const fetchInvoices = async (page: number, query: string) => {
//     // const response = await fetch(`/api/invoices?page=${page}&query=${query}`);
//     // const { data, totalPages } = await response.json();
//     setInvoices(dummyInvoices);
//     setTotalPages(totalPages);
//     setCurrentPage(page);
//   };

//   const handlePageChange = (page: number) => {
//     router.push(`/invoices?page=${page}`);
//   };

//   const handleSearch = (query: string) => {
//     router.push(`/invoices?query=${query}`);
//   };

//   return (
//     <div className="container mx-auto my-8">
//       {/* <Search onSearch={handleSearch} /> */}
//       <Table
//         data={invoices}
//         totalPages={totalPages}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//         onSearch={handleSearch}
//         header={["Name", "Email", "Amount"]}
//       />
//       <div className="flex justify-between items-center mt-4">
//         <Pagination
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={handlePageChange}
//         />
        
//       </div>
//     </div>
//   );
// };

// export default Invoices;