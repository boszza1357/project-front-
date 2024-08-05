import axios from 'axios';
import React,{useEffect,useState} from 'react'

export default function TableCard(props) {
  const {el,openModal,setTrigger} = props;
  const [images, setImages] = useState([]);
  const statusColor = el.status ==='FREE' ? 'bg-blue-100' 
  : el.status ==='RESERVED' ? 'bg-lime-500' : 'bg-blue-300'

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:7000/admin/images/${el.table_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(response.data);
    } catch (err) {
      console.log(err)
    }
  };

  const hdlDelete = async e =>{
    try {
    e.stopPropagation()
    const token = localStorage.getItem('token')
    const rs = await axios.delete(`http://localhost:7000/admin/delete/${el.table_id}`,{
      headers : {Authorization : `Bearer ${token}`}
    })
    console.log(rs)
    alert('Delete successful')
    setTrigger(prv=>!prv) 
  } catch (err) {
    console.log(err)
  }
  }

  useEffect (()=>{ fetchImages();},[el])

  return (
    <div className='flex flex-row m-4'>
      <div className={`card card-side ${statusColor} bg-base-100 shadow-xl  flex-col  m-2 `}>  
        <div className='flex justify-center w-80 h-auto m-auto'>
          {images.length > 0 && (
            <figure>
              {images.map((image) => (
                <img key={image.image_id || image.path} src={`http://localhost:7000/${image.path.replace(/\\/g, '/')}`} alt={`Table Number ${el.tableNumber} - Image`} />
              ))}
            </figure>
          )}
        </div>
        <div className="card-body">
          <div className="flex justify-end mb-5 ">
            <div className="badge badge-error hover:bg-red-600 active:bg-red-800 cursor-pointer rounded-md shadow-md p-3 " onClick={hdlDelete}>Delete</div>
          </div>
          <div className='border-b-8 border-y-indigo-400 space-y-4'>
          <h2 className=" text-center font-bold text-blue-700 ">Table type = {el.type}</h2>
            <p className='text-center text-rose-500 whitespace-nowrap'>TableNumber  = {el.tableNumber}</p>
            <p className='text-center text-violet-700'>Capacity   = {el.capacity}</p>
            <p className='text-center text-violet-700'>Price    = {el.price} $</p>
            <p className='text-center text-violet-700'>nots   : {el.nots} </p>
            <p className='text-center text-gray-600 font-bold  mb-24 animate-bounce whitespace-nowrap'>Status   = {el.status}</p>

          </div>
          <div className="card-actions justify-end mt-2 mx-auto">
            <button onClick={openModal} className="btn btn-warning px-8 py-3 xl:px-24 xl:py-4 hover:scale-105 border border-solid border-gray-500 transition-transform duration-300 rounded-md">แก้ไข</button>
          </div>
        </div>
      </div>
    </div>
  )
}
