import React from 'react';

interface Car {
  model: string;
  mpg: number;
  cyl: number;
  // ... other properties
}

interface CarListProps {
  cars: Car[];
}

const CarList: React.FC<CarListProps> = ({ cars }) => (
  <ul>
    {cars.map((car, index) => (
      <li key={index}>
        {car.model} - MPG: {car.mpg}
      </li>
    ))}
  </ul>
);

export default CarList;