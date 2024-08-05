import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableEdit from '../components/TableEdit';
import CardUser from './CardUser';
import { Link } from 'react-router-dom';

export default function UserHome() {
  const [tables, setTables] = useState([]);
  const [tableseditIdx, setTablesEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem('token');
      const rs = await axios.get('http://localhost:7000/product/table', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTables(rs.data.responseData.tables);
    }
    run();
  }, [trigger]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:7000/search/tables?type=${searchTerm}`);
      setTables(response.data); 
    } catch (error) {
      console.error('Error searching tables by type:', error);
    }
  };

  const openModal = (table_id) =>{
    let idx = tables.findIndex(el => el.table_id === table_id)
    setTablesEditIdx(idx)
    document.getElementById('my_modal_5').showModal()
  }
  const closeModal =()=>{
    document.getElementById('my_modal_5').close()
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <>
   <div className="p-4 flex items-center justify-center">
  <div className="relative">
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Enter table type..."
      className="p-2 border rounded-md mr-1 border-gray-700"
      style={{ width: "700px" }}
    />
    <svg className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-14 text-zinc-900 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
</div>

      <div className='grid grid-cols-3 gap-4'>
        {tables.map(el => (
          <CardUser key={el.table_id} el={el} openModal={() => openModal(el.table_id)} setTrigger={setTrigger} />
        ))}
      </div>

      <TableEdit el={tables[tableseditIdx]} closeModal={closeModal} setTrigger={setTrigger} />
    </>
  );
}
