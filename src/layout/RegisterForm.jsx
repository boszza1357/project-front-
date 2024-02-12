import axios from 'axios'
import {useState} from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstname : '',
    lastname : '',
    password : '',
    phone : '',
    email : '',
    gender : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      if(isNaN(input.phone) || input.phone.length !== 10) {
        return alert('Please check Phone')
      }
      const rs = await axios.post('http://localhost:7000/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5 text-center">Register Form</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs mx-auto ">
          <div className="label">
            <span className="label-text">firstname</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="firstname"
            value={input.firstname}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs  mx-auto ">
          <div className="label">
            <span className="label-text">lastname</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="lastname"
            value={input.lastname}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs  mx-auto ">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs  mx-auto ">
          <div className="label">
            <span className="label-text">password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs  mx-auto ">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="phone"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            value={input.phone}
            onChange={ hdlChange }
          />
        </label>
        <div className="form-control w-full max-w-xs relative  mx-auto ">
  <div className="label">
    <span className="label-text">Gender</span>
  </div>
  <div className="relative inline-block w-full max-w-xs">
    <select
      className="input input-bordered appearance-none w-full max-w-xs pl-4 pr-8 py-2 rounded-lg cursor-pointer"
      name="gender"
      value={input.gender}
      onChange={hdlChange}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path
          className="heroicon-ui"
          d="M7.293 8.293a1 1 0 011.414 0L12 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        ></path>
      </svg>
    </div>
  </div>
</div>

        <div className="flex gap-5 ">
        <button type="submit" className="btn btn-outline btn-success mt-7 mx-auto block w-60">Submit</button>
      
        </div>
      </form>
    </div>
  );
}
