import axios from 'axios';

const useStudent = () => {
    async function registerStudent(values) {
        try {
            const results = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/student/student-registration`, values);
            console.log(results.data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        registerStudent
    }
}

export default useStudent