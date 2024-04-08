import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


interface Course {
    courseId: string;
    instructorName: string;
    courseName: string;
    tags: string[];
    students?: { name: string }[];
}




const EditCourseDialog: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);


    const navigate = useNavigate();

    useEffect(() => {
        const selectedCourseString = localStorage.getItem('selectedCourse');
        if (selectedCourseString) {
            const selectedCourse: Course = JSON.parse(selectedCourseString);
            setCourse(selectedCourse);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (course) {
            // Update course data
            const updatedCourse: Course = {
                ...course,
                tags: selectedTags,
                students: selectedStudents.map(name => ({ name })),
            };

            // Save the updated course data to local storage
            localStorage.setItem('selectedCourse', JSON.stringify(updatedCourse));

            // Logic to update course data and save changes
            // You can make a request to the API to save the changes here
            console.log('Form submitted:', updatedCourse);
            console.log('Updated tags if any',selectedTags);
            console.log('updated students if any',selectedStudents);
        }
        onClose();
    };


    const onClose = () => {
        navigate('/'); // Navigate back to the home page
    };






    const handleTagClick = (tag: string) => {
        setSelectedTags(prevSelected => prevSelected.filter(selectedTag => selectedTag !== tag));
        if (course) {
            // Remove the selected tag from the course object
            setCourse(prevCourse => {
                if (prevCourse) {
                    return {
                        ...prevCourse,
                        tags: prevCourse.tags.filter(selectedTag => selectedTag !== tag)
                    };
                }
                return null;
            });
        }
    };

    const handleStudentClick = (studentName: string) => {
        setSelectedStudents(prevSelected => prevSelected.filter(name => name !== studentName));
        if (course) {
            // Remove the selected student from the course object
            setCourse(prevCourse => {
                if (prevCourse) {
                    return {
                        ...prevCourse,
                        students: prevCourse.students?.filter(student => student.name !== studentName)
                    };
                }
                return null;
            });
        }
    };
    // Handler to update instructor name
    const handleInstructorNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCourse(prevCourse => {
            if (prevCourse) {
                return {
                    ...prevCourse,
                    instructorName: value
                };
            }
            return null;
        });
    };

    // Handler to update course name
    const handleCourseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCourse(prevCourse => {
            if (prevCourse) {
                return {
                    ...prevCourse,
                    courseName: value
                };
            }
            return null;
        });
    };

    const fetchTags = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json');
            if (!response.ok) {
                throw new Error('Failed to fetch tags');
            }
            const data = await response.json();
            setSelectedTags(data.tags);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };
    const fetchStudents = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json');
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            const studentNames: string[] = data.enrolledList.map((student: { name: string }) => student.name); // Explicitly type the student parameter
            setSelectedStudents(studentNames); // Update selectedStudents state with the extracted names
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };




    return (


        <div>
            {course ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <form onSubmit={handleFormSubmit}>
                        <Typography variant="h5" align="center" gutterBottom>Edit Course</Typography>
                        <Grid container justifyContent="center" spacing={2}>
                            <Grid item xs={12}>
                                <Paper elevation={3} style={{ padding: 20,  }}>

                                    <TextField
                                        fullWidth
                                        label="Course ID"
                                        name="courseId"
                                        value={course.courseId}
                                        disabled
                                        style={{ marginBottom: '15px' }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Instructor Name"
                                        name="instructorName"
                                        value={course.instructorName}
                                        onChange={handleInstructorNameChange}
                                        style={{ marginBottom: '15px' }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Course Name"
                                        name="courseName"
                                        value={course.courseName}
                                        onChange={handleCourseNameChange}
                                        style={{ marginBottom: '15px' }}
                                    />

                                    {/* Display selected tags */}
                                    <Paper elevation={2} style={{ padding: 10, marginBottom: '15px' }}>
                                        <Typography variant="subtitle1">Tags</Typography>
                                        {course?.tags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            style={{ marginRight: 5 }}
                                            onDelete={() => handleTagClick(tag)}
                                            color={selectedTags.includes(tag) ? "primary" : undefined}
                                        />
                                    ))}
                                        {selectedTags.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                style={{ marginRight: 5 }}
                                                onDelete={() => handleTagClick(tag)}
                                                color={selectedTags.includes(tag) ? "primary" : undefined}
                                            />
                                        ))}
                                        <Button
                                            variant="outlined"
                                            onClick={fetchTags}
                                            size="small"
                                            sx={{
                                                borderRadius: '20px',
                                                padding: '6px 12px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                borderColor: '#2196F3',
                                                color: '#2196F3',
                                                '&:hover': {
                                                    backgroundColor: '#2196F3',
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            Fetch Tags
                                        </Button>
                                    </Paper>

                                    {/* Display selected students */}
                                    <Paper elevation={2} style={{ padding: 10 }}>
                                        <Typography variant="subtitle1">Students</Typography>
                                        {course?.students?.map((student, index) => (
                                        <Chip
                                            key={index}
                                            label={student.name}
                                            style={{ marginRight: 5 }}
                                            onDelete={() => handleStudentClick(student.name)}
                                            color={selectedStudents.includes(student.name) ? "primary" : undefined}
                                        />
                                    ))}
                                        {selectedStudents.map((student, index) => (
                                            <Chip
                                                key={index}
                                                label={student}
                                                style={{ marginRight: 5 }}
                                                onDelete={() => handleStudentClick(student)}
                                                color={selectedStudents.includes(student) ? "primary" : undefined}
                                            />
                                        ))}
                                        <Button
                                            variant="outlined"
                                            onClick={fetchStudents}
                                            size="small"
                                            sx={{
                                                borderRadius: '20px',
                                                padding: '6px 12px',
                                                fontSize: '0.9rem',
                                                fontWeight: 600,
                                                borderColor: '#2196F3',
                                                color: '#2196F3',
                                                '&:hover': {
                                                    backgroundColor: '#2196F3',
                                                    color: '#fff',
                                                },
                                            }}
                                        >
                                            Fetch Students
                                        </Button>
                                    </Paper>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 1, mt: 2 }}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1, mt: 2 }}>Update</Button>
                    </form>
                    </div>
                    ) : (
                    <Typography variant="body1">No course selected</Typography>
            )}
                </div>




    );
};

export default EditCourseDialog;