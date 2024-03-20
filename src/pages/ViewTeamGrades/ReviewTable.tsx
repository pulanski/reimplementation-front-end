import React, { useState } from 'react';
import ReviewTableRow from './ReviewTableRow';
import RoundSelector from './RoundSelector';
import { dummyDataRounds} from './dummyData';
import { calculateAverages, getColorClass } from './utils';
import './grades.scss';
<<<<<<< Updated upstream
import ShowSubmission from './ShowSubmission'; // Import the ShowSubmission component
import { Link } from 'react-router-dom';

interface ReviewData {
  questionNumber: string;
  questionText: string; // New property to hold the question text
  reviews: { score: number; comment?: string }[];
  RowAvg: number;
  maxScore: number;
}

const dummyData: ReviewData[] = [
  {
    questionNumber: '1',
    questionText: 'What is the main purpose of this feature?',
    reviews: [
      { score: 5, comment: 'Great explanation!' },
      { score: 4, comment: 'Good, but could be clearer' },
      { score: 4 },
      { score: 4 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 2, comment: 'Needs improvement' },
      { score: 5 }
    ],
    RowAvg: 0,
    maxScore: 5
  },
  {
    questionNumber: '2',
    questionText: 'How user-friendly is this feature?',
    reviews: [
      { score: 5 },
      { score: 3, comment: 'Confusing UI' },
      { score: 5 },
      { score: 3 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 }
    ],
    RowAvg: 0,
    maxScore: 5
  },
  {
    questionNumber: '3',
    questionText: 'Does this feature meet the project requirements?',
    reviews: [
      { score: 1 },
      { score: 5 },
      { score: 5 },
      { score: 4 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 },
      { score: 5 }
    ],
    RowAvg: 0,
    maxScore: 5
  },
  {
    questionNumber: '4',
    questionText: 'How would you rate the performance of this feature?',
    reviews: [
      { score: 1 },
      { score: 1, comment: 'Very slow response time' },
      { score: 1 },
      { score: 0 },
      { score: 1 },
      { score: 0 },
      { score: 1 },
      { score: 0 },
      { score: 1 },
      { score: 0 }
    ],
    RowAvg: 0,
    maxScore: 1
  }
];

let totalAvg = 0;
let questionCount = 0;
let totalMaxScore = 0;
// Calculate average for each row
dummyData.forEach((row) => {
  const sum = row.reviews.reduce((acc, val) => acc + val.score, 0);
  row.RowAvg = sum / row.reviews.length;
  totalAvg = row.RowAvg + totalAvg;
  totalMaxScore = totalMaxScore + row.maxScore;
  questionCount++;
});

const averagePeerReviewScore =
  questionCount > 0
    ? (((totalAvg / totalMaxScore) * 100) > 0 ? ((totalAvg / totalMaxScore) * 100).toFixed(2) : '0.00')
    : '0.00';

const columnAverages: number[] = Array.from({ length: dummyData[0].reviews.length }, () => 0);

// Calculate column averages
dummyData.forEach((row) => {
  row.reviews.forEach((val, index) => {
    columnAverages[index] += val.score;
  });
});

columnAverages.forEach((sum, index) => {
  columnAverages[index] = (sum / totalMaxScore) * 5;
});
=======
import { Link } from 'react-router-dom';
>>>>>>> Stashed changes

