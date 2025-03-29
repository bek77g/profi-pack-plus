import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CustomContext } from '../../hoc/mainContentContext';
import './AuthModal.scss';

const AuthModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState('email'); // 'email' or 'code'
    const [error, setError] = useState('');
    const { setUser } = useContext(CustomContext);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/email/send-code', { email });
            setStep('code');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending code');
        }
    };

    const handleCodeVerification = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/email/verify', {
                email,
                code: verificationCode
            });
            
            localStorage.setItem('jwt', data.jwt);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwt}`;
            setUser(data.user);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid code');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal">
            <div className="auth-modal__content">
                <button className="auth-modal__close" onClick={onClose}>×</button>
                <h2>Авторизация</h2>
                {error && <div className="auth-modal__error">{error}</div>}
                
                {step === 'email' ? (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="auth-modal__input-group">
                            <label>Email адрес</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                                required
                            />
                        </div>
                        <button type="submit" className="auth-modal__submit">
                            Получить код
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCodeVerification}>
                        <div className="auth-modal__input-group">
                            <label>Код из Email</label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="123456"
                                maxLength="6"
                                required
                            />
                        </div>
                        <button type="submit" className="auth-modal__submit">
                            Войти
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
