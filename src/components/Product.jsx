import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Product() {
  const [tableDetails, setTableDetails] = useState(null);
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

  if (!tableDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-yellow-300 to-pink-400 p-8 flex items-center justify-center">
      <div className="max-w-4xl bg-white shadow-md rounded-md p-8">
        <div className="bg-gray-100 p-8 flex items-center justify-center">
          <div className="max-w-4xl bg-white shadow-md rounded-md p-8">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/3 pr-8 mb-8 lg:mb-0">
               
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-96 h-auto mt-24">
                  {tableDetails.image.map((image) => (
                    <div key={image.image_id} >
                      <img 
                        src={`http://localhost:7000/${image.path}`} 
                        alt={`Image ${image.image_id}`}
                        className="w-full rounded-md shadow-md "/>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-center">
                <h1 className="text-3xl font-bold mb-4">Table Details</h1>
                <div className="bg-white shadow-md rounded-md p-4 mb-8">
<p className='text-lg font-semibold hover:text-blue-500 transition-colors'>Table Type: {tableDetails.type}</p>
<p className="text-lg font-semibold text-green-500 hover:text-green-600 transition-colors duration-300">Table Number: {tableDetails.tableNumber}</p>
<p className="text-lg font-semibold text-gray-500 hover:text-gray-600 transition-colors duration-300">Capacity: {tableDetails.capacity}</p>
<p className="text-lg font-semibold text-yellow-500 hover:text-yellow-600 transition-colors duration-300">Price: {tableDetails.price} $</p>
<p className="text-lg font-semibold text-blue-500 hover:text-blue-600 transition-colors duration-300">Notes: {tableDetails.nots}</p>
<p className="text-lg font-semibold text-red-500 hover:text-red-600 transition-colors duration-300">Status: {tableDetails.status}</p>
                </div>
                <Link to={`/reserve/${id}`} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full text-center">
                    Reserve Table</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
