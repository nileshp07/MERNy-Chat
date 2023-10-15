import {useContext} from 'react';
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import {AuthContext} from '../context/AuthContext';
import sideImg from './../../public/sideImg.png';

function Login() {
	const {loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading} =
		useContext(AuthContext);

	return (
		<Stack direction='horizontal' style={{height: '86vh', overflow: 'hidden'}}>
			<img src={sideImg} alt='Side Image' className='side-img' />
			<Form onSubmit={loginUser} className='form'>
				<Row
					style={{
						height: '100vh',
						justifyContent: 'center',
						paddingTop: '10%',
					}}
				>
					<Col xs={6}>
						<Stack gap={3}>
							<h2>Login</h2>
							<Form.Control
								type='email'
								placeholder='Email'
								onChange={(e) =>
									updateLoginInfo({...loginInfo, email: e.target.value})
								}
							/>
							<Form.Control
								type='password'
								placeholder='Password'
								onChange={(e) =>
									updateLoginInfo({...loginInfo, password: e.target.value})
								}
							/>
							<Button variant='primary' type='submit'>
								{isLoginLoading ? 'Getting you in...' : 'Login'}
							</Button>

							{loginError?.error && (
								<Alert variant='danger'>
									<p>{loginError?.message}</p>
								</Alert>
							)}
						</Stack>
					</Col>
				</Row>
			</Form>
		</Stack>
	);
}

export default Login;
