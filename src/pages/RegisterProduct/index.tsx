import React, { useState } from 'react';

import './index.css';
import httpClient from '../../shared/http-client/http-client';

function RegisterProduct() {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [formValid, setFormValid] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await httpClient.post('products/create', formData);
      console.log('Product registered:', result.data);

      setFormData({ name: '', description: '' });
      alert("Produto cadastrado com sucesso!");
      
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormValid(e.message || 'An error occurred');
      } else {
        setFormValid('Something went wrong!');
      }
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de produto</h1>
      {formValid && <p>{formValid}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterProduct;
