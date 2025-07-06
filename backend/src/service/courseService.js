import Course from '../models/courseModel.js';

export const createCourse = async (title, description, content, instructorId) => {
  const course = new Course({ title, description, content, instructor: instructorId });
  await course.save();
  return course;
};

export const getAllCourses = async () => {
  return await Course.find().populate('instructor', 'username');
};

export const getInstructorCourses = async (instructorId) => {
  return await Course.find({ instructor: instructorId }).populate('students', 'username');
};

export const enrollStudent = async (courseId, studentId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error('Course not found');

  if (course.students.includes(studentId)) {
    throw new Error('Already enrolled');
  }

  course.students.push(studentId);
  await course.save();
  return { message: 'Enrollment successful' };
};

export const getEnrolledCourses = async (studentId) => {
  return await Course.find({ students: studentId }).populate('instructor', 'username');
};

export const updateCourse = async (courseId, instructorId, updates) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error('Course not found');
  if (course.instructor.toString() !== instructorId) {
    throw new Error('Not authorized');
  }

  course.title = updates.title || course.title;
  course.description = updates.description || course.description;
  course.content = updates.content || course.content;
  await course.save();
  return course;
};

export const deleteCourse = async (courseId, instructorId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error('Course not found');
  if (course.instructor.toString() !== instructorId) {
    throw new Error('Not authorized');
  }

  await course.remove();
  return { message: 'Course deleted' };
};