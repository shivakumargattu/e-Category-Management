import React, { useContext } from 'react';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import CategoryList from '../components/Category/CategoryList';
import '../styles/main.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="header">
            <h1>Category Management</h1>
            <button className="btn btn-primary">+ Add Category</button>
          </div>
          <CategoryList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;