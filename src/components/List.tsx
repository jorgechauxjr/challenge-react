import React, { useState } from 'react';
import type { Item } from '../types';
import './list.css';

const List: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [filterText, setFilterText] = useState<string>("");


  const handleChange = async (event: any) => {
    try {
      setFilterText(event.target.value);

      const response = await fetch(`https://api.disneyapi.dev/character?name=${filterText}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const jsonData = await response.json();
      const list: Item[] = jsonData?.data?.length > 0 ? jsonData?.data : [];
      setData(list);
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Error')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Personajes de Disney</h1>
      </header>
      
      <div className="filters">
        <div className="filter-group">
          <label className="label" htmlFor="text-filter">Buscar por nombre: </label>
          <input
            id="text-filter"
            type="text"
            value={filterText}
            onChange={handleChange}
            placeholder="Buscar..."
            className="input"
          />
        </div>
      </div>
      
      <div className="results-count">
        Se encontraron {data?.length} personajes
      </div>
      
      <ul className="list">
        {data?.map(item => (
          <li key={item?._id} className="card">
            <img src={item?.imageUrl} width={100} height={100}/>
            <h3 className="title">{item?.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;