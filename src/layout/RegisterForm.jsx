import axios from 'axios'
import {useState} from "react";
import weerapon from '../image/eee.jpg'
import { useNavigate } from 'react-router-dom'; 
export default function RegisterForm() {

  const [input, setInput] = useState({
    firstname : '',
    lastname : '',
    password : '',
    phone : '',
    email : '',
    gender : ''
  })

  const navigate = useNavigate();

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
        e.preventDefault();

        // Check if phone number is valid
        if(isNaN(input.phone) || input.phone.length !== 10) {
            return alert('Please check Phone');
        }
        if(!input.firstname || !input.lastname){
          return alert('Please check Firstname and lastname ')
        }
        const rs = await axios.post('http://localhost:7000/auth/register', input);
        console.log(rs);
        if(rs.status === 200) {
            alert('Register Successful');
            navigate('/login')
        }
    } catch(err) {
        if (err.response && err.response.status === 400) {
            if (err.response.data.message === "User already exist") {
                alert('Email already exists, please use another email');
            } else {
                console.log(err.message);
                alert('Email already exists, please use another email');
            }
        }
    }
}



  return (
    <div className="absolute inset-1 bg-purple-300 flex justify-center items-center">
    <div
      className="p-5 w-4/6 min-w-[500px] rounded"
      style={{
        backgroundImage: `url(${weerapon})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '1210px',
        height: '150vh',
      }}
    >
      <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
      
        <label className="flex flex-col gap-3 m-auto mt-3">
        <div className="text-3xl mt-32 text-center text-white">Register Form</div>
          <span className="text-lg text-white">Firstname</span>
          <input
            type="text"
            className="input w-full max-w-xs px-11 bg-transparent border border-gray-300 rounded"
            name="firstname"
            value={input.firstname}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col gap-3 m-auto">
          <span className="text-lg text-white">Lastname</span>
          <input
            type="text"
            className="input w-full max-w-xs px-11 bg-transparent border border-gray-300 rounded"
            name="lastname"
            value={input.lastname}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col gap-1 m-auto ">
          <span className="text-lg text-white">E-mail</span>
          <input
            type="email"
            className="input w-full max-w-xs px-11 bg-transparent border border-gray-300 rounded"
            name="email"
            value={input.email}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col gap-1 m-auto">
          <span className="text-lg text-white">Password</span>
          <input
            type="password"
            className="input w-full max-w-xs px-11 bg-transparent border border-gray-300 rounded"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col gap-1 m-auto">
          <span className="text-lg text-white">Phone</span>
          <input
            type="phone"
            className="input w-full max-w-xs px-11 bg-transparent border border-gray-300 rounded"
            name="phone"
            value={input.phone}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col gap-1 m-auto">
          <span className="text-lg text-white">Gender</span>
          <select
            className="input w-full max-w-xs px-14 bg-transparent border border-gray-300 rounded"
            name="gender"
            value={input.gender}
            onChange={hdlChange}
            required
          >
            <option value="">Please select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <button
          type="submit"
          className="btn btn-outline btn-success mt-5 mx-auto block w-full max-w-xs"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 text-center text-white ">
          <span className='text-black'>Already have an account? </span>
          <button className="underline" onClick={() =>  navigate('/login')}>
            Login
          </button>
        </div>
    </div>
  </div>
  

  );
}
