import axios from 'axios';
import React,{useEffect,useState} from 'react'

export default function TableCard(props) {
  const {el,openModal,setTrigger} = props;
  const statusColor = el.status ==='โต๊ะว่าง' ? 'bg-blue-100' 
  : el.status ==='จองแล้ว' ? 'bg-lime-400' : 'bg-blue-300'

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

  useEffect (()=>{},[el])

  return (
    <div>
    <div className={`card card-side ${statusColor} bg-base-100 shadow-xl `}>
  <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
  <div className="card-body">
    <div className="flex justify-between">
    <h2 className="card-title">{el.type}</h2>
    <div className="badge badge-error" onClick={hdlDelete}>dalete</div>
    </div>
    <p> TableNumber  = {el.tableNumber}</p>
    <p> Capacity   = {el.capacity}</p>
    <p> Status   = {el.status}</p>
    <div className="card-actions justify-end">
      <button onClick={openModal} className="btn btn-warning">แก้ไข</button>
    </div>
  </div>
</div>
    </div>
  )
}
