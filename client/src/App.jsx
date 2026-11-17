import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/students"
        );

        if (!response.ok) {
          throw new Error("Unable to retrieve students");
        }

        const result = await response.json();
        setStudents(result.data);

      } catch (error) {
        setError(error.message);

      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Add newly registered student to the table
  const handleStudentSubmit = (student) => {
    setStudents((previousStudents) => [
      ...previousStudents,
      student
    ]);
  };

  return (
    <div className="app">
      <h1>Student Registration System</h1>

      <StudentForm onSubmit={handleStudentSubmit} />

      <h2>Registered Students</h2>

      {loading && <p>Loading students...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Course</th>
              <th>Year</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentName}</td>
                <td>{student.rollNumber}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && students.length === 0 && !error && (
        <p>No students registered yet.</p>
      )}
    </div>
  );
}

export default App;