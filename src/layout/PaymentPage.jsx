import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // เปลี่ยนจาก useHistory เป็น useNavigate
import { format } from 'date-fns';

function PaymentPage() {
  const [tableDetails, setTableDetails] = useState(null);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const { id } = useParams(); 
  const navigate = useNavigate(); // เปลี่ยนจาก useHistory เป็น useNavigate
  console.log('reservationDetails',reservationDetails)
  console.log('paymentStatus',paymentStatus)
  console.log('tableDetails',tableDetails)


  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); 

      // Fetch reservation details
      const reservationResponse = await axios.get(`http://localhost:7000/reservationstable/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setReservationDetails(reservationResponse.data);

      // Fetch payment status
      const paymentResponse = await axios.get(`http://localhost:7000/payment/payment/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setPaymentStatus(paymentResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchTableDetails = async () => {
    try {
      const token = localStorage.getItem('token'); 

      // Fetch table details
      const response = await axios.get(`http://localhost:7000/product/table/${id}`, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setTableDetails(response.data.table);
    } catch (err) {
      console.error('Error fetching table details:', err);
    }
  };

  useEffect(() => {
    fetchTableDetails();
  }, [id]);
  
  useEffect(() => {
    setTableDetails(null);
    setReservationDetails(null);
    setPaymentStatus(null);
    setShowQRCode(false);
  }, [id]);

  const handleProceedToPayment = async () => {
    try {
      await fetchData();
      await fetchTableDetails();
  
      console.log('Payment Status:', paymentStatus);
      console.log('Reservation Details:', reservationDetails);
      console.log('Table Details:', tableDetails);
  
      console.log('Navigating to CheckSlip with params:', id);
      if (paymentStatus && reservationDetails && tableDetails) {
        console.log('All required details are available. Proceeding to payment...');
        navigate(`/checkslip/${id}?paymentStatusId=${paymentStatus?.paymentstatus_id}&reservationId=${reservationDetails?.reservationid}&tableId=${tableDetails?.table_id}&userId=${reservationDetails?.user_id}`);
      } else {
        console.error('One or more of the required details is missing.');
      }
    } catch (error) {
      console.error('Error handling proceed to payment:', error);
      alert('An error occurred while processing the payment. Please try again.');
    }
  };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 to-pink-400">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Product Name:</span>
          <span className="text-lg font-semibold">{tableDetails?.type}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Table Number:</span>
          <span className="text-lg font-semibold"> {tableDetails?.tableNumber}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Capacity:</span>
          <span className="text-lg font-semibold">  {tableDetails?.capacity}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Notes: </span>
          <span className="text-lg font-semibold">  {tableDetails?.nots}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Booking Date:</span>
          <span className="text-lg font-semibold">{reservationDetails?.bookingDate ? format(new Date(reservationDetails?.bookingDate), 'yyyy-MM-dd ') : ''}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Number of Guests:</span>
          <span className="text-lg font-semibold">{reservationDetails?.numberofGugest}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Payment Status:</span>
          <span className="text-lg font-semibold">{paymentStatus?.statusmoney}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Status:</span>
          <span className="text-lg font-semibold">  {tableDetails?.status}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Price:</span>
          <span className="text-lg font-semibold">$ {tableDetails?.price}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Quantity:</span>
          <span className="text-lg font-semibold">1</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg">Total:</span>
          <span className="text-lg font-semibold">$ {tableDetails?.price}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-end">
          <button onClick={handleProceedToPayment} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
