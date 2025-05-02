import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in with your Google account to access your dashboard and manage your customers.
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              localStorage.setItem('token', token);
              navigate('customerList');
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        <p className="mt-6 text-sm text-gray-500 text-center">
          Your information is kept secure and private. We never post without your permission.
        </p>
      </div>
    </div>
  );
}
