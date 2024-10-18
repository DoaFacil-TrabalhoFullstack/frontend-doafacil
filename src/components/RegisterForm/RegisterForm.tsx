import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import React from 'react';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);

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

  return (
    <div>
      <p>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          fullWidth
          size="small"
        />
      </p>
      <p>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
        />
      </p>

      <p>
        <FormControl sx={{ width: '100%' }} variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
        <Button variant="contained" startIcon={<LoginIcon />} fullWidth>
          REGISTRAR
        </Button>
      </p>
    </div>
  );
}
