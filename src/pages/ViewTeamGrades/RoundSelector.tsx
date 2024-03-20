import React from 'react';
import { dummyDataRounds } from './dummyData';

interface RoundSelectorProps {
  currentRound: number;
  handleRoundChange: (roundIndex: number) => void;
}

const RoundSelector: React.FC<RoundSelectorProps> = ({ currentRound, handleRoundChange }) => {
  return (
    <div className="round-selector">
      <div className="flex items-center">
        {dummyDataRounds.map((round, index) => (
          <button
            key={index}
            className={`round-button mr-4 ${currentRound === index ? "current" : ""}`}
            onClick={() => handleRoundChange(index)}
          >
            Round {index + 1}
          </button>
        ))}
        <span className="ml-4">
          Team members: (Chaitanya Srusti) (Nisarg Nilesh Doshi) (Aniruddha Rajnekar)(Malick, Kashika)
        </span>
      </div>
    </div>
  );
};

export default RoundSelector;