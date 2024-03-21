import React from 'react';
import { getColorClass, getWordCount10, getWordCount20 } from './utils';
import { ReviewData } from './dummyData';

interface ReviewTableRowProps {
  row: ReviewData;
  showWordCount10: boolean;
  showWordCount20: boolean;
}

const ReviewTableRow: React.FC<ReviewTableRowProps> = ({ row, showWordCount10, showWordCount20 }) => {
  return (
    <tr className={row.maxScore === 1 ? "no-bg" : ""}>
      <td className="py-2 px-4 text-center" data-question={row.questionText}>
        {row.questionNumber}
      </td>
      {row.reviews.map((review, idx) => (
        <td
          key={idx}
          className={`py-2 px-4 text-center ${getColorClass(review.score, row.maxScore)}`}
          data-question={review.comment}
        >
          <span style={{ textDecoration: review.comment ? "underline" : "none" }}>{review.score}</span>
        </td>
      ))}
      <td className="py-2 px-4 text-center">{row.RowAvg.toFixed(2)}</td>
      {showWordCount10 && <td className="py-2 px-4 text-center">{getWordCount10(row)}</td>}
      {showWordCount20 && <td className="py-2 px-4 text-center">{getWordCount20(row)}</td>}
    </tr>
  );
};

export default ReviewTableRow;