import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { formatMoney } from "../../utils/money";



export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isUpdating && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select(); // Optional: selects all text for quick replacement
    }
  }, [isUpdating]);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const toggleUpdater = () => {
    if (isUpdating) {
      setQuantity(cartItem.quantity);
    }
    setIsUpdating(!isUpdating);
  };

  const saveInputValue = (event) => {
    const eventValue = Number(event.target.value)
    if (eventValue >= 1 || event.target.value === '') {
        setQuantity(eventValue); // Keep as string for better input handling
    }
  }

  const updateCart = async () => {
    // Convert the quantity state to a number for the API call
    const newQuantity = Number(quantity);
    
    // Check if the quantity has changed and is a valid number
    if (newQuantity > 0 && newQuantity !== cartItem.quantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: newQuantity
      })
      await loadCart() // Reload the cart to show the updated quantity
      setIsUpdating(false)
    } else {
        // If no change or invalid input (like '0' or a non-numeric string),
        // just exit update mode and reload the original quantity.
        setIsUpdating(false)
        setQuantity(cartItem.quantity);
    }
  }



  // Decide which function to run when the "Update/Save" link is clicked
  const handleUpdateClick = async () => {
    if (isUpdating) {
      await updateCart();
    } else {
      toggleUpdater();
    }
  }



  const changeInputByKey = async (event) => {
    const enter = event.key
    if(enter === 'Enter') {
      handleUpdateClick();
    }
    else if(enter === 'Escape') {
      setIsUpdating(false)
      setQuantity(cartItem.quantity);
    }
  }

  
  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: 
            {isUpdating 
              ? <input 
                  value={quantity} 
                  ref={inputRef}                  
                  onChange={saveInputValue} 
                  onKeyDown={changeInputByKey}
                  type="number" 
                  min="1" 
                  className="quantity-updater"
                /> 
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span onClick={handleUpdateClick} className="update-quantity-link link-primary">
            {isUpdating ? 'Save' : 'Update'}
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}