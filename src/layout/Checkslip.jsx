import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import uploadedSlip from '../image/1711610093035.jpg';

function CheckSlip() {
  const [tableDetails, setTableDetails] = useState(null);
  const [file, setFile] = useState(null);
  const [imageURL, setImageUrl] = useState('');
  const [slipData, setSlipData] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [autoCheckCompleted, setAutoCheckCompleted] = useState(false);
  const { id } = useParams();
  const {search} = window.location;
  const query = new URLSearchParams(search)
  const paymentStatusId = query.get('paymentStatusId');
  const reservationid = query.get('reservationId');
  const tableId = query.get('tableId');
  const userId = query.get('userId');
  const history = useNavigate();
  console.log('paymentStatusId:', paymentStatusId);
  console.log('reservationId:', reservationid);
  console.log('tableId:', tableId);
  console.log('userId:', userId);


  useEffect(() => {
    const fetchTableDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:7000/product/table/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTableDetails(response.data.table);
      } catch (error) {
        console.error('Error fetching table details:', error);
      }
    };

    fetchTableDetails();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };  
      reader.readAsDataURL(file);
    }
  };

  const uploadSlip = async (formData) => {
    try {
      const response = await axios.post(`http://localhost:7000/checkslip/checkslip`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading slip:', error);
      return ;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // ตรวจสอบการเลือกไฟล์
        if (!file) {
            alert('Please select a file.');
            return;
        }
  
        // สร้าง FormData object เพื่อส่งไปยัง API
        const formData = new FormData();
        formData.append('files', file);
  
        // Upload ไฟล์ Slip
        const response = await uploadSlip(formData);
  
        if (response && response.success) {
            alert('Slip uploaded successfully');
  
            // Update slipData state
            setSlipData(response);
  
            // ตรวจสอบการชำระเงินและสร้างการจอง
            const tablePrice = parseFloat(tableDetails.price);
            const slipAmount = parseFloat(response.data.amount);
  
            if (slipAmount >= tablePrice) {
                alert('Payment successful!');
                setPaymentSuccess(true);
                
                // สร้างการจอง
                createBooking(userId, tableId, reservationid, paymentStatusId);
            } else {
                alert('Your payment amount is incorrect. Please check your payment amount.');
                setPaymentSuccess(false);
            }
        } else {
            alert('ห้ามครับวีรพลห้ามนำรูปเข้าตรง Upload.');
        }
    } catch (error) {
        console.error('Error handling submit:', error);
        alert('An error occurred while processing the payment. Please try again.');
    }
};

const createBooking = async (userId, tableId, reservationId, paymentStatusId) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
          'http://localhost:7000/booking/booking',
          {
              userId: userId,
              tableId: tableId,
              reservationId: reservationId,
              paymentStatusId: paymentStatusId
          },
          {
              headers: { Authorization: `Bearer ${token}` }
          }
      );
      if (response.data.success) {
          alert('Booking history created successfully')
          setTimeout(() => {
            history('/bookinghistryuser');
          }, 15000)
      } else {
          alert('Failed to create booking history');
      }
  } catch (error) {
      console.error('Error creating booking history:', error);
      alert('An error occurred while creating booking history. Please try again.');
  }
};




  // useEffect(() => {
  //   if (slipData && !autoCheckCompleted) {
  //     const tablePrice = parseFloat(tableDetails.price).toFixed(2);
  //     const slipAmount = parseFloat(slipData.data.amount).toFixed(2);
  //     if (parseFloat(slipAmount) >= parseFloat(tablePrice)) {
  //       alert('Payment successful!');
  //       setPaymentSuccess(true);
  
  //       // Create booking
  //     } else {
  //       alert('Your payment amount is incorrect. Please check your payment amount.');
  //       setPaymentSuccess(false);
  //     }
  //     setAutoCheckCompleted(true);
  //   }
  // }, [slipData, tableDetails, autoCheckCompleted]);

  return (
    <div className='bg-gradient-to-br from-white to-slate-200 animate-gradient-x p-8'>
      <div className='flex flex-col items-center mt-9'>
        <div className='w-72 h-auto'>
          <img src={uploadedSlip} alt="Uploaded Slip" className='mx-auto my-auto' />
        </div>
        <h1 className='mt-4 text-xl font-bold'>Price: {tableDetails?.price} $</h1>

        <form className='mt-4' onSubmit={handleSubmit}>
          <div className='m-5'>
            <label htmlFor="uploadFile1" className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-20 py-2.5 outline-none rounded w-max cursor-pointer mx-auto block font-[sans-serif]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 fill-white inline" viewBox="0 0 32 32">
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000" />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000" />
              </svg>
              Upload
              <input type="file" id='uploadFile1' onChange={handleFileChange} accept="image/*" className="hidden" />
            </label>
          </div>

          <div className=' m-auto w-60 h-auto mb-8 '>
            {imageURL !== '' && <img src={imageURL} alt="Preview" />}
          </div>
          {slipData && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-1">
                <h2 className="text-lg font-bold mb-2">Sender Information</h2>
                <p><span className="font-bold">Name:</span> {slipData.data.sender.displayName}</p>
                <p><span className="font-bold">Account Type:</span> {slipData.data.sender.account.type}</p>
                <p><span className="font-bold">Bank Account Number:</span> {slipData.data.sender.account.value}</p>
              </div>
              <div className="mb-5">
                {paymentSuccess ? (
                  <>
                    <p><span className="font-bold">Slip status:</span> ✅</p>
                    <p><span className="font-bold">Time:</span> {slipData.data.transTime}</p>
                    <p><span className="font-bold">Date:</span> {slipData.data.transDate}</p>
                  </>
                ) : (
                  <>
                    <p><span className="font-bold">Slip status:</span> ❌</p>
                    <p><span className="font-bold">Time:</span> {slipData.data.transTime}</p>
                    <p><span className="font-bold">Date:</span> {slipData.data.transDate}</p>
                  </>
                )}
              </div>
              <h1>-----------------------------------------------------------------------------------------</h1>
              <div>
                <h2 className="text-lg font-bold mb-2">Receiver Information</h2>
                <p><span className="font-bold">Name:</span> {slipData.data.receiver.displayName}</p>
                <p><span className="font-bold">PromptPay Account Number:</span> {slipData.data.receiver.proxy.value}</p>
                <p className="font-bold text-2xl flex items-center">
                  <span className="mr-2">$</span>{slipData.data.amount}
                </p>
                <p><span className="font-bold">Transaction Number:</span> {slipData.data.qrcodeData}</p>
              </div>
            </div>
          )}

          <div className="payment-success">
            {paymentSuccess && (
              <div className="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm0 18.75A8.75 8.75 0 1 0 10 1.25a8.75 8.75 0 0 0 0 17.5zM7.938 9.062a1.06 1.06 0 0 1-1.5 0 1.062 1.062 0 0 1 0-1.5l3.25-3.25a1.06 1.06 0 0 1 1.5 1.5l-2.467 2.467 2.467 2.468a1.062 1.062 0 0 1-1.5 1.5l-3.25-3.25z" clip-rule="evenodd" />
                </svg>
                <h2 className="text-lg font-bold mb-4">Payment Successful!</h2>
                <p>Your table has been successfully paid.</p>
              </div>
            )}
          </div>

          <button type="submit" className='block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded'>
            Check Slip
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckSlip;
