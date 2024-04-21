import React, { useState } from 'react';
import ReviewTableRow from './ReviewTableRow'; // Importing the ReviewTableRow component
import RoundSelector from './RoundSelector'; // Importing the RoundSelector component
import dummyDataRounds from './Data/heatMapData.json'; // Importing dummy data for rounds
import dummyauthorfeedback from './Data/authorFeedback.json'; // Importing dummy data for author feedback
import dummyData from './Data/dummyData.json'; // Importing dummy data
import { calculateAverages, getColorClass } from './utils'; // Importing utility functions
import './grades.scss'; // Importing styles
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import ShowSubmission from './ShowSubmission'; //importing show submission component
import { Button, Collapse } from 'react-bootstrap';
import ShowReviews from './ShowReviews'; //importing show reviews component

import temp from './Data/heatMapData.json';

// Functional component ReviewTable
const ReviewTable: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<number>(0); // State for current round
  const [sortOrderRow, setSortOrderRow] = useState<'asc' | 'desc' | 'none'>('none'); // State for row sort order
  const [showWordCount10, setShowWordCount10] = useState(false); // State for showing reviews with more than 10 words
  const [showWordCount20, setShowWordCount20] = useState(false); // State for showing reviews with more than 20 words
  const [showToggleQuestion, setShowToggleQuestion] = useState(false); // State for showing question column
  const [open, setOpen] = useState(false); 
  const [showReviews, setShowReviews] = useState(false);
  const [ShowAuthorFeedback, setShowAuthorFeedback] = useState(false);

  // Function to toggle the sort order for rows
  const toggleSortOrderRow = () => {
    setSortOrderRow((prevSortOrder) => {
      if (prevSortOrder === 'asc') return 'desc';
      if (prevSortOrder === 'desc') return 'none';
      return 'asc';
    });
  };

  // Calculating averages and sorting data based on the current round and sort order
  const currentRoundData = dummyDataRounds[currentRound];
  const { averagePeerReviewScore, columnAverages, sortedData } = calculateAverages(
    currentRoundData,
    sortOrderRow
  );

  // Function to handle round change
  const handleRoundChange = (roundIndex: number) => {
    setCurrentRound(roundIndex);
    setShowWordCount10(false);
    setShowWordCount20(false);
  };

  //function for show reviews
    //const [isVisible, setIsVisible] = useState<boolean>(false);
    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible);
    // };

    // Function to toggle the visibility of ShowReviews component
  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
  };


    // Function to toggle the visibility of ShowAuthorFeedback component
    const toggleAuthorFeedback = () => {
      setShowAuthorFeedback(!ShowAuthorFeedback);
    };

  const toggleShowQuestion = () => {
    setShowToggleQuestion(!showToggleQuestion);
  };


  // JSX rendering of the ReviewTable component
  return (
    
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Summary Report: Program 2</h2>
      <h5 className="text-xl font-semibold mb-1">Team: {dummyData.team}</h5>
      <h5 className="mb-4">
        Average peer review score:{" "}
        <span>{averagePeerReviewScore}</span>
      </h5>
      <div>Tagging: 97/97</div>
      <div>
        <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
          {open ? 'Hide Submission' : 'Show Submission'}
        </Button>

      {/* Collapsible content */}
      <Collapse in={open}>
        <div id="example-collapse-text">
          <br></br>

          {/* Render links only when open is true */}
          {open && (
            <>
              <a
                href="https://github.ncsu.edu/Program-2-Ruby-on-Rails/WolfEvents"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.ncsu.edu/Program-2-Ruby-on-Rails/WolfEvents
              </a>
              <br />
              <a
                href="http://152.7.177.44:8080/"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://152.7.177.44:8080/
              </a>
            </>
          )}
        </div>
      </Collapse>
      </div>

      <h4 className="text-xl font-semibold mb-1">Review (Round: {currentRound + 1} of {dummyDataRounds.length}) </h4>
      <br></br>
      <form>
        <input
          type="checkbox"
          id="wordCount10"
          name="wordCount10"
          checked={showWordCount10}
          onChange={(e) => setShowWordCount10(e.target.checked)}
        />
        <label htmlFor="wordCount10"> &nbsp; More than 10 words &nbsp;</label>
        <input
          type="checkbox"
          id="wordCount20"
          name="wordCount20"
          checked={showWordCount20}
          onChange={(e) => setShowWordCount20(e.target.checked)}
        />
        <label htmlFor="wordCount20"> &nbsp;More than 20 words</label>
        <input
          type="checkbox"
          id="toggleQuestion"
          name="toggleQuestion"
          checked={showToggleQuestion}
          onChange={toggleShowQuestion}
        />
        <label htmlFor="toggleQuestion"> &nbsp;Toggle Question</label>
      </form>
      <div className="table-container">
        <table className="tbl_heat">
          <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-center" style={{ width: '70px' }}>Question No.</th>
            {showToggleQuestion && (
                <th className="py-2 px-4 text-center" style={{ width: '150px' }}>Question</th>
              )}
            {Array.from({ length: currentRoundData[0].reviews.length }, (_, i) => (
              <th key={i} className="py-2 px-4 text-center" style={{ width: '70px' }}>{`Review ${i + 1}`}</th>
            ))}
            <th className="py-2 px-4" style={{ width: '70px' }} onClick={toggleSortOrderRow}>
              Avg
              {sortOrderRow === "none" && <span>▲▼</span>}
              {sortOrderRow === "asc" && <span> ▲</span>}
              {sortOrderRow === "desc" && <span> ▼</span>}
            </th>
            {showWordCount10 && <th className="py-2 px-4 text-center" style={{ width: '70px' }}>10+ Words</th>}
            {showWordCount20 && <th className="py-2 px-4 text-center" style={{ width: '70px' }}>20+ Words</th>}
          </tr>
          </thead>
          <tbody>
          {sortedData.map((row, index) => (
            <ReviewTableRow
              key={index}
              row={row}
              showWordCount10={showWordCount10}
              showWordCount20={showWordCount20}
              showToggleQuestion={showToggleQuestion}
            />
          ))}
          <tr className="no-bg">
            <td className="py-2 px-4" style={{ width: '70px' }}>Avg</td> {/* "Avg" header always in the first column */}
            {showToggleQuestion && <td></td>} {/* Add an empty cell if toggle question is shown */}
            {columnAverages.map((avg, index) => (
              <td key={index} className="py-2 px-4 text-center">
                {avg.toFixed(2)}
              </td>
            ))}
          </tr>
          </tbody>
        </table>
        <br></br>
        <RoundSelector currentRound={currentRound} handleRoundChange={handleRoundChange} />
      </div>
      <p className="mt-4">
        <h3>Grade and comment for submission</h3>
        Grade: {dummyData.grade}<br></br>
        Comment: {dummyData.comment}<br></br>
        Late Penalty: {dummyData.late_penalty}<br></br>
      </p>
      <div style={{ display: 'flex' }}>
        <div>
          <button onClick={toggleShowReviews}>
            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          </button>
          {showReviews && <ShowReviews data={dummyDataRounds} />}
        </div>

        <div>
          <button onClick={toggleAuthorFeedback}>
          {ShowAuthorFeedback ? 'Hide Author Feedback' : 'Show Author Feedback'}
          </button>
          {ShowAuthorFeedback && <ShowReviews data={dummyauthorfeedback} />}
        </div>
      </div>
    
      <Link to="/">Back</Link>
    </div>
  );
};

export default ReviewTable; // Exporting the ReviewTable component as default
