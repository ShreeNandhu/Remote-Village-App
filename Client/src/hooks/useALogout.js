import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAdminStore from "../store/adminStore";
import { useNavigate } from 'react-router-dom';


const useALogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const showToast = useShowToast();
	const logoutAdmin = useAdminStore((state) => state.logout);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut();
			localStorage.removeItem("admin-info");
			logoutAdmin();
			navigate("/");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useALogout;
