"use client"
// pages/quiz.tsx
import { useState, useEffect } from 'react';
import { hartronQuestions } from '@/data/hartronQuestions';

const quizQuestions = hartronQuestions;
const topics = [...new Set(quizQuestions.map((question: object) => question?.TOPIC))];

console.log("topics=>", topics)
const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questionsPerPage, setQuestionsPerPage] = useState(5);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTopic, questionsPerPage]);

  const filteredQuestions = selectedTopic
    ? quizQuestions.filter((question) => question.TOPIC === selectedTopic)
    : quizQuestions;

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const handleAnswerChange = (questionIndex: number, option: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  const handleShowAnswer = (questionIndex: number) => {
    setShowAnswers({
      ...showAnswers,
      [questionIndex]: !showAnswers[questionIndex],
    });
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuestions.slice((currentPage - 1) * questionsPerPage, (currentPage - 1) * questionsPerPage + 10).forEach((question, index) => {
      if (answers[(currentPage - 1) * questionsPerPage + index] === question.Ans) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateScore();
    alert(`Your score is ${score} out of ${filteredQuestions.slice((currentPage - 1) * questionsPerPage, (currentPage - 1) * questionsPerPage + 10).length}`);
    setShowResults(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowResults(false);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value || null);
  };

  const handleQuestionsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
    setShowResults(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold text-center text-teal-600 mb-12">MCQ Questions</h1>

      <div className="mb-6 md:max-w-3xl mx-auto">
        <label className="block mb-2 text-lg font-bold text-teal-700">Filter by Topic:</label>
        <select
          onChange={handleTopicChange}
          className="w-full p-2 border rounded-lg text-gray-700"
          value={selectedTopic || ""}
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className="mb-6 md:max-w-3xl mx-auto">
        <label className="block mb-2 text-lg font-bold text-teal-700">Questions per Page:</label>
        <select
          onChange={handleQuestionsPerPageChange}
          className="w-full p-2 border rounded-lg text-gray-700"
          value={questionsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 md:max-w-3xl mx-auto">
          {filteredQuestions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage).map((question, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-bold text-teal-700 mb-4">
                {(currentPage - 1) * questionsPerPage + index + 1}. {question.Questions}
              </h2>
              <div>
                {['A', 'B', 'C', 'D'].map((optionKey) => (
                  <div key={optionKey} className="mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionKey}
                        onChange={() => handleAnswerChange((currentPage - 1) * questionsPerPage + index, optionKey)}
                        checked={answers[(currentPage - 1) * questionsPerPage + index] === optionKey}
                        className="form-radio text-teal-600"
                        required
                      />
                      <span className="text-gray-700">{question[optionKey]}</span>
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleShowAnswer((currentPage - 1) * questionsPerPage + index)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              >
                {showAnswers[(currentPage - 1) * questionsPerPage + index] ? "Hide Answer" : "Show Answer"}
              </button>
              {showAnswers[(currentPage - 1) * questionsPerPage + index] && (
                <p className="mt-2 text-green-600">
                  Correct answer: {question[question.Ans]}
                </p>
              )}
            </div>
          ))}
          {/* <div className="text-center">
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition duration-300"
            >
              Submit
            </button>
          </div> */}
        </form>
      <div className="flex flex-wrap justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 m-3 rounded-full ${page === currentPage ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;