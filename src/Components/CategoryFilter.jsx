import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CategoryFilter = () => {
  const { state, setCategory } = useContext(AppContext);

  const categories = [
    'all',
    'DSA',
    'Web Development',
    'Machine Learning',
    'Database',
    'System Design',
    'React',
    'JavaScript'
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-bold text-lg mb-4 text-gray-800">
        📁 Categories
      </h3>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategory(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
              state.selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category === 'all'
              ? '🎯 All Topics'
              : `📚 ${category}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;