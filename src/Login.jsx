import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function Login() {


  const navigate=useNavigate();





  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login with Google</h1>
        <GoogleLogin
          onSuccess={credentialResponse => {

            const token=credentialResponse.credential;
            localStorage.setItem('token',token)
            navigate('customerList')

          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </div>
  );
}
