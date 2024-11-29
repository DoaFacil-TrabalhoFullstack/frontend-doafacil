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
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cpf: '',
    cnpj: '',
  });

  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('emailUser');

    if (!email || !token) {
      console.error('Usuarios não localizados');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8080/v1/users/list', {
        params: { emailUser: email },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;
      console.log(response.data);

      setUserData({
        name: user.name,
        email: user.email,
        password: '',
        phone: user.phone,
        cpf: user.cpf,
        cnpj: user.cnpj,
      });
    } catch (error: any) {
      console.error(
        'Erro ao buscar os dados do usuário:',
        error.response || error,
      );
    } finally {
      setLoading(false);
    }
  };

  // chama user no backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        'http://localhost:8080/v1/users/update',
        {
          name: userData.name,
          email: userData.email, // Email deve ser enviado, pois ele identifica o usuário
          phone: userData.phone,
          cpf: userData.cpf,
          cnpj: userData.cnpj,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Usuário atualizado com sucesso:', response.data);
      alert('Informações atualizadas com sucesso!');
    } catch (error: any) {
      console.error(
        'Erro ao atualizar as informações do usuário:',
        error.response || error,
      );
      alert('Erro ao atualizar as informações. Tente novamente.');
    }
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
                value={userData.cpf ? userData.cpf : userData.cnpj}
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
