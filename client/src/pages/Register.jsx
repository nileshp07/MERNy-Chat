import {useContext} from 'react';
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import {AuthContext} from '../context/AuthContext';
import sideImg from './../../public/sideImg.png';

function Register() {
	const {
		registerInfo,
		updateRegisterInfo,
		registerUser,
		registerError,
		isRegisterLoading,
	} = useContext(AuthContext);

	return (
		<>
			<Stack
				direction='horizontal'
				style={{height: '86vh', overflow: 'hidden'}}
			>
				<img src={sideImg} alt='Side Image' className='side-img' />
				<Form onSubmit={registerUser} className='form'>
					<Row
						style={{
							height: '100vh',
							justifyContent: 'center',
							paddingTop: '10%',
						}}
					>
						<Col xs={6}>
							<Stack gap={3}>
								<h2>Register</h2>
								<Form.Control
									type='text'
									placeholder='Name'
									onChange={(e) =>
										updateRegisterInfo({...registerInfo, name: e.target.value})
									}
								/>
								<Form.Control
									type='email'
									placeholder='Email'
									onChange={(e) =>
										updateRegisterInfo({...registerInfo, email: e.target.value})
									}
								/>
								<Form.Control
									type='password'
									placeholder='Password'
									onChange={(e) =>
										updateRegisterInfo({
											...registerInfo,
											password: e.target.value,
										})
									}
								/>
								<Button variant='primary' type='submit'>
									{isRegisterLoading ? 'Creating your account...' : 'Register'}
								</Button>

								{registerError?.error && (
									<Alert variant='danger'>
										<p>{registerError?.message}</p>
									</Alert>
								)}
							</Stack>
						</Col>
					</Row>
				</Form>
			</Stack>
		</>
	);
}

export default Register;
