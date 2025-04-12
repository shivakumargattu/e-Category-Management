import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
import "../../styles/main.css"
import AuthContext from '../../context/AuthContext';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories', {
          headers: {
            'x-auth-token': token
          }
        });
        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  const handleAddCategory = (newCategory) => {
    setCategories([newCategory, ...categories]);
    setShowForm(false);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-list">
      {showForm ? (
        <CategoryForm 
          onAddCategory={handleAddCategory} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <button 
          className="btn btn-primary add-category-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Category
        </button>
      )}
      
      <div className="category-grid">
        {categories.map(category => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;