import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Authentication = (props) => {
  const { handleCloseModal } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const { signup, login, resetPassword } = useAuth();

  const handleAuthenticate = async () => {
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    )
      return;

    try {
      setIsAuthenticating(true);
      setError(null);

      if (isRegistration) {
        // register a user
        await signup(email, password);
      } else {
        // login a user
        await login(email, password);
      }
      handleCloseModal();
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setResetMessage(
        'Password reset email has been sent. Please check your inbox.'
      );
    } catch (error) {
      setResetMessage(error.message);
    }
  };

  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? 'Sign Up' : 'Login'}</h2>
      <p>
        {isRegistration ? 'Create an account!' : 'Sign in to your account!'}
      </p>
      {error && <p>❌ {error}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        type="password"
      />
      <button onClick={handleAuthenticate}>
        <p>{`${isAuthenticating ? 'Authenticating...' : 'Submit'}`}</p>
      </button>
      <hr />
      <div className="register-container">
        {!isResettingPassword ? (
          <>
            <div className="signin-signup">
              <p>
                {isRegistration
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </p>
              <button onClick={() => setIsRegistration(!isRegistration)}>
                <p>{isRegistration ? 'Sign in' : 'Sign Up'}</p>
              </button>
            </div>
            <div className="reset-password">
              <p>{isRegistration ? '' : 'Forget your password?'}</p>
              <button onClick={() => setIsResettingPassword(true)}>
                <p>{isRegistration ? '' : 'Reset your Password'}</p>
              </button>
            </div>
          </>
        ) : (
          <>
            {!resetMessage ? (
              <form
                onSubmit={handleResetPassword}
                className="reset-password-form"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
                <button type="submit">Send Reset Link</button>
              </form>
            ) : (
              <p className="reset-message">{resetMessage}</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Authentication;
