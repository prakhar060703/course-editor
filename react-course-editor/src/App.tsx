import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from '../src/pages/CourseList';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
       
      </Routes>
    </Router>
  );
};

export default App;
