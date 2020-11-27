import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';
import './index.html';
import { categories } from './categories.js';

const App = () => {
  const [category, setCategory] = useState('Accomodation');
  const [editMode, setEditMode] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(null);
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    console.log(userFilter);
    const userFilteredCategories = categories
      .filter((item) => {
        return item.name.toUpperCase().includes(userFilter.toUpperCase());
      })
      .map((item) => (
        <div
          key={item.name}
          value={item.name}
          onClick={() => {
            setEditMode(false);
            setCategory(item.categories);
          }}
        >
          {item.name}
        </div>
      ));
    setFilteredCategories(userFilteredCategories);
  }, [userFilter]);

  return (
    <div className="container">
      <div className="country-info">
        {/* 1. nejdřív jde vidět div s jednou zemí, div options, input text uživ. filtr jsou schované
2. kliknu do divu s jednou zemí, schová se div s jednou zemí, objeví se input text
3. uživatel píše do input textu, na změnu textu (on change) se mění seznam států (div options)
4. uživatel klikne na stát, ten se objeví v divu země, schová se zbytek */}
        <form className="country-data">
          <div>
            {!editMode && (
              <div class="country-selected" onClick={() => setEditMode(true)}>
                vybrano je: {category}
              </div>
            )}

            {editMode && (
              <input
                type="text"
                placeholder="Enter category"
                onChange={(e) => {
                  setUserFilter(e.target.value);
                }}
              />
            )}
          </div>
          {editMode && <div className="country-list">{filteredCategories}</div>}
        </form>
      </div>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
