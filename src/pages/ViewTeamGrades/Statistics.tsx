// Statistics.tsx
import React,{useState} from 'react';
import './grades.scss';
import CircularProgress  from './CircularProgress';
import ShowReviews from './ShowReviews'; //importing show reviews component
import dummyDataRounds from './Data/heatMapData.json'; // Importing dummy data for rounds
import dummyauthorfeedback from './Data/authorFeedback.json'; // Importing dummy data for author feedback


interface StatisticsProps {
  // Define any props here if needed
  average:string;
}


const Statistics: React.FC<StatisticsProps> = ({average}) => {

  const [statisticsVisible, setstatisticsVisible] = useState<boolean>(false);
  const toggleStatisticsVisibility = () => {
      setstatisticsVisible(!statisticsVisible);
  };
  const [showReviews, setShowReviews] = useState(false);
  const [ShowAuthorFeedback, setShowAuthorFeedback] = useState(false);

  // Function to toggle the visibility of ShowReviews component
  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
  };

    // Function to toggle the visibility of ShowAuthorFeedback component
    const toggleAuthorFeedback = () => {
      setShowAuthorFeedback(!ShowAuthorFeedback);
    };

  const headerCellStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'center',
    
  };

  let totalReviewsForQuestion1: number = 0;
  dummyDataRounds.forEach(round => {
    round.forEach(question => {
      if (question.questionNumber === "1") {
        totalReviewsForQuestion1 += question.reviews.length;
      }
    });
  });

  let totalfeedbackForQuestion1: number = 0;
  dummyauthorfeedback.forEach(round => {
    round.forEach(question => {
      if (question.questionNumber === "1") {
        totalfeedbackForQuestion1 += question.reviews.length;
      }
    });
  });


  const subHeaderCellStyle: React.CSSProperties = {
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <div>
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
                {/* <a href="#">show submission </a><span>(E2425)</span> */}
              </div>
            </td>
            <td style={subHeaderCellStyle}>
              <div style={{textAlign: 'center' }}>
                <div>{average}</div>
                <a href="#" onClick={(e) => { e.preventDefault(); toggleShowReviews(); }}>
                    {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                </a><span>({totalReviewsForQuestion1})</span>
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
                <a href="#" onClick={(e) => { e.preventDefault(); toggleAuthorFeedback(); }}>
                    {ShowAuthorFeedback ? 'Hide Author Feedback' : 'Show Author Feedback'}
                </a><span>({totalfeedbackForQuestion1})</span>
              </div>
              <div>
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
    <div>
        {showReviews && (
          <div>
            <h2>Reviews</h2>
            <ShowReviews data={dummyDataRounds} />
          </div>
        )}
        {ShowAuthorFeedback && (
          <div>
            <h2>Author Feedback</h2>
            <ShowReviews data={dummyauthorfeedback} />
          </div>
        )}
      </div>
   </div> 
  );
  
};

export default Statistics;
