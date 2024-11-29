import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cpfOrCnpj: '',
  });

  const [loading, setLoading] = useState(false);

  // chama user no backend
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchedData = {
        name: 'JOAO',
        email: 'joao@example.com',
        password: '123456',
        phone: '11999999999',
        cpfOrCnpj: '123.456.789-00',
      };
      setUserData(fetchedData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Dados enviados: ', userData);
  };

  if (loading) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
          background: 'white',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Alterar informações do seu perfil
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                variant="outlined"
                type="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CPF ou CNPJ"
                name="cpfOrCnpj"
                value={userData.cpfOrCnpj}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                fullWidth
              >
                Atualizar Informações
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
