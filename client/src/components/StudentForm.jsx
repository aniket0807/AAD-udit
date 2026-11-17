
function StudentForm({ onSubmit }) {
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Save the form reference before the asynchronous request
        const form = event.currentTarget;

        const formData = new FormData(form);

        const studentData = {
            studentName: formData.get("studentName"),
            rollNumber: formData.get("rollNumber"),
            course: formData.get("course"),
            year: Number(formData.get("year")),
            email: formData.get("email")
        };

        try {
            const response = await fetch(
                "http://localhost:5000/api/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(studentData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Registration failed"
                );
            }

            form.reset();

            onSubmit(result.data);

            alert("Student registered successfully!");

        } catch (error) {
            console.error("Error registering student:", error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Student Name</label>
            <input type="text" name="studentName" required />

            <label>Roll Number</label>
            <input type="text" name="rollNumber" required />

            <label>Course</label>
            <input type="text" name="course" required />

            <label>Year</label>
            <input type="number" name="year" required />

            <label>Email</label>
            <input type="email" name="email" required />

            <button type="submit">
                Register Student
            </button>
        </form>
    );
}

export default StudentForm;
