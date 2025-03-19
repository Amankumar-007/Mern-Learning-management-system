import { Course } from "../models/Course.js";

// Create a new course
export const createCourse = async (req, res) => {
    try {
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail, enrolledStudents, lectures, creator, isPublished } = req.body;

        const newCourse = new Course({
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail,
            enrolledStudents,
            lectures,
            creator,
            isPublished
        });

        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({ message: "Error creating course", error: error.message });
    }
};

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("enrolledStudents lectures creator");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate("enrolledStudents lectures creator");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching course", error: error.message });
    }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error: error.message });
    }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course", error: error.message });
    }
};