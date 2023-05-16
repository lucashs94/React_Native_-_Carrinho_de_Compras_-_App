import { useState, createContext } from "react";


export const CartContext = createContext({})


export default function CartProvider({ children }) {

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  
  function addItemCart( newItem ){
    const index = cart.findIndex( item => item.id === newItem.id )

    if(index !== -1){
      let cartList = cart

      cartList[index].amount += 1
      cartList[index].total = cartList[index].amount * cartList[index].price

      setCart(cartList)
      totalCart(cartList)
      return
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    }

    setCart( products => [...products, data])
    totalCart([...cart, data])
  }
  

  function removeItemCart( newItem ){
    const index = cart.findIndex( item => item.id === newItem.id )

    if(cart[index]?.amount > 1){
      let cartList = cart

      cartList[index].amount -= 1
      cartList[index].total = cartList[index].amount * cartList[index].price

      setCart(cartList)
      totalCart(cartList)
      return
    }

    const removeItem = cart.filter( item => item.id !== newItem.id )

    setCart(removeItem)
    totalCart(removeItem)
  }


  function totalCart( items ){
    let myCart = items
    let result = myCart.reduce( (acc, obj) => { return acc + obj.total }, 0)

    setTotal(result.toFixed(2))
  }

  
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemCart,
        removeItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}