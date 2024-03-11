import React from 'react'
import { useState } from 'react';
import axios from 'axios';


export default function CreaTable() {
    const [input,setInput] = useState({
        images : '',
        type : '',
        tableNumber : '',
        capacity : '',
        status : '',

        
    })
    const hdlChange = e => {
        setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
      }
    
      const hdlSubmit = async e => {
        try{
          e.preventDefault()
          const formData = new FormData();
          formData.append('images', input.images);
          formData.append('type', input.type);
          formData.append('tableNumber', parseInt(input.tableNumber));
          formData.append('capacity', parseInt(input.capacity));
          formData.append('status', input.status);

          const token = localStorage.getItem('token')
          const rs = await axios.post('http://localhost:7000/admin/uploads', formData, {
            headers : { Authorization : `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}
          })
          console.log(rs)
          alert('Create new OK')
        }catch(err) {
          alert(err.message)
        }
      }
      const onFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setInput((prev) => ({ ...prev, images: file }));
        } else {
          console.error("No files selected");
        }
      };
  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
    onSubmit={hdlSubmit}>

<label className="form-control w-full">
  <div className="label">
    <span className="label-text">Image</span>
  </div>
  <input
    type="file"
    className="input input-bordered w-full"
    name="images"
    onChange={onFileChange}
  />
</label>


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
  <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">Status</span>
    </div>
    <input
      type="text"
      placeholder="Type Status"
      className="input input-bordered w-full "
      name="status"
      value={input.status}
      onChange={hdlChange}
    />
  </label>
  
  <button className="btn btn-success">Crea Table</button>
</form>
  )
}
