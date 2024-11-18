import React from 'react';
import './ProductCard.css';

interface ProductProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const ProductCard: React.FC<ProductProps> = ({
  title,
  description,
  imageUrl,
  url,
}) => {
  return (
    <a href={url} className="linkProduct">
      <img
        src={imageUrl}
        alt={title}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <h3 className="productTitle">{title}</h3>
      <p className="productDescription">{description}</p>
    </a>
  );
};

export default ProductCard;
