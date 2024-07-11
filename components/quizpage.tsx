"use client";
import React, { useEffect, useState } from "react";
import { hartronQuestions } from "@/data/hartronQuestions";
import axios from "axios";
import Link from 'next/link';


// import { useRouter } from 'next/router'
// import Link from "next/link";

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
  const handlePopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("This is user details", studentDetails);
    try {
      const res = await axios.post("/api/users", studentDetails);

      if (res.data.success) {
        console.log("Success API Call");
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setShowPopup(false);
  };
 
  const handleTestSubmit = async (score:number, percentage:string) =>{
    // e.preventDefault();
    
    const data = {
        userId: studentDetails?.phone,
        date: Date.now(),
        noOfQues: studentDetails?.noOfQues,
        result:{score,percentage},
      
    }
    console.log("This is test details", data);
    try {
      const res = await axios.post("/api/test", data);

      if (res.data.success) {
        console.log("Success API Call");
        // setResult({ score: -1, percentage: "" });
        // setAnswers([]);
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  const getData = async () => {
    console.log("This is user details", studentDetails);
    try {
      const res = await axios.get("/api/users");

      if (res.data.success) {
        console.log("Success API Call", res.data);
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
        noOfQues: 10,
      });
      setResult({
        score: -1,
        percentage: "",
      });
      setAnswers([]);
      setCurrentQuestion(0)
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
      handleTestSubmit(score, percentage);
      // console.log("final result=>", score, percentage)
      return { score, percentage };
    }
  };
  useEffect(() => {
    setCurrentTestQuestion(getRandomQuestions());
    getData();
  }, [studentDetails?.noOfQues, result]);

  return (
    <div className="bg-gray-100">
      
      <div className="min-h-screen flex flex-wrap items-center justify-around">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {showPopup && (
            <div>
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
          )}
        </div>
        <div className="p-4  flex flex-col justify-around">
        <div className="flex flex-wrap items-center justify-around">
        {/* <Link href="pages/users" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Students
          </span>
        </Link>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Results
          </span>
        </button> */}
        {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Green to blue
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Purple to pink
          </span>
        </button> */}
        {/* <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Pink to orange
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Teal to Lime
          </span>
        </button>
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Red to Yellow
          </span>
        </button> */}
      </div>
          <h3 className="text-xl font-bold ">Student Details</h3>
          {studentDetails.noOfQues && (
            <p className="text-bold ">
              No of Ques.: {studentDetails?.noOfQues}
            </p>
          )}
          {studentDetails.name && <p>Name: {studentDetails?.name}</p>}
          {studentDetails.email && <p>Email: {studentDetails?.email}</p>}
          {studentDetails.phone && <p>Phone No.: {studentDetails?.phone}</p>}

          {result.score !== -1 && (
            <h1 className="text-xl font-bold">
              You got {result.score} marks. Percentage is {result?.percentage} %
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
