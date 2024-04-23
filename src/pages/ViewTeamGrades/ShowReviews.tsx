import React from 'react';
import { getColorClass } from './utils';

interface ReviewComment {
  score: number;
  comment?: string;
}

interface Review {
  questionNumber: string;
  questionText: string;
  reviews: ReviewComment[];
  RowAvg: number;
  maxScore: number;
}

interface ShowReviewsProps {
  data: Review[][];
}

const ShowReviews: React.FC<ShowReviewsProps> = ({ data }) => {
  const rounds = data.length;


  // Render each review for every question in each round
  const renderReviews = () => {
    const reviewElements: JSX.Element[] = [];
    for(let r = 0; r < rounds; r++){
      const num_of_questions = data[r].length;
      
      // Assuming 'reviews' array exists inside the first 'question' of the first 'round'.
      const num_of_reviews = data[r][0].reviews.length;
      reviewElements.push(<div className="round-heading">Round {r+1}</div>)
      for (let i = 0; i < num_of_reviews; i++) {
        reviewElements.push(<div className="review-heading">Review {i+1}</div>);
        for (let j = 0; j < num_of_questions; j++) {
          reviewElements.push(
            <div key={`round-${r}-question-${j}-review-${i}`} className="review-block">
              <div className="question">{j+1}. {data[r][j].questionText}</div>
              <div className="score-container">
                <span className={`score ${getColorClass(data[r][j].reviews[i].score,data[r][j].maxScore)}`}>{data[r][j].reviews[i].score}</span>
                {data[r][j].reviews[i].comment && (
                  <div className="comment">{data[r][j].reviews[i].comment}</div>
                )}
              </div>
            </div>
          );
        }
      }
    }
    
    return reviewElements;
  };

  return <div>{rounds > 0 ? renderReviews() : <div>No reviews available</div>}</div>;
};

export default ShowReviews;
