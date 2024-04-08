import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from '../src/pages/CourseList';
import EditCourseDialog from './pages/EditCourseDialog';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/edit/:courseId" element={<EditCourseDialog />} /> {/* Include courseId parameter */}
        
       
      </Routes>
    </Router>
  );
};

export default App;
