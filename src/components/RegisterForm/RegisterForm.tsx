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

import { CPFInput, isValidCPF } from './CPFInput';
import { isValidCNPJ, CNPJInput } from './CNPJInput';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //inputs
  const [usernameInput, setUsernameInput] = useState<string>();
  const [emailInput, setEmailInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>();
  const [passwordInput, setPasswordInput] = useState<string>();
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>();
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
  const [success, setSuccess] = useState<string | null>();

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (usernameError || !usernameInput) {
      setFormValid('Preencha o campo username.');
      return;
    }

    if (emailError || !emailInput) {
      setFormValid('Email inválido.');
      return;
    }

    if (phoneError || !phoneInput) {
      setFormValid('Preencha o campo telefone');
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid('A senha precisa ter pelo menos 5 caracteres.');
      return;
    }

    if (confirmPasswordInput !== passwordInput) {
      setFormValid('As senhas precisam ser iguais.');
      return;
    }

    if ((cpfError && cnpjError) || (!cpfInput && !cnpjError)) {
      setFormValid('Preencha o campo CPF/CNPJ.');
      return;
    }

    setFormValid(null);

    console.log(usernameInput);
    console.log(emailInput);
    console.log(passwordInput);
    console.log(cpfInput);
    console.log(cnpjInput);

    setSuccess('Cadastrado com sucesso');
  };

  return (
    <div>
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
          type="number"
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
      {/* Senha - fim */}

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
      <p>{success && <Alert severity="success">{success}</Alert>}</p>
    </div>
  );
}
