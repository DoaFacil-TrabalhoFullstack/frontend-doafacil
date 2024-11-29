import React, { useEffect, useState } from 'react';

import Footer from '../../components/Footer/Footer';

import './styles.css';
import httpClient from '../../shared/http-client/http-client';
import { Product } from '../../shared/interfaces/Product.interface';

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const quantityHomeProducts = 5;

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await httpClient.get<Product[]>('/products/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  //Filtrando por produtos (Novo, destaque e mais doado)

  // const filtercate = (x: string) => {
  //   const filterproduct = homeProduct.filter((curElm) => {
  //     return curElm.type === x
  //   })
  //   setTrendingProduct(filterproduct)
  // }
  //produtos em alta

  return (
    <>
      <div className="home">
        <div className="trending">
          <div className="container">
            <div className="container_box">
              <div className="header">
                <div className="heading">
                  <h2 style={{ color: 'white' }}>Produtos recém adicionados</h2>
                </div>
              </div>

              <div className="products">
                <div className="containerProducts">
                  {products
                    .slice(0, quantityHomeProducts)
                    .map((currentProduct) => {
                      return (
                        <Card
                          sx={{ minWidth: 275, margin: '50px 10px' }}
                          key={currentProduct.id}
                        >
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {currentProduct.name}
                            </Typography>
                            <Typography variant="body2">
                              {currentProduct.description}
                              <br />
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              variant="contained"
                              href={'/produto/' + currentProduct.id}
                            >
                              Ver mais
                            </Button>
                          </CardActions>
                        </Card>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
