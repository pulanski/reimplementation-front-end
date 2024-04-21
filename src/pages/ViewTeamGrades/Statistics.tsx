// Statistics.tsx
import React from 'react';
import './grades.scss';

interface StatisticsProps {
  // Define any props here if needed
}

const Statistics: React.FC<StatisticsProps> = () => {
  return (
    <table style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead>
      <tr>
      <th style={{  padding: '10px' }} colSpan={2}><b></b></th>
        <th style={{  padding: '10px' }} colSpan={2}><b>Submitted Work</b></th>
        <th style={{  padding: '10px' }} colSpan={2}><b>Author Feedback</b></th>
        <th style={{  padding: '10px' }} colSpan={2}><b>Teammate Review</b></th>
      </tr>
    </thead>
    <tbody>

      <tr>
        
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <th style={{ padding: '10px' }} colSpan={2}><b>Contributor</b></th>
            <div>
              <a href="#">ssshah26</a>
              <span style={{ marginLeft: '10px' }}>(Siddharth Shah)</span>
            </div>
            <a href="#">show submission</a>
            </div>
        <td style={{ backgroundColor: '#f9f9f9', padding: '8px' }}><b>Average</b></td>
      </div>
        <td style={{ backgroundColor: '#f9f9f9', padding: '8px' }}><b>Range</b></td>
        <td style={{ backgroundColor: '#f9f9f9', padding: '8px' }}><b>Average</b></td>
        <td style={{ backgroundColor: '#f9f9f9', padding: '8px' }}><b>Range</b></td>
        <td style={{ backgroundColor: '#f9f9f9', padding: '8px' }}><b>Average</b></td>
        <td style={{ backgroundColor: '#f9f9f9', padding: '8px' }}><b>Range</b></td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  </table>

  
  );
};

export default Statistics;
