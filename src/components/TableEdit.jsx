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
    images : null,
    price : '',
    nots : '',
})
 
  useEffect( ()=>{
    setInput({
      images : el?.images,
      type: el?.type,
      tableNumber: el?.tableNumber,
      capacity: el?.capacity,
      status: el?.status,
      price : el?.price,
      nots : el?.nots 
    })

  },[el?.table_id])
  const [tableStatusOptions, setTableStatusOptions] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function fetchTableStatus() {
            try {
                const response = await axios.get('http://localhost:7000/admin/all-status',{
                  headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                setTableStatusOptions(response.data.status);
            } catch (error) {
                console.error('Error fetching table status:', error);
            }
        }

        fetchTableStatus();
    }, []);
  

const hdlChange = e => {
  setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
}
const hdlFileChange = e =>{
  setInput (prv => ({...prv, images : e.target.files[0]}));
}
const hdlSubmit = async e => {
  try {
    e.preventDefault();

    if (input.images !== null) {
      const output = {
        ...input,
        capacity: parseInt(input.capacity),
        price : parseFloat(input.price)
        
      };

      const formData = new FormData();
      formData.append("type", output.type);
      formData.append("tableNumber", output.tableNumber);
      formData.append("capacity", output.capacity);
      formData.append("status", output.status);
      formData.append('price', parseFloat(output.price));
      formData.append('nots', output.nots);

      // append รูปภาพ
      formData.append("images", input.images);
      console.log("Sending data to back-end:", formData);
      const token = localStorage.getItem('token');
      const rs = await axios.put(`http://localhost:7000/admin/update/${el.table_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTrigger(prev => !prev);
      console.log(rs);
      alert('Update OK');
    } else {
      alert('Please select an image before updating.');
    }
  } catch (err) {
    alert(err.message);
  }
}
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
    <form className="flex flex-col  border rounded w-5/6 mx-auto p-4 gap-6"
    onSubmit={hdlSubmit}>

      <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">file image</span>
    </div>
    <input type="file" id='imageInput' onChange={hdlFileChange} />
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
                    <span className="label-text">Table Status</span>
                </div>
                <select
                    className="select select-bordered w-full"
                    name="status"
                    value={input.status}
                    onChange={hdlChange}
                >
                    {tableStatusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </label>
            <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">Price</span>
    </div>
    <input
      type="text"
      className="input input-bordered w-full "
      name="price"
      value={input.price}
      onChange={hdlChange}
    />
  </label>
  <label className="form-control w-full ">
    <div className="label">
      <span className="label-text">Notes</span>
    </div>
    <input
      type="text"
      className="input input-bordered w-full "
      name="nots"
      value={input.nots}
      onChange={hdlChange}
    />
  </label>
  <button type='submit' className="btn btn-primary" onClick={closeModal}>Update Table</button>
  <button type='button' className="btn btn-error" onClick={closeModal}>Cancel</button>

</form>
      
    </div>
  </dialog>
  )
}
