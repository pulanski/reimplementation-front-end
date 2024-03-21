import React, { useState } from 'react';
import ReviewTableRow from './ReviewTableRow';
import RoundSelector from './RoundSelector';
import { dummyDataRounds} from './dummyData';
import { calculateAverages, getColorClass } from './utils';
import './grades.scss';
import { Link } from 'react-router-dom';

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Summary Report for assignment: Program 2</h2>
      <h5 className="text-xl font-semibold mb-1">Team: Thala4AReason</h5>
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
      <div className="table-container">
        <br></br>
        <table className="tbl_heat">
          <thead>
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
            ))}
          </tr>
          </tbody>
        </table>
        <br></br>
        <RoundSelector currentRound={currentRound} handleRoundChange={handleRoundChange} />
      </div>
      <p className="mt-4">
        <h3>Grade and comment for submission</h3>
        Grade: Grade for submission<br></br>
        Comment: Comment for submission<br></br>
        Late Penalty: 0<br></br>
      </p>
      <Link to="/">Back</Link>
    </div>
  );
};

export default ReviewTable;
