import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function TableEdit(props) {
  const {el,closeModal,setTrigger} = props;
  const [input,setInput] = useState({
    type : '',
    tableNumber : '',
    capacity : '',
    status : '',
})
 
  useEffect( ()=>{
    setInput({
      type: el?.type,
      tableNumber: el?.tableNumber,
      capacity: el?.capacity,
      status: el?.status 
    })

  },[el?.table_id])

const hdlChange = e => {
  setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
}
const hdlSubmit = async e => {
  try{
    e.preventDefault()
    const output = { ...input,tableNumber: parseInt(input.tableNumber),capacity: parseInt(input.capacity)}
    const token = localStorage.getItem('token')
    const rs = await axios.put(`http://localhost:7000/admin/update/${el.table_id}`, output, {
      headers : { Authorization : `Bearer ${token}`}
    })
    setTrigger(prv=>!prv);
    console.log(rs)
    alert('Update OK')
    
  }catch(err) {
    alert(err.message)
  }
}

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
    <form className="flex flex-col  border rounded w-5/6 mx-auto p-4 gap-6"
    onSubmit={hdlSubmit}
>
  <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">TypeTable</span>
    </div>
    <input
      type="text"
      placeholder="Type Table"
      className="input input-bordered w-full "
      name="type"
      value={input.type}
      onChange={hdlChange}
    />
  </label>
  <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">TableNumber</span>
    </div>
    <input
      type="text"
      placeholder="Type TableNumber"
      className="input input-bordered w-full "
      name="tableNumber"
      value={input.tableNumber}
      onChange={hdlChange}
    />
  </label>
  <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">Capacity</span>
    </div>
    <input
      type="text"
      placeholder="Type Capacity"
      className="input input-bordered w-full "
      name="capacity"
      value={input.capacity}
      onChange={hdlChange}
    />
  </label>
  <label className="form-control w-full">
  <div className="label">
    <span className="label-text">Status</span>
  </div>
  <select
    className="select select-primary w-full max-w-xs"
    name="status"
    value={input.status}
    onChange={hdlChange}
  >
  
   
    <option value="โต๊ะว่าง">โต๊ะว่าง</option>
    <option value="จองแล้ว">จองแล้ว</option>
  </select>
</label>
  
  <button type='submit' className="btn btn-primary" onClick={closeModal}>Update Table</button>
  <button type='button' className="btn btn-error" onClick={closeModal}>Cancel</button>

</form>
      
    </div>
  </dialog>
  )
}
