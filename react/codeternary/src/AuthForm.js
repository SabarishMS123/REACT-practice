
import { useLocation, Link } from 'react-router-dom';

export default function AuthForm() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div >
      <h2>
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form >
        {!isLogin && (
          <div>
            <label>Full Name</label>
            <input  type="text" required />
             </div>
        )} 
         <div>
          <label>Email</label>
          <input
            type="email"
            required
           
          />
        </div>
        <div>
          <label>{isLogin ? 'Password' : 'Password'}</label>
          <input type="password" required />
        </div>

        
        {!isLogin && (
          <div>
            <label>Confirm Password</label>
            <input type="password"  required  style={{ width: '100%', padding: '8px', marginTop: '5px' }}/>
          </div>
        )}

     
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#1db54aff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>


      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Link to={isLogin ? '/register' : '/login'}>
          {isLogin ? 'Sign up' : 'Log in'}
        </Link>
      </p>
    </div>
  );
}