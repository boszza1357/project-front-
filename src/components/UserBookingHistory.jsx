import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

function UserBookingHistory() {
  const [userBookings, setUserBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (searchTerm !== '') {
          const response = await axios.get(`http://localhost:7000/search/bookings?type=${searchTerm}`);
          setSearchResults(response.data);
        } else {
          // If searchTerm is empty, reset searchResults to userBookings
          setSearchResults(userBookings);
        }
      } catch (error) {
        console.error('Error searching bookings:', error);
      }
    }

    fetchData();
  }, [searchTerm, userBookings]);

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:7000/booking/getbookings', {
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUserBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="overflow-x-auto">
      <div className=' p-4 flex items-center justify-center'>
      <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by booking type..."
        style={{ width: "700px" }}
        className="p-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
       <svg className="absolute right-0 top-1/2 transform -translate-y-1/2 h-10 w-14 text-zinc-900 mr-1 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => handleSearch(searchTerm)}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
      </div>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Reservation Date and Time</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Number of Guests</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Payment Status</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Booking Date</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Table Name</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Price</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Table number</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Capacity</th>
            <th className="px-2 py-1 bg-gray-100 border border-gray-200">Nots</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(booking => (
            <tr key={booking.booking_id} className="text-center">
              <td className="px-2 py-1 border border-gray-200">{format(new Date(booking.reservationDateTime), 'yyyy-MM-dd //.HH:mm')}</td>
              <td className="px-2 py-1 border border-gray-200">{booking.reservation.numberofGugest}</td>
              <td className="px-2 py-1 border border-gray-200 bg-green-600 text-black">{booking.paymentstatusid.statusmoney}</td>
              <td className="px-2 py-1 border border-gray-200">{format(new Date(booking.reservation.bookingDate), 'yyyy-MM-dd')}</td>
              <td className="px-2 py-1 border border-gray-200">{booking.tables.type}</td>
              <td className="px-2 py-1 border border-gray-200">{booking.paymentstatusid.price} $</td>
              <td className="px-2 py-1 border border-gray-200">{booking.tables.tableNumber}</td>
              <td className="px-2 py-1 border border-gray-200">{booking.tables.capacity}</td>
              <td className="px-2 py-1 border border-gray-200">{booking.tables.nots}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserBookingHistory;
