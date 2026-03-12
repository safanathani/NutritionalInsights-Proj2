import React from "react";

function Heatmap({ data }) {
  const dietTypes = data?.dietTypes || [];
  const proteinContent = data?.proteinContent || [];
  const carbsContent = data?.carbsContent || [];
  const fatContent = data?.fatContent || [];

  const nutrients = ["Protein", "Carbs", "Fat"];

  const values = dietTypes.map((diet, index) => [
    proteinContent[index] || 0,
    carbsContent[index] || 0,
    fatContent[index] || 0
  ]);

  const maxValue = Math.max(
    ...proteinContent,
    ...carbsContent,
    ...fatContent,
    1
  );

  const getCellColor = (value) => {
    const intensity = value / maxValue;
    const alpha = 0.15 + intensity * 0.7;
    return `rgba(37, 99, 235, ${alpha})`;
  };

  return (
    <div className="heatmap-container">
      <table className="heatmap-table">
        <thead>
          <tr>
            <th>Diet</th>
            {nutrients.map((nutrient) => (
              <th key={nutrient}>{nutrient}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dietTypes.map((diet, rowIndex) => (
            <tr key={diet}>
              <td>{diet}</td>
              {values[rowIndex].map((value, colIndex) => (
                <td
                  key={colIndex}
                  style={{ backgroundColor: getCellColor(value) }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Heatmap;