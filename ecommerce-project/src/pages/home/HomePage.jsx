import { useSearchParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css'

export function HomePage({ cart, loadCart }) {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  const search = searchParams.get('search');


  useEffect(() => {
    const fetchHomeData = async () => {
      if(search){
        const response = await axios.get(`/api/products?search=${search}`);
        setProducts(response.data);
      }
      else{
        const response = await axios.get('/api/products');
        setProducts(response.data);
      }
    }

    fetchHomeData();
  }, [search]);
  

  return (
    <>
      <title>Ecommerce Project</title>

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />


      <Header cart={cart} />



      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart}/>
      </div>
    </>
  );
}