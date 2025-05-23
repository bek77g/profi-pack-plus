import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CustomContext } from '../../hoc/mainContentContext';
import './AuthModal.scss';

const AuthModal = ({ isOpen, onClose }) => {
	const [email, setEmail] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [step, setStep] = useState('email');
	const [error, setError] = useState('');
	const [timer, setTimer] = useState(0);
	const { setUser } = useContext(CustomContext);

	useEffect(() => {
		let interval;
		if (timer > 0) {
			interval = setInterval(() => setTimer(prev => prev - 1), 1000);
		}
		return () => clearInterval(interval);
	}, [timer]);

	const handleEmailSubmit = async e => {
		e.preventDefault();
		try {
			await axios.post('/api/email/send-code', { email });
			setStep('code');
			setError('');
			setTimer(30);
		} catch (err) {
			setError(err.response?.data?.message || 'Error sending code');
		}
	};

	const handleCodeVerification = async e => {
		e.preventDefault();
		try {
			const { data } = await axios.post('/api/email/verify', {
				email,
				code: verificationCode,
			});

			localStorage.setItem('jwt', data.jwt);
			axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
			setUser(data.user);
			setStep('email');
			setEmail('');
			setVerificationCode('');
			onClose();
		} catch (err) {
			setError(err.response?.data?.message || 'Invalid code');
		}
	};

	const handleResendCode = async () => {
		if (timer > 0) return;
		try {
			await axios.post('/api/email/send-code', { email });
			setTimer(30);
			setError('');
		} catch (err) {
			setError(err.response?.data?.message || 'Error resending code');
		}
	};

	if (!isOpen) return null;

	return (
		<div className='auth-modal'>
			<div className='auth-modal__content'>
				<button className='auth-modal__close' onClick={onClose}>
					×
				</button>
				<h2>Авторизация</h2>
				{error && <div className='auth-modal__error'>{error}</div>}

				{step === 'email' ? (
					<form onSubmit={handleEmailSubmit}>
						<div className='auth-modal__input-group'>
							<label>Email адрес</label>
							<input
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='example@mail.com'
								required
							/>
						</div>
						<button type='submit' className='auth-modal__submit'>
							Получить код
						</button>
					</form>
				) : (
					<>
						<form onSubmit={handleCodeVerification}>
							<div className='auth-modal__input-group'>
								<label>
									Введите код, отправленный на указанную почту - <b>{email}</b>.
									Проверьте также папку "Спам" <br />
									<button
										onClick={() => setStep('email')}
										className='auth-modal__change-email'>
										Изменить email
									</button>
								</label>
								<input
									type='text'
									value={verificationCode}
									onChange={e => setVerificationCode(e.target.value)}
									placeholder='123456'
									maxLength='6'
									required
								/>
							</div>
							<button type='submit' className='auth-modal__submit'>
								Войти
							</button>
						</form>
						<button
							onClick={handleResendCode}
							disabled={timer > 0}
							className='auth-modal__resend'>
							{timer > 0
								? `Отправить код повторно (${timer}с)`
								: 'Отправить код повторно'}
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default AuthModal;
