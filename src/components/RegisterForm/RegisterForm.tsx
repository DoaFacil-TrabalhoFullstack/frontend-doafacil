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
  Switch,
  FormControlLabel,
} from '@mui/material';
import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import httpClient from '../../shared/http-client/http-client';
import { ApiError } from '../../shared/interfaces/ApiError.interface';
import { Auth } from '../../shared/interfaces/Auth.interface';
import { useAuth } from '../../context/AuthProvider';

import { isValidCNPJ, CNPJInput } from './CNPJInput';
import { CPFInput, isValidCPF } from './CPFInput';

import './RegisterForm.css';

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //inputs
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [cpfInput, setCpfInput] = useState<string>('');
  const [cnpjInput, setCnpjInput] = useState<string>('');

  //erros
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>();
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [cpfError, setCpfError] = useState<boolean>(false);
  const [cnpjError, setCnpjError] = useState<boolean>(false);

  // response
  const [formValid, setFormValid] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  // option CPF/CNPJ
  const [checked, setChecked] = useState<boolean>(false);

  // form email
  const isEmail = (email: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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

  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };

  const handleConfirmPassword = () => {
    if (!passwordInput) {
      setPasswordError(true);
      return;
    }

    if (confirmPasswordInput !== passwordInput) {
      setConfirmPasswordError(true);
      return;
    }
  };

  //Validation email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  //Validation Phone
  const handlePhone = () => {
    if (!phoneInput) {
      setPhoneError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation CPF
  const handleChangeCpf = (event: { target: { value: string } }) => {
    const cpfValue = event.target.value;
    setCpfInput(cpfValue);

    // Valida o CPF após remover a máscara
    if (cpfValue.length === 14) {
      // Só tenta validar se o CPF estiver completo
      setCpfError(!isValidCPF(cpfValue));
    } else {
      setCpfError(false);
    }
  };

  //validation CNPJ
  const handleChangeCnpj = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cnpjValue = event.target.value;
    setCnpjInput(cnpjValue);

    // Valida o CNPJ após remover a máscara
    if (cnpjValue.length === 18) {
      // Só tenta validar se o CNPJ estiver completo
      setCnpjError(!isValidCNPJ(cnpjValue));
    } else {
      setCnpjError(false);
    }
  };

  const isValidFormValues = (): boolean => {
    const validations = [
      {
        condition: usernameError || !usernameInput,
        message: 'Preencha o campo username.',
      },
      { condition: emailError || !emailInput, message: 'Email inválido.' },
      {
        condition: phoneError || !phoneInput,
        message: 'Preencha o campo telefone.',
      },
      {
        condition: passwordError || !passwordInput,
        message: 'A senha precisa ter pelo menos 5 caracteres.',
      },
      {
        condition: confirmPasswordInput !== passwordInput,
        message: 'As senhas precisam ser iguais.',
      },
      {
        condition: (cpfError && cnpjError) || (!cpfInput && !cnpjInput),
        message: 'Preencha o campo CPF/CNPJ.',
      },
    ];

    for (const { condition, message } of validations) {
      if (condition) {
        setFormValid(message);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isValidFormValues()) {
      const createUserPayload = {
        name: usernameInput,
        email: emailInput,
        password: passwordInput,
        phone: phoneInput,
        ...(!checked
          ? { cpf: cpfInput.replace(/[^\d]+/g, '') }
          : { cnpj: cnpjInput.replace(/[^\d]+/g, '') }),
      };

      try {
        const result = await httpClient.post<Auth>(
          'users/create',
          createUserPayload,
        );

        const { token } = result.data;

        login({}, token);

        navigate('/home');
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          const error = e.response?.data as ApiError;

          setError(error.message);
        }
      }
    }
  };

  return (
    <div className="containerRegisterForm">
      <p>
        <TextField
          id="outlined-basic"
          error={usernameError}
          label="Username"
          value={usernameInput}
          onChange={(event) => setUsernameInput(event.target.value)}
          onBlur={handleUsername}
          variant="outlined"
          fullWidth
          size="small"
        />
      </p>
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

      <p>
        <TextField
          id="outlined-basic"
          error={phoneError}
          label="Telefone"
          value={phoneInput}
          onChange={(event) => setPhoneInput(event.target.value.toString())}
          onBlur={handlePhone}
          variant="outlined"
          type="text"
          fullWidth
          size="small"
        />
      </p>

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

      <p>
        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
          <InputLabel
            error={confirmPasswordError}
            htmlFor="outlined-adornment-password"
          >
            Confirmar senha
          </InputLabel>
          <OutlinedInput
            error={confirmPasswordError}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={confirmPasswordInput}
            onChange={(event) => setConfirmPasswordInput(event.target.value)}
            onBlur={handleConfirmPassword}
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
            label="Confirmar senha"
          />
        </FormControl>
      </p>

      <p style={{ display: 'flex' }}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChangeChecked}
              inputProps={{ 'aria-label': 'controlled' }}
              color="default"
            />
          }
          label={checked ? 'CNPJ' : 'CPF'}
        />
        {checked ? (
          <CNPJInput
            value={cnpjInput}
            onChange={handleChangeCnpj}
            error={cnpjError}
          />
        ) : (
          <CPFInput
            value={cpfInput}
            onChange={handleChangeCpf}
            error={cpfError}
          />
        )}
      </p>

      <p>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<LoginIcon />}
          fullWidth
        >
          REGISTRAR
        </Button>
      </p>

      <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>
      <p>{error && <Alert severity="error">{error}</Alert>}</p>
    </div>
  );
}
