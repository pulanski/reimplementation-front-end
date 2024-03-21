export interface ReviewData {
  questionNumber: string;
  questionText: string;
  reviews: { score: number; comment?: string }[];
  RowAvg: number;
  maxScore: number;
}

export const dummyDataRounds: ReviewData[][] = [
  [
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
  ],
  // Round 2 dummy data
  [
    {
      questionNumber: '1',
      questionText: 'What is the main purpose of this feature?',
      reviews: [
        { score: 4, comment: 'Good explanation' },
        { score: 3, comment: 'Could be better' },
        { score: 5 },
        { score: 4 },
        { score: 4 },
        { score: 5 },
        { score: 4 },
        { score: 5 },
        { score: 3, comment: 'Needs more clarity' },
        { score: 4 }
      ],
      RowAvg: 0,
      maxScore: 5
    },
    {
      questionNumber: '2',
      questionText: 'How user-friendly is this feature?',
      reviews: [
        { score: 4 },
        { score: 2 },
        { score: 4 },
        { score: 4 },
        { score: 4 },
        { score: 4 },
        { score: 5 },
        { score: 4 },
        { score: 4 },
        { score: 5 }
      ],
      RowAvg: 0,
      maxScore: 5
    },
    {
      questionNumber: '3',
      questionText: 'Does this feature meet the project requirements?',
      reviews: [
        { score: 3 },
        { score: 4 },
        { score: 4 },
        { score: 5 },
        { score: 4 },
        { score: 4 },
        { score: 4 },
        { score: 5 },
        { score: 4 },
        { score: 5 }
      ],
      RowAvg: 0,
      maxScore: 5
    },
  ],
  // Add more rounds as needed...
];
