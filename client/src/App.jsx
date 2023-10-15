import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import NavBar from './components/NavBar';
import {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import {ChatContextProvider} from './context/ChatContext';

function App() {
	const {user} = useContext(AuthContext);
	return (
		<ChatContextProvider user={user}>
			<NavBar />
			<Routes>
				<Route path='/' element={user ? <Chat /> : <Login />} />
				<Route path='/login' element={user ? <Chat /> : <Login />} />
				<Route path='/register' element={user ? <Chat /> : <Register />} />
				{/* If any path that does not exist , we will be navigated to the home route i.e "/" */}
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</ChatContextProvider>
	);
}

export default App;
