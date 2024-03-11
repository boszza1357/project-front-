import axios from 'axios';
import React,{useEffect,useState} from 'react'



export default function TableCard(props) {
  const {el,openModal,setTrigger} = props;
  const [images, setImages] = useState([]);
  const statusColor = el.status ==='โต๊ะว่าง' ? 'bg-blue-100' 
  : el.status ==='จองแล้ว' ? 'bg-lime-500' : 'bg-blue-300'

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:7000/admin/images/${el.table_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data)
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
    <div className='mt-2 pr-4 mb-8 pl-2'>
    <div className={`card card-side ${statusColor} bg-base-100 shadow-xl `}>
      <div className='flex items-center justify-center w-80 h-26 rounded-full m-0'>
    {images.length > 0 && (
  <figure>
    {images.map((image) => (
      <img key={image.image_id || image.path} src={`http://localhost:7000/${image.path.replace(/\\/g, '/')}`} alt={`Table Number ${el.tableNumber} - Image`} />
    ))}
  </figure>
)}
</div>
  <div className="card-body">
    <div className="flex justify-between">
    <h2 className="card-title text-xl font-bold text-blue-700 text-center">Table type = {el.type}</h2>
    <div className="badge badge-error" onClick={hdlDelete}>dalete</div>
    </div>
    <div className='border-b-8 border-y-indigo-400 '>
    <p className='text-xl text-rose-500 mb-4'> TableNumber  = {el.tableNumber}</p>
    <p className='text-xl text-violet-700 mb-4'> Capacity   = {el.capacity}</p>
    <p className='text-xl text-gray-600 font-bold text-center mb-8 animate-bounce'> Status   = {el.status}</p>
    </div>
    <div className="card-actions justify-end">
      <button onClick={openModal} className="btn btn-warning">แก้ไข</button>
    </div>
  </div>
</div>
    </div>
  )
}
