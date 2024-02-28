import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableCard from '../components/TableCard';
import TableEdit from '../components/TableEdit'

export default function UserHome() {
  const [tables, setTables] = useState([]);
  const [tableseditIdx, setTablesEditIdx] = useState(-1)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const run = async () => {
      let token = localStorage.getItem('token');
      const rs = await axios.get('http://localhost:7000/admin/table', {
        headers: { Authorization: `Bearer ${token}` }
      });
      

     

      setTables(rs.data.responseData.tables);

    }
    run();
  }, [trigger]);

  const openModal = (table_id) =>{
    let idx = tables.findIndex( el => el.table_id === table_id)
    setTablesEditIdx(idx)
    document.getElementById('my_modal_5').showModal()
  }
  const closeModal =()=>{
    document.getElementById('my_modal_5').close()
  }

  

  return (
    <>
      <div>login สำเสร็จ</div>
      <TableEdit el={tables[tableseditIdx]} closeModal = {closeModal} setTrigger ={setTrigger} />
      {tables.map( (el) => (
         <TableCard key={el.table_id} el={el} openModal={()=> openModal(el.table_id)} setTrigger ={setTrigger}/>
      ))}
    
    </>
  );
}
