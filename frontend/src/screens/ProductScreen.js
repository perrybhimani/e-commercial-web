import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import  Rating  from '../components/Rating';


function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');
  const [pageview, setPageview] = useState(true);
  const userSignin = useSelector((state) => state.userSignin);
  
  const productList = useSelector((state) => state.productList);
  
  const [listName, setlistName] = useState(productList.data?productList.data:'NA');

  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
   
  dispatch(detailsProduct(props.match.params.id,listName));
  
    return () => {
    };
  }, []);

 
  const handleAddToCart = () => {

    window.dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': 'EUR',
        'add': {
          'actionField': { 'list': listName },
          'products': [{
            'name': product.name,
            'id': product.id,
            'price': product.price,
            'brand': product.brand,
            'category': product.category,
            'variant': product.description,
            'quantity': qty
          }]
        }
      }
    });

    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  
  const datalayer = (product) => {
   // console.log("help" +loading)
  }
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <> {datalayer(product)}
          <div className="details" >
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                <a href="#reviews">
                  <Rating  rating={product.rating}
                    numReviews={product.numReviews}>

                  </Rating>
               
                   </a>
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Price: {product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>

                  <button
                    onClick={handleAddToCart}
                    className="button primary"
                  >
                    Add to Cart
                  </button>

                </li>
              </ul>
            </div>
          </div>

        </>
      )}
    </div>
  );
}
export default ProductScreen;
