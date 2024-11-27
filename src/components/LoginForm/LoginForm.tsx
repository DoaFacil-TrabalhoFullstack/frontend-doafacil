import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
  Alert,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import httpClient from '../../shared/http-client/http-client';
import { Auth } from '../../shared/interfaces/Auth.interface';
import { useAuth } from '../../context/AuthProvider';
import { ApiError } from '../../shared/interfaces/ApiError.interface';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //inputs
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>();

  //erross
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // validate form
  const [formValid, setFormValid] = useState<string | null>();

  // validação de email
  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (emailError || !emailInput) {
      setFormValid('Email inválido.');
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid('A senha precisa ter pelo menos 5 caracteres.');
      return;
    }

    const loginUserPayload = {
      email: emailInput,
      password: passwordInput,
    };

    try {
      const result = await httpClient.post<Auth>('auth', loginUserPayload);

      const { token } = result.data;

      localStorage.setItem('emailUser', loginUserPayload.email);

      console.log(result.data);
      alert('Logado com sucesso');

      login({}, token);

      navigate('/');
      window.location.reload();
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        const error = e.response?.data as ApiError;

        setFormValid(error.message);
      }
    }

    setFormValid(null);
  };

  // Validation password
  const handlePassword = () => {
    if (!passwordInput) {
      setPasswordError(true);
      return;
    }

    if (passwordInput.length < 5) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //Validation email

  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  return (
    <div className="containerLoginForm">
      <p>
        <TextField
          id="outlined-basic"
          error={emailError}
          label="Email"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          onBlur={handleEmail}
          variant="outlined"
          fullWidth
          size="small"
        />
      </p>

      {/* Senha - começo */}
      <p>
        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
          <InputLabel
            error={passwordError}
            htmlFor="outlined-adornment-password"
          >
            Senha
          </InputLabel>
          <OutlinedInput
            error={passwordError}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            onBlur={handlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
        </FormControl>
      </p>
      {/* Senha - fim */}

      {/* <div>
        <Checkbox
          onChange={(event) => setRememberMe(event.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />{' '}
        <span className="rememberMe">Lembrar-me</span>
      </div> */}

      <p>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<LoginIcon />}
          fullWidth
        >
          LOGIN
        </Button>
      </p>

      <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>
    </div>
  );
}
