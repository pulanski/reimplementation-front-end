// Statistics.tsx
import React,{useState} from 'react';
import './grades.scss';
import CircularProgress  from './CircularProgress';

interface StatisticsProps {
  // Define any props here if needed
  average:string;
}


const Statistics: React.FC<StatisticsProps> = ({average}) => {

  const [statisticsVisible, setstatisticsVisible] = useState<boolean>(false);
  const toggleStatisticsVisibility = () => {
      setstatisticsVisible(!statisticsVisible);
  };

  const headerCellStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'center',
    
  };

  const subHeaderCellStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'center',
  };

  return (
    
    <table style={{ width: '90%', borderCollapse: 'collapse' }}>
      <thead>
      <a href="#" onClick={toggleStatisticsVisibility}>
        {statisticsVisible ? 'hide stats' : 'show stats'}
      </a>
      {statisticsVisible && (
     <tr>
     <th style={headerCellStyle}>Stats</th>
     <th style={headerCellStyle} colSpan={2}>Image</th>
     <th style={headerCellStyle} colSpan={2}></th>
     <th style={headerCellStyle} colSpan={2}>Not Shown</th>
     <th style={headerCellStyle}><CircularProgress size={70} progress={75} strokeWidth={10} /></th>
   </tr>
      )}
        <tr>
          <th style={headerCellStyle}></th>
          <th style={headerCellStyle} colSpan={2}>Submitted Work</th>
          <th style={headerCellStyle} colSpan={2}>Author Feedback</th>
          <th style={headerCellStyle} colSpan={2}>Teammate Review</th>
          <th style={headerCellStyle}></th>
        </tr>
        <tr>
          <th style={subHeaderCellStyle}>Contributor</th>
          <th style={subHeaderCellStyle}>Average</th>
          <th style={subHeaderCellStyle}>Range</th>
          <th style={subHeaderCellStyle}>Average</th>
          <th style={subHeaderCellStyle}>Range</th>
          <th style={subHeaderCellStyle}>Average</th>
          <th style={subHeaderCellStyle}>Range</th>
          <th style={subHeaderCellStyle}>Final Score</th>
        </tr>
        <tr>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <a href="#">ssshah26 </a><span>(Siddharth Shah)</span>
                <br />
                <a href="#">show submission </a><span>(E2425)</span>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>{average}</div>
                <a href="#">show reviews </a><span>(11)</span>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>9999% - N/A%</div>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>96.67%</div>
                <a href="#">show author feedback </a><span>(6)</span>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>87% - 100%</div>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>---</div>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
              <div>---</div>
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>0.00%</div>
                <div>(in Finished)</div>
              </div>
            </td>
          </tr>
      </thead>
      <tbody>
      
      </tbody>
    </table>
  );
  
};

export default Statistics;
