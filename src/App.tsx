import React from 'react';
import './App.css';
import CarSearch from './CarSearch';

const App: React.FC = () => {
  const handleSearch = (cars: any[]) => {
    // Handle the search result
    console.log('Search result:', cars);
  };

  return (
    <div className="App">
      <CarSearch onSearch={handleSearch} />
    </div>
  );
};

export default App;