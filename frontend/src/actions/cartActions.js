import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING,CART_SAVE_PAYMENT } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM, payload: {
        _id: data._id,
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        brand: data.brand,
        category: data.category,
        description: data.description,
        qty
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

  } catch (error) {

  }
}
const removeFromCart = (productId) => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();
  var product = cartItems.filter(x => x.product == productId);
 console.log("remove:"+product[0]._id)
  window.dataLayer.push({
    'event': 'removeFromCart',
    'ecommerce': {
      'remove': {                               
        'products':[{'id': product[0]._id,
        'name': product[0].name,
        'price': product[0].price,
        'brand':  product[0].brand,
        'category':  product[0].category,
        'variant': product[0].description,
        'quantity':product[0].qty}]
      }
    }
  });
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
 //const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
export { addToCart, removeFromCart, saveShipping, savePayment }