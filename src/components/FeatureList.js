import React, { useState, useEffect } from 'react';
import api from '../api';
import FeatureItem from './FeatureItem';
import Paginator from './Paginator';
import '../styles/FeatureListStyles.scss';

const FeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [visibleItems, setVisibleItems] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1000);
  const [newItemsPerPage, setNewItemsPerPage] = useState(itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    fetchFeatures(1, filter, itemsPerPage);
  }, [filter, itemsPerPage]);

  useEffect(() => {
    fetchFeatures(currentPage, filter, itemsPerPage);
  }, [currentPage, filter, itemsPerPage]);

  const fetchFeatures = async (page, perPage, filterValue) => {
    try {
      const response = await api.getFeatures(page, perPage, filterValue);
      const { data, pagination } = response;
      setFeatures(data);
      setTotalItems(pagination.total);
      setVisibleItems(pagination.per_page);
      setTotalPages(Math.ceil(pagination.total / pagination.per_page));
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };
  
  const handlePageChange = async (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleItemsPerPageChange = (event) => {
    const value = Number(event.target.value);
    setNewItemsPerPage(value);
  };

  const applyItemsPerPageChange = () => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    fetchFeatures(1, filter, newItemsPerPage);
  };

  return (
    <div>
      <h1>Earthquake</h1>
      <div style={{ textAlign: 'center' }}>
        <label htmlFor="magTypeFilter">Filter by mag_type:</label>
        <select id="magTypeFilter" value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="md">md</option>
          <option value="ml">ml</option>
          <option value="ms">ms</option>
          <option value="mw">mw</option>
          <option value="me">me</option>
          <option value="mi">mi</option>
          <option value="mb">mb</option>
          <option value="mlg">mlg</option>
        </select>
        <br></br>
        <label htmlFor="itemsPerPage">Items per page:</label>
        <input
          type="number"
          id="itemsPerPage"
          min="1"
          max="1000"
          value={newItemsPerPage}
          onChange={handleItemsPerPageChange}
        />
        <button onClick={applyItemsPerPageChange}>Ver</button>
      </div>     
      <div style={{ textAlign: 'center' }}>
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          visibleItems={visibleItems}
          totalItems={totalItems}
        />
      </div>
      <ul>
        {features.map((feature) => (
          <FeatureItem key={feature.id} feature={feature} />
        ))}
      </ul>

    </div>
  );
};

export default FeatureList;
