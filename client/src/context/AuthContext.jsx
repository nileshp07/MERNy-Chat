import {createContext, useCallback, useState, useEffect} from 'react';
import {baseUrl, postRequest} from '../utils/services';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [registerError, setRegisterError] = useState(null);
	const [isRegisterLoading, setIsRegisterLoading] = useState(false);
	const [registerInfo, setRegisterInfo] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [loginError, setLoginError] = useState(null);
	const [isLoginLoading, setIsLoginLoading] = useState(false);
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});

	console.log('user:', user);
	console.log('loginInfo:', loginInfo);

	useEffect(() => {
		const user = localStorage.getItem('User');

		setUser(JSON.parse(user));
	}, []);

	const updateRegisterInfo = useCallback((info) => {
		setRegisterInfo(info);
	}, []);

	const updateLoginInfo = useCallback((info) => {
		setLoginInfo(info);
	}, []);

	const registerUser = useCallback(
		async (e) => {
			e.preventDefault();
			setIsRegisterLoading(true);
			setRegisterError(null);

			const response = await postRequest(
				`${baseUrl}/users/register`,
				JSON.stringify(registerInfo)
			);

			setIsRegisterLoading(false);

			if (response.error) {
				return setRegisterError(response);
			}

			localStorage.setItem('User', JSON.stringify(response?.data));
			setUser(response.data);
		},
		[registerInfo]
	);

	const logoutUser = useCallback(() => {
		localStorage.removeItem('User');
		setUser(null);
	}, []);

	const loginUser = useCallback(
		async (e) => {
			e.preventDefault();
			setIsLoginLoading(true);
			setLoginError(null);

			const response = await postRequest(
				`${baseUrl}/users/login`,
				JSON.stringify(loginInfo)
			);

			setIsLoginLoading(false);

			if (response.error) {
				return setLoginError(response);
			}

			localStorage.setItem('User', JSON.stringify(response?.data));
			setUser(response.data);
		},
		[loginInfo]
	);

	return (
		<AuthContext.Provider
			value={{
				user,
				registerInfo,
				updateRegisterInfo,
				registerError,
				registerUser,
				isRegisterLoading,
				logoutUser,
				loginUser,
				loginError,
				loginInfo,
				updateLoginInfo,
				isLoginLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};