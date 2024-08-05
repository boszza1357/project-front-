import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableEdit from '../components/TableEdit';
import TableCard from '../components/TableCard';

export default function AdminHome() {
  const [tables, setTables] = useState([]);
  const [tableseditIdx, setTablesEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:7000/admin/table', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTables(response.data.responseData.tables);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
    fetchData();
  }, [trigger]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:7000/search/tables?type=${searchTerm}`);
      setTables(response.data);
    } catch (error) {
      console.error('Error searching tables by type:', error);
    }
  };

  const openModal = (table_id) => {
    const idx = tables.findIndex((el) => el.table_id === table_id);
    setTablesEditIdx(idx);
    document.getElementById('my_modal_5').showModal();
  };

  const closeModal = () => {
    document.getElementById('my_modal_5').close();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <>
      <div>login สำเสร็จ</div>
      <TableEdit el={tables[tableseditIdx]} closeModal={closeModal} setTrigger={setTrigger} />
      <div className="flex items-center justify-center p-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Enter table type..."
            className="p-2 border rounded-md mr-1 border-gray-700"
            style={{ width: '700px' }}
          />
          <svg
            className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-14 text-zinc-900 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {tables.map((el) => (
          <TableCard key={el.table_id} el={el} openModal={() => openModal(el.table_id)} setTrigger={setTrigger} />
        ))}
      </div>
    </>
  );
}
