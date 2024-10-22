import * as React from 'react';
import './styles.css';
import { Paper, Chip, Switch } from '@mui/material';
import { Face, Lock } from '@mui/icons-material';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function Login() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="container">
      <Paper elevation={3} style={{ padding: '10px', width: '25%' }}>
        <div className="checkedButton">
          {checked ? (
            <Chip
              icon={<Face />}
              label="Cadastrar"
              color="primary"
              variant="outlined"
            />
          ) : (
            <Chip
              icon={<Lock />}
              label="Login"
              color="primary"
              variant="outlined"
            />
          )}

          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>

        {checked ? <RegisterForm /> : <LoginForm />}
      </Paper>
    </div>
  );
}
