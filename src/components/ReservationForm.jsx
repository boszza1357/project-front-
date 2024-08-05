import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ReservationForm() {
  const [tableDetails, setTableDetails] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!numberOfGuests || !bookingDate) {
      alert('Please select number of guests and booking date.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:7000/reservationstable/reservations', {
        tableId: tableDetails.table_id,
        numberOfGuests: numberOfGuests,
        bookingDate: bookingDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Reservation created successfully");

      navigate(`/payment/${id}`); // ใช้ id ในการเรียกหน้า PaymentPage
      console.log(response.data);
    } catch (err) {
      console.error('Error creating reservation:', err);
    }
  };

  if (!tableDetails) {
    return <div>Loading...</div>;
  }

  const guestOptions = [];
  for (let i = 1; i <= tableDetails.capacity; i++) {
    guestOptions.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div className="bg-gradient-to-br from-sky-700 to-slate-400 animate-gradient-x p-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Table Details</h2>
        <div className="m-1 w-96 h-auto">
          {tableDetails.image.map((image) => (
            <div key={image.image_id} >
              <img
                src={`http://localhost:7000/${image.path}`}
                alt={`Image ${image.image_id}`}
                className="w-full rounded-md shadow-md "
              />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-lg font-semibold">Table Number: {tableDetails.tableNumber}</p>
          <p className="text-lg font-semibold">Capacity: {tableDetails.capacity}</p>
          <p className="text-lg font-semibold">Price: {tableDetails.price} $</p>
        </div>
        <hr className="my-8 border-t border-gray-300" />
        <h2 className="text-2xl font-bold my-4">Reservation Form</h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="numberOfGuests" className="text-lg font-semibold">Number of Guests:</label>
            <select
              id="numberOfGuests"
              value={numberOfGuests}
              onChange={(event) => setNumberOfGuests(event.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select number of guests</option>
              {guestOptions}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="bookingDate" className="text-lg font-semibold">Booking Date:</label>
            <input
              type="date"
              id="bookingDate"
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full text-center">
            Confirm Reservation
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
