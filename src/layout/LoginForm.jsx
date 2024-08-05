import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // เพิ่ม import useNavigate
import weerapon from '../image/dd.jpg'

export default function LoginForm() {
  const { setUser } = useAuth();
  const navigate = useNavigate(); // ใช้ hook useNavigate

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }));
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault();

      // ตรวจสอบว่าใส่อีเมล์หรือไม่
      if (!input.email) {
        alert("Please enter your email.");
        return;
      }

      // ตรวจสอบว่าใส่รหัสผ่านหรือไม่
      if (!input.password) {
        alert("Please enter your password.");
        return;
      }

      // validation
      const rs = await axios.post('http://localhost:7000/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:7000/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });
      console.log(rs1.data);
      setUser(rs1.data);

      // หลังจากล็อกอินสำเร็จ นำทางไปยังหน้าที่เหมาะสำหรับผู้ใช้ที่ล็อกอินอยู่
      navigate('/'); // แก้เป็นเส้นทางที่เหมาะสำหรับผู้ใช้ที่ล็อกอินอยู่
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('Email และ password ผิดพลาดกรุณาตรวจสอบอีกครั้ง'); // เตือนเมื่อไอดีหรือรหัสผ่านไม่ถูกต้อง
      } else {
        console.log(err.message);
      }
    }
  }

  return (
    <div className='absolute inset-0 bg-purple-300'>
    <div  style={{ 
      backgroundImage: `url(${weerapon}) `,
      width : 'auto',
      height: '510px', // ปรับความสูงตามต้องการ
      backgroundSize : 'contain',
      backgroundRepeat: 'no-repeat', // ป้องกันการทำซ้ำ
      backgroundPosition: 'center',
    }}>
    <div className="p-5 w-4/6 min-w-[500px] mx-auto rounded mt-11  ">
      <div className="text-3xl mb-5 text-center text-white ">Please Login</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
      <label className="form-control w-full max-w-xs mx-auto mt-10">
  <div className="label">
    <span className="label-text text-white">Email</span>
  </div>
  <input
    type="text"
    className="input input-bordered w-full max-w-xs bg-violet-600 text-black placeholder-white focus:ring-2 focus:ring-purple-700 focus:border-transparent" // ปรับสีพื้นหลังและข้อความ
    name="email"
    value={input.email}
    onChange={hdlChange}
    style={{ backgroundColor: 'rgba(101, 50, 165, 0.3)' }} // เพิ่มสีพื้นหลังโดยใช้ opacity
  />
</label>
<label className="form-control w-full max-w-xs mx-auto mt-4">
  <div className="label">
    <span className="label-text text-white">password</span> {/* เปลี่ยนสีข้อความเป็นสีขาว */}
  </div>
  <input
    type="password"
    className="input input-bordered w-full max-w-xs bg-violet-600 text-black placeholder-white focus:ring-2 focus:ring-purple-700 focus:border-transparent" // เพิ่มสีพื้นหลัง, เพิ่มเอฟเฟกต์เมื่อโฟกัส
    name="password"
    value={input.password}
    onChange={hdlChange}
    style={{ backgroundColor: 'rgba(101, 50, 165, 0.3)' }} // เพิ่มสีพื้นหลังโดยใช้ opacity
  />
</label>


        <div className="flex gap-5 ">
          <button type="submit" className="btn btn-outline btn-success mt-7 mx-auto block w-80">Login</button>
        </div>
        <div className="text-center mt-2 text-black">
  Don't have an account? <button className="text-white underline" onClick={() => navigate('/register')}>Register here</button>
</div>
      </form>
    </div>
    </div>
    </div>
  );
}
