import { TextField } from '@mui/material';
import React from 'react';
import InputMask from 'react-input-mask';

export const isValidCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs com todos os dígitos iguais
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

export function CNPJInput(props: {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
}) {
  return (
    <InputMask
      mask="99.999.999/9999-99"
      value={props.value}
      onChange={props.onChange}
    >
      <TextField
        fullWidth
        size="small"
        id="outlined-number"
        label="CNPJ"
        error={props.error}
        helperText={props.error ? 'CNPJ inválido' : ''}
      />
    </InputMask>
  );
}
