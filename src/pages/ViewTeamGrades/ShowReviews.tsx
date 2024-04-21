import React from 'react';

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
      reviewElements.push(<b>Round {r+1}</b>)
      for (let i = 0; i < num_of_reviews; i++) {
        reviewElements.push(<b>Review {i+1}</b>)
        for (let j = 0; j < num_of_questions; j++) {
          reviewElements.push(
            <div key={`round-${r}-question-${j}-review-${i}`}>
              <div>{data[r][j].questionText}</div>
              <div>Score: {data[r][j].reviews[i].score}</div>
              {data[r][j].reviews[i].comment && (
                <div>Comment: {data[r][j].reviews[i].comment}</div>
              )}
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
