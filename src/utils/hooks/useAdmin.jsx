import axios from "axios";


const useAdmin = () => {
    async function registerAdmin(values) {
        try {
            const results = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/admin/admin-registration`, values);
            console.log(results.data)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        registerAdmin
    }
}

export default useAdmin