import React, { useState } from 'react';
import axios from 'axios';
import CarList from './CarList';

interface Car {
    model: string;
    mpg: number;
    cyl: number;
    hp: number;
    vs: number;
  }

interface CarSearchProps {
  onSearch: (cars: Car[]) => void;
}

const CarSearch: React.FC<CarSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [models, setModels] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/cars');
      const cars = response.data as Car[];
      const filteredCars = cars.filter(car =>
        car.model.toLowerCase().includes(query.toLowerCase()) && car.vs === 0 && car.hp > 50
      );
      onSearch(filteredCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
};

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <button onClick={handleSearch}>Search</button>
      <CarList cars={[]} />
    </div>
  );
};

export default CarSearch;