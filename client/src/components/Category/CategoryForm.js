import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/main.css';
const CategoryForm = ({ onAddCategory, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    itemCount: 0,
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const { name, itemCount } = formData;

  const onChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !formData.image) {
      setError('Name and image are required');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('itemCount', itemCount);
      formDataToSend.append('image', formData.image);

      const res = await axios.post('/api/categories', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onAddCategory(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating category');
    }
  };

  return (
    <div className="category-form">
      <h3>Add New Category</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Item Count</label>
          <input
            type="number"
            name="itemCount"
            value={itemCount}
            onChange={onChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Category Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={onChange}
            required
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;