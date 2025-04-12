import React from 'react';
import '../../styles/main.css';

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-image">
        <img 
          src={category.image} 
          alt={category.name} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="category-info">
        <h3>{category.name}</h3>
        <p>{category.itemCount} items</p>
      </div>
    </div>
  );
};

export default CategoryCard;