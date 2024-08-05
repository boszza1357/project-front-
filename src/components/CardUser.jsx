import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom'; // เพิ่ม import Link

export default function CardUser(props) {
  const {el,openModal,setTrigger} = props;
  const [images, setImages] = useState([]);
  const statusColor = el.status ==='FREE' ? 'bg-blue-100' 
    : el.status ==='RESERVED' ? 'bg-lime-400' : 'bg-blue-300'

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:7000/product/images/${el.table_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(response.data);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect (()=>{ fetchImages();},[el])

  return (
    <div className='flex flex-row m-4'>
      <div className={`card card-side ${statusColor} bg-base-100 shadow-xl  flex-col  m-2 `}>  
      <div className="w-80 h-auto m-auto">
          {images.length > 0 && (
            <figure>
              {images.map((image) => (
                <img key={image.image_id || image.path} src={`http://localhost:7000/${image.path.replace(/\\/g, '/')}`} alt={`Table Number ${el.tableNumber} - Image`} className="object-cover w-full h-full rounded-t-lg" />
              ))}
            </figure>
          )}
        </div>
        <div className="card-body">
          <div className="flex justify-end mb-5 "></div>
          <div className='border-b-8 border-y-indigo-400 space-y-4'>
            <h2 className=" text-center font-bold text-slate-950 ">Table type : {el.type}</h2>
            <p className='text-center text-violet-700'>Capacity   : {el.capacity}</p>
             <p className='text-center text-red-500'>Price    : {el.price} $</p>
            <p className='text-center text-gray-600 font-bold  mb-24 animate-bounce whitespace-nowrap'>Status   = {el.status}</p>
          </div>
          <div className="card-actions justify-end mt-2 mx-auto">

          <Link to={`/table/${el.table_id}`} className='btn bg-green-500 text-white px-8 py-3 xl:px-24 xl:py-4 hover:bg-green-600 hover:scale-105 border border-solid border-gray-500 transition-transform duration-300 rounded-md'>View details</Link>

          </div>
        </div>
      </div>
    </div>
  )
}
