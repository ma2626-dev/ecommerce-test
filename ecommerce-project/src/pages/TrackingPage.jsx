import dayjs from 'dayjs';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { Header } from '../components/Header';
import './TrackingPage.css';
import { useEffect,useState } from 'react';



export function TrackingPage({ cart }) {
  const [order, setOrder] = useState(null);
  const {orderId, productId} = useParams();
  
  useEffect(() => {
    const fetchOrderData = async () => {
      if(!orderId) return;
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchOrderData();
  }, [orderId]);

  if(!order) {
    return <div className="tracking-page-loading">Loading Order Details...</div>;
  }

  const orderProduct = order.products.find(
    // Compare the product's actual ID (item.product.id) to the ID from the URL (productId)
    item => String(item.product.id) === String(productId) 
  );

  const deliveryDate = dayjs(orderProduct.estimatedDeliveryTimeMs).format('ddd, MMMM D');
  const productName = orderProduct.product.name;
  const productImage = orderProduct.product.image;
  const productQuantity = orderProduct.quantity;



  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryProgressPercent = ((timePassedMs / totalDeliveryTimeMs) * 100);
  if(deliveryProgressPercent > 100){
    deliveryProgressPercent = 100
  }


  let isPreparing = false;
  let isShipped = false;
  let isDelivered = false;



  if (deliveryProgressPercent >= 100) { 
    isDelivered = true;
  }
  else if (deliveryProgressPercent >= 33 <100) {
    isShipped = true;
  }
  else { 
    isPreparing = true;
  }








  return (
    <>

      <title>Tracking</title>

      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />


      <Header cart={cart} />


      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryProgressPercent >= 100 ? `Delivered on: ${deliveryDate}` : `Arriving on: ${deliveryDate}`}
          </div>

          <div className="product-info">
            {productName}
          </div>

          <div className="product-info">
            Quantity: {productQuantity}
          </div>

          <img className="product-image" src={productImage} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryProgressPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  )
}


