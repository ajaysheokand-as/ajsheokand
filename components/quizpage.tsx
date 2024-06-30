"use client";
import React, { useEffect, useState } from "react";
import { hartronQuestions } from "@/data/hartronQuestions";
// import { useRouter } from 'next/router'
import Link from "next/link";

interface QuizPage {
  answer: object;
  age: number;
}

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTestQuestion, setCurrentTestQuestion] = useState(
    hartronQuestions.slice(0, 30)
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState({ score: -1, percentage: "" });
  const [showPopup, setShowPopup] = useState(true);
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    noOfQues: 10,
  });

  //   const router = useRouter();

  // Function to handle student details submission
  const handlePopupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPopup(false);
  };

  const getRandomQuestions = () => {
    // Shuffle the questions array
    const shuffledQuestions = [...hartronQuestions].sort(
      () => Math.random() - 0.5
    );

    console.log(
      "shuffledQuestions.slice(0, Number(studentDetails.noOfQues))",
      shuffledQuestions.slice(0, Number(studentDetails.noOfQues))
    );
    // Select the first 30 questions
    return shuffledQuestions.slice(0, Number(studentDetails.noOfQues));
  };

  // Function to handle answer selection
  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    // currentTestQuestion.length > currentQuestion && handleQuestionNavigation(currentQuestion + 1)
  };

  // Function to handle question navigation
  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestion(index);
  };

  // Function to check if the current question is answered
  const isQuestionAnswered = () => {
    return answers[currentQuestion] !== undefined;
  };

  const checkResult = () => {
      if (result.score !== -1) {
        setShowPopup(true);
        setStudentDetails({
            name: "",
            email: "",
            phone: "",
            noOfQues: 10
        })
        setResult({
            score: -1,
            percentage: "",
          });
    } else {
      // Calculate the score
      const score = answers.reduce((total, answer, index) => {
        if (answer === currentTestQuestion[index]?.Ans) {
          return total + 1;
        }
        return total;
      }, 0);

      // Calculate the percentage
      const percentage = ((score / currentTestQuestion?.length) * 100).toFixed(
        2
      );
      setResult({ score, percentage });
      // console.log("final result=>", score, percentage)

      return { score, percentage };
    }
  };
  useEffect(() => {
    setCurrentTestQuestion(getRandomQuestions());
  }, [studentDetails?.noOfQues]);

  return (
    <div className="bg-gray-100 ">
      <div className="min-h-screen flex flex-wrap items-center justify-around">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {showPopup && (
            <div>
              <h3 className="text-xl font-bold mb-4">Enter Your Details</h3>
              <form onSubmit={handlePopupSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={studentDetails.name}
                  required
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      name: e.target.value,
                    })
                  }
                  className="border rounded py-2 px-4 mb-4 w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={studentDetails.email}
                  required
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      email: e.target.value,
                    })
                  }
                  className="border rounded py-2 px-4 mb-4 w-full"
                />
                <input
                  type="number"
                  placeholder="Phone No."
                  value={studentDetails.phone}
                  required
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      phone: e.target.value,
                    })
                  }
                  className="border rounded py-2 px-4 mb-4 w-full"
                />
                <select
                  id="valueDropdown"
                  className="border rounded py-2 px-4 mb-4 w-full"
                  value={studentDetails?.noOfQues}
                  onChange={(e) =>
                    setStudentDetails({
                      ...studentDetails,
                      noOfQues: Number(e.target.value),
                    })
                  }
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Start Quiz
                </button>
              </form>
            </div>
          )}
          {!showPopup && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Question {currentQuestion + 1} of {currentTestQuestion?.length}
              </h2>
              <p className="mb-4">
                {currentTestQuestion[currentQuestion]?.Questions}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                    answers[currentQuestion] === "A"
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect("A")}
                >
                  A. {currentTestQuestion[currentQuestion]?.A}
                </button>
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                    answers[currentQuestion] === "B"
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect("B")}
                >
                  B. {currentTestQuestion[currentQuestion]?.B}
                </button>
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                    answers[currentQuestion] === "C"
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect("C")}
                >
                  C. {currentTestQuestion[currentQuestion]?.C}
                </button>
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                    answers[currentQuestion] === "D"
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                  }`}
                  onClick={() => handleAnswerSelect("D")}
                >
                  D. {currentTestQuestion[currentQuestion]?.D}
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                {currentQuestion > 0 && (
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() =>
                      handleQuestionNavigation(currentQuestion - 1)
                    }
                  >
                    Previous
                  </button>
                )}

                {currentQuestion < currentTestQuestion.length - 1 && (
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      handleQuestionNavigation(currentQuestion + 1)
                    }
                  >
                    Next
                  </button>
                )}
              </div>
              <div className="mt-4 flex justify-around">
                {answers && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={checkResult}
                  >
                    {result.score == -1 ? "Get Result" : "Try Again"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold ">Student Details</h3>
          {studentDetails.noOfQues && (
            <p className="text-bold ">No of Ques.: {studentDetails.noOfQues}</p>
          )}
          {studentDetails.name && <p>Name: {studentDetails.name}</p>}
          {studentDetails.email && <p>Email: {studentDetails.email}</p>}
          {studentDetails.phone && <p>Phone No.: {studentDetails.phone}</p>}
          
          {result.score !== -1 && (
            <h1 className="text-xl font-bold">
              You got {result.score} marks. Percentage is {result.percentage} %
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
