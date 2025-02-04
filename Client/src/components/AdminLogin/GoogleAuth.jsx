import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAdminStore from "../../store/adminStore";

const GoogleAuth = ({ prefix }) => {
	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
	const showToast = useShowToast();
	const loginadmin = useAdminStore((state) => state.login);

	const handleGoogleAuth = async () => {
		try {
			const newadmin = await signInWithGoogle();
			if (!newadmin && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const adminRef = doc(firestore, "admin", newadmin.user.uid);
			const adminSnap = await getDoc(adminRef);

			if (adminSnap.exists()) {
				// login
				const adminDoc = adminSnap.data();
				localStorage.setItem("admin-info", JSON.stringify(adminDoc));
				loginadmin(adminDoc);
			} else {
				// signup
				const adminDoc = {
					uid: newadmin.user.uid,
					email: inputs.email,
					adminname: inputs.adminname,
					questions: [],
					role: "admin",
				};
				await setDoc(doc(firestore, "admins", newadmin.user.uid), adminDoc);
				localStorage.setItem("admin-info", JSON.stringify(adminDoc));
				loginadmin(adminDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
			<Image src='/google.png' w={5} alt='Google logo' />
			<Text mx='2' color={"blue.500"}>
				{prefix} with Google
			</Text>
		</Flex>
	);
};

export default GoogleAuth;
