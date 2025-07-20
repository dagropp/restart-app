import { lazy } from 'react';

const LoginComponent = lazy(() => import('./LoginComponent'));

const Login = () => <LoginComponent />;

export default Login;
