"use client";
import React, { useEffect, useState } from "react";
import { hartronQuestions } from "@/data/hartronQuestions";
import axios from "axios";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentTestQuestion, setCurrentTestQuestion] = useState(
    hartronQuestions.slice(0, 30)
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<boolean[]>([]);
  const [result, setResult] = useState({ score: -1, percentage: "" });
  const [showPopup, setShowPopup] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    phone: "",
    noOfQues: 10,
  });

  const handlePopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("This is user details", studentDetails);
    try {
      const res = await axios.post("/api/users", studentDetails);

      if (res.data.success) {
        // console.log("Success API Call");
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setShowPopup(false);
  };

  const handleTestSubmit = async (score: number, percentage: string) => {
    const data = {
      userId: studentDetails?.phone,
      date: Date.now(),
      noOfQues: studentDetails?.noOfQues,
      result: { score, percentage },
    };
    console.log("This is test details", data);
    try {
      const res = await axios.post("/api/test", data);

      if (res.data.success) {
        // console.log("Success API Call");
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getData = async () => {
    // console.log("This is user details", studentDetails);
    try {
      const res = await axios.get("/api/users");

      if (res.data.success) {
        // console.log("Success API Call", res.data);
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getRandomQuestions = () => {
    const shuffledQuestions = [...hartronQuestions].sort(
      () => Math.random() - 0.5
    );

    return shuffledQuestions.slice(0, Number(studentDetails.noOfQues));
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    const newSkipped = [...skipped];
    newSkipped[currentQuestion] = false;
    setSkipped(newSkipped);
  };

  const handleSkipQuestion = () => {
    const newSkipped = [...skipped];
    newSkipped[currentQuestion] = true;
    setSkipped(newSkipped);

    if (currentQuestion < currentTestQuestion.length - 1) {
      handleQuestionNavigation(currentQuestion + 1);
    }
  };

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestion(index);
  };

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
        noOfQues: 10,
      });
      setResult({
        score: -1,
        percentage: "",
      });
      setAnswers([]);
      setSkipped([]);
      setCurrentQuestion(0);
      setShowCertificate(false);
    } else {
      const score = answers.reduce((total, answer, index) => {
        if (answer === currentTestQuestion[index]?.Ans) {
          return total + 1;
        }
        return total;
      }, 0);

      const percentage = ((score / currentTestQuestion?.length) * 100).toFixed(
        2
      );
      setResult({ score, percentage });
      handleTestSubmit(score, percentage);
      setShowCertificate(true);
      return { score, percentage };
    }
  };

  useEffect(() => {
    setCurrentTestQuestion(getRandomQuestions());
    getData();
  }, [studentDetails?.noOfQues, result]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row justify-around items-center p-8">
      {showPopup && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Enter Your Details</h3>
          <form onSubmit={handlePopupSubmit}>
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
              <option value={50}>50</option>
              <option value={90}>90</option>
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
      {!showPopup && !showCertificate && (
        <>
          <div className="flex-1 bg-white p-8 rounded-lg shadow-md mr-4 mb-4 md:mb-0">
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

              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSkipQuestion}
              >
                Skip
              </button>

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
              {answers.length > 3 && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={checkResult}
                >
                  {result.score == -1 ? "Get Result" : "Try Again"}
                </button>
              )}
            </div>
          </div>
          <div className="flex-1 bg-white p-8 rounded-lg shadow-md ml-4">
            <h3 className="text-xl font-bold mb-2">Question Status</h3>
            <div className="flex flex-wrap">
              {currentTestQuestion.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 m-3 flex items-center justify-center rounded-full text-white font-bold cursor-pointer ${
                    answers[index] !== undefined
                      ? "bg-green-500"
                      : skipped[index]
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  onClick={() => handleQuestionNavigation(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {showCertificate && (
        <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-6">Certificate of Achievement</h1>
          <p className="text-xl mb-4">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-xl mb-4">This certifies that</p>
          <p className="text-3xl font-bold mb-4">{studentDetails?.name}</p>
          <p className="text-xl mb-4">has successfully completed the MCQ test with the following results:</p>
          <div className="text-left mb-6">
            <p className="text-lg mb-2"><strong>Email:</strong> {studentDetails?.email}</p>
            <p className="text-lg mb-2"><strong>Phone:</strong> {studentDetails?.phone}</p>
            <p className="text-lg mb-2"><strong>Number of Ques.</strong> {studentDetails?.noOfQues} minutes</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Got {result.score} Marks</h3>
            <p className="text-lg whitespace-pre-wrap">{result.percentage}%</p>
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={checkResult}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
