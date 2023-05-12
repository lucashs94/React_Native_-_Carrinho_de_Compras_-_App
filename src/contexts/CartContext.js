import { useState, createContext } from "react";


export const CartContext = createContext({})

function CartProvider({ children }) {

  const [cart, setCart] = useState([])

  
  function addItemCart( newItem ){
    const index = cart.findIndex( item => item.id === newItem.id )

    if(index !== -1){
      let cartList = cart

      cartList[index].amount += 1
      cartList[index].total = cartList[index].amount * cartList[index].price

      setCart(cartList)
      return
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    }

    setCart( products => [...products, data])
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        addItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider