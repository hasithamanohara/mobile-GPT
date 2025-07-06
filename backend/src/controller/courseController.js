import * as courseService from "../service/courseService.js";

export const createCourseController = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    console.log("Authenticated User:", req.user);
    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const course = await courseService.createCourse(
      title,
      description,
      content,
      req.user.id
    );
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getAllCoursesController = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getInstructorCoursesController = async (req, res) => {
  try {
    const courses = await courseService.getInstructorCourses(req.user.id);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const enrollStudentController = async (req, res) => {
  try {
    const result = await courseService.enrollStudent(
      req.params.id,
      req.user.id
    );
    res.json(result);
  } catch (err) {
    if (err.message === "Course not found") {
      return res.status(404).json({ msg: err.message });
    }
    if (err.message === "Already enrolled") {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Server error" });
  }
};

export const getEnrolledCoursesController = async (req, res) => {
  try {
    const courses = await courseService.getEnrolledCourses(req.user.id);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateCourseController = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    const course = await courseService.updateCourse(
      req.params.id,
      req.user.id,
      { title, description, content }
    );
    res.json(course);
  } catch (err) {
    if (err.message === "Course not found") {
      return res.status(404).json({ msg: err.message });
    }
    if (err.message === "Not authorized") {
      return res.status(403).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteCourseController = async (req, res) => {
  try {
    const result = await courseService.deleteCourse(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    if (err.message === "Course not found") {
      return res.status(404).json({ msg: err.message });
    }
    if (err.message === "Not authorized") {
      return res.status(403).json({ msg: err.message });
    }
    res.status(500).json({ msg: "Server error" });
  }
};
