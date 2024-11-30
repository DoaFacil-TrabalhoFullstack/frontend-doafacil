import React from 'react';

import './ProductCard.css';
import { Product } from '../../shared/interfaces/Product.interface';

const ProductCard: React.FC<Product> = (produto: Product) => {
  return (
    <div className="cardProduct" key={produto.id}>
      <div className="cardProductTitle">
        <span>{produto.name}</span>
      </div>
      <div className="cardProductDescription">
        <span>{produto.description}</span>
      </div>
      <a className="LinkSeeMore" href={'/produto/' + produto.id}>
        Ver mais
      </a>
    </div>
  );
};

export default ProductCard;
