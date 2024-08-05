import React from 'react'
import { useState ,useEffect } from 'react';
import axios from 'axios';



export default function CreaTable() {
    const [input,setInput] = useState({
        images : '',
        type : '',
        tableNumber : '',
        capacity : '',
        status : '',
        price : '',
        nots : ''


        
    })
    // const [tableStatusOptions, setTableStatusOptions] = useState([]);
    // const token = localStorage.getItem('token');
    // useEffect(() => {
    //     async function fetchTableStatus() {
    //         try {
    //             const response = await axios.get('http://localhost:7000/admin/all-status',{
    //               headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //             });
    //             setTableStatusOptions(response.data.status);
    //         } catch (error) {
    //             console.error('Error fetching table status:', error);
    //         }
    //     }

    //     fetchTableStatus();
    // }, []);
  


       
    const hdlChange = e => {
        setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
      }
  
      const hdlSubmit = async e => {
        try{
          e.preventDefault()
          const formData = new FormData();
          formData.append('images', input.images);
          formData.append('type', input.type);
          formData.append('tableNumber', input.tableNumber);
          formData.append('capacity', parseInt(input.capacity));
          formData.append('status', input.status);
          formData.append('price', parseFloat(input.price));
          formData.append('nots', input.nots);

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
    <form className="flex flex-col w-full max-w-lg border rounded-lg mx-auto p-4 space-y-6"
    onSubmit={hdlSubmit}>

  <label className="block w-full">
    <span className="text-gray-700">Image</span>
    <input
      type="file"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      name="images"
      onChange={onFileChange}
    />
  </label>

  <label className="block w-full">
    <span className="text-gray-700">Type Table</span>
    <input
      type="text"
      placeholder="Type Table"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      name="type"
      value={input.type}
      onChange={hdlChange}
    />
  </label>

  <label className="block w-full">
    <span className="text-gray-700">Table Number</span>
    <input
      type="text"
      placeholder="Table Number"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      name="tableNumber"
      value={input.tableNumber}
      onChange={hdlChange}
    />
  </label>

  <label className="block w-full">
    <span className="text-gray-700">Capacity</span>
    <input
      type="text"
      placeholder="Capacity"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      name="capacity"
      value={input.capacity}
      onChange={hdlChange}
    />
  </label>

  <label className={`block w-full ${input.status === '' ? 'border-red-500' : ''}`}>
  <span >Table Status</span>
  <select
    className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${input.status === '' ? 'border-red-500' : ''}`}
    name="status"
    value={input.status}
    onChange={hdlChange}>
    <option value="">Select Table Status</option>
    <option value="FREE">FREE</option>
  </select>
  {input.status === '' && <span className="text-red-500 text-sm">Please select Table Status</span>}
</label>

  <label className="block w-full">
    <span className="text-gray-700">Price</span>
    <input
      type="text"
      placeholder="Price"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      name="price"
      value={input.price}
      onChange={hdlChange}
    />
  </label>

  <label className="block w-full">
    <span className="text-gray-700">Notes</span>
    <input
      type="text"
      placeholder="Notes"
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
      name="nots"
      value={input.nots}
      onChange={hdlChange}
    />
  </label>
  
  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    Create Table
  </button>

  {/* เพิ่มลิงก์หรือข้อความเพื่อช่วยเหลือหรือข้อมูลเพิ่มเติมได้ที่นี่ */}
  <p className="text-gray-500 text-sm">
    ต้องการความช่วยเหลือ? ติดต่อเราที่ วีรพล ภานุรักษ์ รักทำไหม
  </p>
</form>


  )
}
