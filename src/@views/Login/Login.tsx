import Typography from '@common/Typography';
import { LoginState, useAppContext } from '@context/app';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import apiService, { type LoginPayload } from '@services/api';
import storageService from '@services/storage';
import titleService from '@services/title';
import { type FormEvent, useLayoutEffect } from 'react';

const Login = () => {
  useLayoutEffect(() => {
    titleService.setTitle('Login');
  }, []);

  const { setIsLoggedIn } = useAppContext();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(
      new FormData(form),
    ) as unknown as LoginPayload;
    const response = await apiService.authentication.login(data);
    if (response) {
      storageService.set('user', response);
      setIsLoggedIn(LoginState.Valid);
    }
  };

  return (
    <div className="w-[300px] h-screen flex flex-col justify-center items-center mx-auto">
      <Typography variant="body2" className="pb-5">
        Enter your email and password
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <TextField
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" size="large" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
