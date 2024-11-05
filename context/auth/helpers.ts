export async function saveCookies(token: string){
	return await fetch("/api/auth", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

export default function firebaseErrors(error:string) {
	if (error === "auth/invalid-email") return "Invalid email";
	if (error === "auth/user-disabled") return "User is disabled";
	if (error === "auth/user-not-found") return "User not found";
	if (error === "auth/wrong-password") return "Wrong password";
	if (error === "auth/invalid-verification-code") return "Invalid verification code";
	if (error === "auth/invalid-phone-number") return "Invalid phone number";

	if (error === "auth/too-many-requests")
		return "Too many requests, try again later";
	if (error === "auth/email-already-in-use") return "Email already in use, try another one";
	if (error === "auth/weak-password")
		return "Password is too weak, try a stronger one";
	if(error === "auth/invalid-credential") return "Incorrect password";

	return error;
}