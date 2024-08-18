import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

function Dishes() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDishes = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/dishes/getDish');
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          setDishes(data);
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDishes();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
        <div className='mb-3'>
          <h1 className='text-white m-3'>Dishes</h1>
          <div className="d-flex w-100 justify-content-center flex-wrap gap-4">
            {dishes.map((dish, index) => (
              <Card  key={dish.id} name={dish.name} desc={dish.description} price={dish.price} image={dish.image}/>
            ))}
              {dishes.map((dish, index) => (
              <Card  key={dish.id} name={dish.name} desc={dish.description} price={dish.price} image={dish.image}/>
            ))}
              {dishes.map((dish, index) => (
              <Card  key={dish.id} name={dish.name} desc={dish.description} price={dish.price} image={dish.image}/>
            ))}
              {dishes.map((dish, index) => (
              <Card  key={dish.id} name={dish.name} desc={dish.description} price={dish.price} image={dish.image}/>
            ))}
              {dishes.map((dish, index) => (
              <Card  key={dish.id} name={dish.name} desc={dish.description} price={dish.price} image={dish.image}/>
            ))}
          </div>
        </div>
      );
}

export default Dishes