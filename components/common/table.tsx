import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

interface TableProps {
  data: any[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  header: any[]
}

const Table: React.FC<TableProps> = ({
  data,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
  header
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <div className="w-full">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            {header.map((item, index)=>{
                return (<th
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                    onClick={() => handleSort(item)
                    }
                  >
                    {item}
                  </th>)
  
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 transition-colors duration-300"
            >
              <td className="px-4 py-2">{index+1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.phone}</td>
              <td className="px-4 py-2">{item.noOfQues}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex justify-between items-center mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <Search onSearch={onSearch} />
      </div> */}
    </div>
  );
};

export default Table;
