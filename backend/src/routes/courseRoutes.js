import express from 'express';
import * as courseController from '../controller/courseController.js';
import auth from '../middleware/authMiddleware.js';
import role from '../middleware/roleMiddlware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /courses/createCourse:
 *   post:
 *     tags: [Courses]
 *     summary: Create course (instructor only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course created
 */
router.post('/createCourse', auth, role(['instructor']), courseController.createCourseController);

/**
 * @swagger
 * /courses/getAllCourese:
 *   get:
 *     tags: [Courses]
 *     summary: Get all courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/getAllCourese', auth, courseController.getAllCoursesController);

/**
 * @swagger
 * /courses/getmycourses:
 *   get:
 *     tags: [Courses]
 *     summary: Get instructor's courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Instructor's courses
 */
router.get('/getmycourses', auth, role(['instructor']), courseController.getInstructorCoursesController);

/**
 * @swagger
 * /courses/{id}/enroll:
 *   post:
 *     tags: [Courses]
 *     summary: Enroll in course (student only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollment success
 */
router.post('/:id/enroll', auth, role(['student']), courseController.enrollStudentController);

/**
 * @swagger
 * /courses/enrolled:
 *   get:
 *     tags: [Courses]
 *     summary: Get enrolled courses (student only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled courses
 */
router.get('/enrolled', auth, role(['student']), courseController.getEnrolledCoursesController);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Update course (instructor only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course updated
 *   delete:
 *     tags: [Courses]
 *     summary: Delete course (instructor only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted
 */
router.put('/:id', auth, role(['instructor']), courseController.updateCourseController);
router.delete('/:id', auth, role(['instructor']), courseController.deleteCourseController);

export default router;