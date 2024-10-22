import { TextField } from '@mui/material';
import React from 'react';
import InputMask from 'react-input-mask';

export const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica se tem 11 dígitos ou é uma sequência repetida

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export function CPFInput(props: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
}) {
  return (
    <InputMask
      mask="999.999.999-99"
      value={props.value}
      onChange={props.onChange}
    >
      <TextField
        fullWidth
        size="small"
        id="outlined-number"
        label="CPF"
        error={props.error}
        helperText={props.error ? 'CPF inválido' : ''}
      />
    </InputMask>
  );
}
