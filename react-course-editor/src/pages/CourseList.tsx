import React, { useState, useEffect } from 'react';
import EditCourseDialog from '../pages/EditCourseDialog';
import { Grid, Typography, Card, CardContent, Button, Box } from '@mui/material';

interface Course {
  courseId: string;
  instructorName: string;
  courseName: string;
  tags: string[];
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCardClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: '50px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline' }}>Courses</Typography>

      <Grid container justifyContent="center" spacing={2}>
        {courses.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <EditCourseDialog
              isOpen={isDialogOpen && selectedCourse?.courseId === course.courseId}
              onClose={() => setIsDialogOpen(false)}
              course={course}
            />
            <Card
             style={{
              cursor: 'pointer',
              background: 'linear-gradient(rgb(12 11 11), rgb(180 159 159))',
              color: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            >
              <CardContent style={{ minHeight: '150px' }}>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>{course.courseId}</Typography>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>{course.courseName}</Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCardClick(course)}
                  >
                    Show
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CourseList;
