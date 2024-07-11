'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';

const TypingTest = () => {
  const [text, setText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [typedWords, setTypedWords] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [started, setStarted] = useState(false);
  const [user, setUser] = useState({ name: '', phone: '', email: '', testDuration: 5 });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (started && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && started) {
      setStarted(false);
      setShowResults(true);
      // clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, started]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleStart = () => {
    setStarted(true);
    setTimeRemaining(user.testDuration * 60);
    setText('');
    setTypedWords(0);
    setTypedCharacters(0);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setText(inputText);
    setTypedCharacters(inputText.length);
    setTypedWords(inputText.trim().split(/\s+/).length);
  };

  const calculateWordsPerMinute = () => {
    const minutes = user.testDuration;
    return Math.round(typedWords / minutes);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Typing Test</title>
        <meta name="description" content="Typing Test Application" />
      </Head>

      {!started && !showResults && (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" value={user?.name} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" autoCorrect="off" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={user?.email} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" autoCorrect="off" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" name="phone" value={user.phone} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded" autoCorrect="off" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Test Duration (minutes)</label>
              <select name="testDuration" value={user.testDuration} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded">
                <option value={.5}>30 seconds</option>
                <option value={1}>1 minute</option>
                <option value={2}>2 minutes</option>
                <option value={5}>5 minutes</option>
              </select>
            </div>
            <button type="button" onClick={handleStart} className="mt-4 bg-green-500 text-white p-2 rounded">Start Test</button>
          </form>
        </div>
      )}

      {started && !showResults && (
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold mb-6">Typing Test</h1>
          <div className="mb-4 text-2xl">
            Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}
          </div>
          <textarea
            value={text}
            onChange={handleTyping}
            className="w-full p-4 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            // style={{width:"900px"}}
            rows={15}
            disabled={!started}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
          />
          <div className="mt-4 text-lg">
            Typed Words: {typedWords}
          </div>
          {/* <div className="mt-4 text-lg">
            Typed Characters: {typedCharacters}
          </div> */}
        </div>
      )}

      {showResults && (
        <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-6">Certificate of Achievement</h1>
        <p className="text-xl mb-4">This certifies that</p>
        <p className="text-3xl font-bold mb-4">{user?.name}</p>
        <p className="text-xl mb-4">has successfully completed the typing test with the following results:</p>
        <div className="text-left mb-6">
          <p className="text-lg mb-2"><strong>Email:</strong> {user?.email}</p>
          <p className="text-lg mb-2"><strong>Phone:</strong> {user?.phone}</p>
          <p className="text-lg mb-2"><strong>Test Duration:</strong> {user?.testDuration} minutes</p>
          <p className="text-lg mb-2"><strong>Typed Words:</strong> {typedWords}</p>
          {/* <p className="text-lg mb-2"><strong>Typed Characters:</strong> {typedCharacters}</p> */}
          <p className="text-lg mb-2"><strong>Words per Minute (WPM):</strong> {calculateWordsPerMinute()} WPM</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Typed Text</h3>
          <p className="text-lg whitespace-pre-wrap">{text}</p>
        </div>
        <button type="button" onClick={()=>{setStarted(false); setShowResults(false)}} className="mt-4 bg-green-500 text-white p-2 rounded">Try Again</button>

      </div>
      
      )}
    </div>
  );
};

export default TypingTest;
