import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useNavigate } from 'react-router-dom';
import useAdminStore from "../store/adminStore";


const useALogout = () => {
	const [signOut, isLoggingOut, error] = useSignOut(auth);
	const showToast = useShowToast();
	const { logout } = useAdminStore();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut();
			logout();
			navigate("/");
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { handleLogout, isLoggingOut, error };
};

export default useALogout;
