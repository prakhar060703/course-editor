import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, Typography, Paper, Chip } from '@mui/material';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    course: Course | null;
}

interface Course {
    courseId: string;
    instructorName: string;
    courseName: string;
    tags: string[];
    students?: { name: string }[]; // Make students property optional
}

const EditCourseDialog: React.FC<Props> = ({ isOpen, onClose, course }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Logic to update course data and save changes
        // You can make a request to the API to save the changes here
        console.log('Form submitted:', course);
        console.log(selectedTags);
        console.log(selectedStudents);
        onClose();
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags(prevSelected => prevSelected.filter(selectedTag => selectedTag !== tag));
        if (course) {
            // Remove the selected tag from the course object
            course.tags = course?.tags.filter(selectedTag => selectedTag !== tag);
        }
    };

    const handleStudentClick = (studentName: string) => {
        setSelectedStudents(prevSelected => prevSelected.filter(name => name !== studentName));
        if (course) {
            // Remove the selected student from the course object
            course.students = course?.students?.filter(student => student.name !== studentName);
        }
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
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Course</DialogTitle>
            <form onSubmit={handleFormSubmit}>
                <DialogContent>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={{ padding: 20 }}>
                                <Typography variant="h5" align="center" gutterBottom>Edit Course</Typography>
                                <TextField
                                    fullWidth
                                    label="Course ID"
                                    name="courseId"
                                    defaultValue={course?.courseId}
                                    disabled
                                    style={{ marginBottom: '15px' }} // Add margin bottom here
                                />

                                <TextField
                                    fullWidth
                                    label="Instructor Name"
                                    name="instructorName"
                                    defaultValue={course?.instructorName}
                                    style={{ marginBottom: '15px' }} // Add margin bottom here
                                />

                                <TextField
                                    fullWidth
                                    label="Course Name"
                                    name="courseName"
                                    defaultValue={course?.courseName}
                                    style={{ marginBottom: '15px' }} // Add margin bottom here
                                />

                                {/* Add tag field */}
                                <Paper elevation={2} style={{ padding: 10, marginBottom: 10 }}>
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
                                    <Button
                                        variant="outlined"
                                        onClick={fetchTags}
                                        size="small" // Set the size to small
                                        sx={{ // Custom styling using MUI's sx prop
                                            '&.MuiButton-root': {
                                                marginTop:'5px',
                                                borderRadius: '20px', // Make the button rounded
                                                padding: '6px 12px', // Adjust padding for smaller size
                                                fontSize: '0.9rem', // Adjust the font size
                                                fontWeight: 600, // Adjust the font weight
                                                borderColor: '#4CAF50', // Custom border color
                                                color: '#4CAF50', // Custom text color
                                                '&:hover': {
                                                    backgroundColor: '#4CAF50', // Custom background color on hover
                                                    color: '#fff', // Custom text color on hover
                                                },
                                            },
                                        }}
                                    >
                                        Show Tags
                                    </Button>

                                    {/* Button to fetch tags */}
                                    {selectedTags.map((tag, index) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            style={{ marginRight: 5 }}
                                            onDelete={() => handleTagClick(tag)}
                                            color={selectedTags.includes(tag) ? "primary" : undefined}
                                        />
                                    ))}
                                </Paper>
                                {/* Add student field */}
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
                                    <Button
                                        variant="outlined"
                                        onClick={fetchStudents}
                                        size="small" // Set the size to small
                                        sx={{ // Custom styling using MUI's sx prop
                                            '&.MuiButton-root': {
                                                
                                                borderRadius: '20px', // Make the button rounded
                                                padding: '6px 12px', // Adjust padding for smaller size
                                                fontSize: '0.9rem', // Adjust the font size
                                                fontWeight: 600, // Adjust the font weight
                                                borderColor: '#2196F3', // Custom border color
                                                color: '#2196F3', // Custom text color
                                                '&:hover': {
                                                    backgroundColor: '#2196F3', // Custom background color on hover
                                                    color: '#fff', // Custom text color on hover
                                                },
                                            },
                                        }}
                                    >
                                        Show Students
                                    </Button>
                                    {/* Button to fetch students */}
                                    {selectedStudents.map((student, index) => (
                                        <Chip
                                            key={index}
                                            label={student}
                                            style={{ marginRight: 5 }}
                                            onDelete={() => handleStudentClick(student)}
                                            color={selectedStudents.includes(student) ? "primary" : undefined}
                                        />
                                    ))}
                                </Paper>
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined" color="secondary" sx={{ mr: 1 }}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditCourseDialog;
