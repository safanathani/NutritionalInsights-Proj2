import './App.css';
import React, { useState, useEffect } from 'react';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import ScatterPlot from './components/ScatterPlot';
import Heatmap from './components/Heatmap';

function App() {
  const API_BASE = 'https://2mvh4pgl1g.execute-api.us-east-2.amazonaws.com';

  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState({
    dietTypes: [],
    proteinContent: [],
    carbsContent: [],
    fatContent: [],
    recipeDistribution: []
  });

  const [recipes, setRecipes] = useState([]);
  const [clusters, setClusters] = useState([]);

  const [status, setStatus] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('All Diet Types');

  const loadInitialInsights = async () => {
    try {
      const response = await fetch(`${API_BASE}/nutritional-insights`);
      const result = await response.json();

      const parsed =
        result.body && typeof result.body === 'string'
          ? JSON.parse(result.body)
          : result;

      setData({
        dietTypes: parsed.dietTypes || [],
        proteinContent: parsed.proteinContent || [],
        carbsContent: parsed.carbsContent || [],
        fatContent: parsed.fatContent || [],
        recipeDistribution: parsed.recipeDistribution || []
      });
    } catch (error) {
      console.error('Initial load error:', error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${API_BASE}/nutritional-insights`);
      const result = await response.json();

      const parsed =
        result.body && typeof result.body === 'string'
          ? JSON.parse(result.body)
          : result;

      setData({
        dietTypes: parsed.dietTypes || [],
        proteinContent: parsed.proteinContent || [],
        carbsContent: parsed.carbsContent || [],
        fatContent: parsed.fatContent || [],
        recipeDistribution: parsed.recipeDistribution || []
      });

      setCurrentPage(1);
      setStatus('Nutritional insights loaded successfully.');
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching insights:', error);
      setStatus('Error loading nutritional insights.');
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  const getRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE}/recipes`);
      const result = await response.json();

      const parsed =
        result.body && typeof result.body === 'string'
          ? JSON.parse(result.body)
          : result;

      setRecipes(parsed.recipes || []);
      setCurrentPage(2);
      setStatus('Recipes loaded successfully.');
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setStatus('Error loading recipes.');
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  const getClusters = async () => {
    try {
      const response = await fetch(`${API_BASE}/clusters`);
      const result = await response.json();

      const parsed =
        result.body && typeof result.body === 'string'
          ? JSON.parse(result.body)
          : result;

      setClusters(parsed.clusters || []);
      setCurrentPage(3);
      setStatus('Clusters loaded successfully.');
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching clusters:', error);
      setStatus('Error loading clusters.');
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    loadInitialInsights();
  }, []);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredIndexes = data.dietTypes
    .map((diet, index) => ({ diet, index }))
    .filter(({ diet }) => {
      const matchesSearch = diet.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDropdown =
        selectedDiet === 'All Diet Types' ||
        diet.toLowerCase() === selectedDiet.toLowerCase();

      return matchesSearch && matchesDropdown;
    })
    .map(({ index }) => index);

  const filteredData = {
    dietTypes: filteredIndexes.map((i) => data.dietTypes[i]),
    proteinContent: filteredIndexes.map((i) => data.proteinContent[i]),
    carbsContent: filteredIndexes.map((i) => data.carbsContent[i]),
    fatContent: filteredIndexes.map((i) => data.fatContent[i]),
    recipeDistribution: filteredIndexes.map((i) => data.recipeDistribution[i])
  };

  const renderPageContent = () => {
    if (currentPage === 1) {
      return (
        <section className="section">
          <h2>Explore Nutritional Insights</h2>

          <div className="card-grid">
            <div className="card">
              <h3>Bar Chart</h3>
              <p>Average macronutrient content by diet type.</p>
              <BarChart data={filteredData} />
            </div>

            <div className="card">
              <h3>Scatter Plot</h3>
              <p>Nutrient relationships (e.g., protein vs carbs).</p>
              <ScatterPlot data={filteredData} />
            </div>

            <div className="card">
              <h3>Heatmap</h3>
              <p>Nutrient intensity by diet type.</p>
              <Heatmap data={filteredData} />
            </div>

            <div className="card">
              <h3>Pie Chart</h3>
              <p>Recipe distribution by diet type.</p>
              <PieChart data={filteredData} />
            </div>
          </div>
        </section>
      );
    }

    if (currentPage === 2) {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <section className="section">
          <h2>Recipes</h2>

          <div className="card-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <div className="card" key={index}>
                  <h3>Recipe {index + 1}</h3>
                  <p>{recipe}</p>
                </div>
              ))
            ) : (
              <div className="card">
                <h3>No Matching Recipes</h3>
                <p>Try a different search term or click "Get Recipes".</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    if (currentPage === 3) {
      const filteredClusters = clusters.filter((cluster) =>
        cluster.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return (
        <section className="section">
          <h2>Clusters</h2>

          <div className="card-grid">
            {filteredClusters.length > 0 ? (
              filteredClusters.map((cluster, index) => (
                <div className="card" key={index}>
                  <h3>Cluster {index + 1}</h3>
                  <p>{cluster}</p>
                </div>
              ))
            ) : (
              <div className="card">
                <h3>No Matching Clusters</h3>
                <p>Try a different search term or click "Get Clusters".</p>
              </div>
            )}
          </div>
        </section>
      );
    }
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Nutritional Insights</h1>
      </header>

      <main className="main-content">
        {renderPageContent()}

        <section className="section">
          <h2>Filters and Data Interaction</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Search by Diet Type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
            >
              <option>All Diet Types</option>
              <option>Keto</option>
              <option>Mediterranean</option>
              <option>Vegan</option>
              <option>Dash</option>
              <option>Paleo</option>
            </select>
          </div>
        </section>

        <section className="section">
          <h2>API Data Interaction</h2>

          <div className="button-row">
            <button className="blue-btn" onClick={fetchInsights}>
              Get Nutritional Insights
            </button>

            <button className="green-btn" onClick={getRecipes}>
              Get Recipes
            </button>

            <button className="purple-btn" onClick={getClusters}>
              Get Clusters
            </button>
          </div>

          {status && (
            <div style={{ marginTop: '15px' }}>
              <p><b>Status:</b> {status}</p>
              <p><b>Last Updated:</b> {lastUpdated}</p>
            </div>
          )}
        </section>

        <section className="section">
          <h2>Pagination</h2>

          <div className="pagination">
            <button onClick={goToPreviousPage}>Previous</button>

            <button
              className={currentPage === 1 ? 'active-page' : ''}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>

            <button
              className={currentPage === 2 ? 'active-page' : ''}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>

            <button
              className={currentPage === 3 ? 'active-page' : ''}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>

            <button onClick={goToNextPage}>Next</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 Nutritional Insights. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;