const ReviewTable: React.FC = () => {
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [sortOrderRow, setSortOrderRow] = useState<'asc' | 'desc' | 'none'>('none');
  const [showWordCount10, setShowWordCount10] = useState(false);
  const [showWordCount20, setShowWordCount20] = useState(false);

  const toggleSortOrderRow = () => {
    setSortOrderRow((prevSortOrder) => {
      if (prevSortOrder === 'asc') return 'desc';
      if (prevSortOrder === 'desc') return 'none';
      return 'asc';
    });
  };

  const currentRoundData = dummyDataRounds[currentRound];
  const { averagePeerReviewScore, columnAverages, sortedData } = calculateAverages(
    currentRoundData,
    sortOrderRow
  );

  const handleRoundChange = (roundIndex: number) => {
    setCurrentRound(roundIndex);
    setShowWordCount10(false);
    setShowWordCount20(false);
  };
  

<<<<<<< Updated upstream
  const averageScoreColorClass = getColorClass(totalAvg, totalMaxScore);
  let sortedData = [...dummyData];

  if (sortOrderRow === 'asc') {
    sortedData = dummyData.slice().sort((a, b) => a.RowAvg - b.RowAvg);
  } else if (sortOrderRow === 'desc') {
    sortedData = dummyData.slice().sort((a, b) => b.RowAvg - a.RowAvg);
  }

=======
>>>>>>> Stashed changes
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Summary Report for assignment: Program 2</h2>
      <h5 className="text-xl font-semibold mb-1">Team: Thala4AReason</h5>
<<<<<<< Updated upstream
      <h5 className="mb-4">Average peer review score: <span className={averageScoreColorClass}>{averagePeerReviewScore}</span></h5>
      <ShowSubmission />
=======
      <h5 className="mb-4">
        Average peer review score:{' '}
        <span className={getColorClass(parseFloat(averagePeerReviewScore), 100)}>{averagePeerReviewScore}</span>
      </h5>
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
      </form>
>>>>>>> Stashed changes
      <div className="table-container">
        <br></br>
        <table className="tbl_heat">
          <thead>
<<<<<<< Updated upstream
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Question No.</th>
              {Array.from({ length: dummyData[0].reviews.length }, (_, i) => (
                <th key={i} className="py-2 px-4 text-center">{`Review ${i + 1}`}</th>
              ))}
              <th className="py-2 px-4" onClick={toggleSortOrderRow}>
                Avg
                {sortOrderRow === "none" && <span>▲▼</span>}
                {sortOrderRow === "asc" && <span> ▲</span>}
                {sortOrderRow === "desc" && <span> ▼</span>}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className={index === sortedData.length - 1 ? "no-bg" : ""}>
                <td className={`py-2 px-4 text-center`} data-question={row.questionText}>{row.questionNumber}</td>
                {row.reviews.map((review, idx) => (
                  <td key={idx} className={`py-2 px-4 text-center ${getColorClass(review.score, row.maxScore)}`} data-question={review.comment}>
                    <span style={{ textDecoration: review.comment ? 'underline' : 'none' }}>{review.score}</span>
                  </td>
                ))}
                <td className="py-2 px-4 text-center">{row.RowAvg.toFixed(2)}</td>
              </tr>
=======
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Question No.</th>
            {Array.from({ length: currentRoundData[0].reviews.length }, (_, i) => (
              <th key={i} className="py-2 px-4 text-center">{`Review ${i + 1}`}</th>
            ))}
            <th className="py-2 px-4" onClick={toggleSortOrderRow}>
              Avg
              {sortOrderRow === "none" && <span>▲▼</span>}
              {sortOrderRow === "asc" && <span> ▲</span>}
              {sortOrderRow === "desc" && <span> ▼</span>}
            </th>
            {showWordCount10 && <th className="py-2 px-4 text-center">10+ Words</th>}
            {showWordCount20 && <th className="py-2 px-4 text-center">20+ Words</th>}
          </tr>
          </thead>
          <tbody>
          {sortedData.map((row, index) => (
            <ReviewTableRow
              key={index}
              row={row}
              showWordCount10={showWordCount10}
              showWordCount20={showWordCount20}
            />
          ))}
          <tr className="no-bg">
            <td className="py-2 px-4">Avg</td>
            {columnAverages.map((avg, index) => (
              <td key={index} className="py-2 px-4 text-center">
                {avg.toFixed(2)}
              </td>
>>>>>>> Stashed changes
            ))}
            <tr className="no-bg">
              <td className="py-2 px-4">Avg</td>
              {columnAverages.map((avg, index) => (
                <td key={index} className="py-2 px-4 text-center">{avg.toFixed(2)}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <br></br>
        <RoundSelector currentRound={currentRound} handleRoundChange={handleRoundChange} />
      </div>
      <p className="mt-4">
<<<<<<< Updated upstream
        Team members: (Chaitanya Srusti) (Nisarg Nilesh Doshi) (Aniruddha Rajnekar)(Malick, Kashika) 
      </p>
      <br></br>
      <p className="mt-4">
        <h3>Grade and comment for submission</h3>
        Grade: Grade for submission<br></br>
        Comment: Comment for submission<br></br>
        Late Penalty: 0<br></br>
      </p>
      <Link to="/">
        Back
      </Link>
=======
        <h3>Grade and comment for submission</h3>
        Grade: Grade for submission<br></br>
        Comment: Comment for submission<br></br>
        Late Penalty: 0<br></br>
      </p>
      <Link to="/">Back</Link>
>>>>>>> Stashed changes
    </div>
  );
};

export default ReviewTable;