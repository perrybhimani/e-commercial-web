import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Searchbox from '../components/Searchbox';

function HomeScreen(props) {
  var queryparmas =
    props.location.search.split('q=')[
      props.location.search.split('q=').length - 1
    ] || ' ';
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('lowest');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, data } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    setSearchKeyword(queryparmas);
    dispatch(listProducts(queryparmas, category));
    return () => {};
  }, [queryparmas, category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(searchKeyword));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(searchKeyword, e.target.value));
  };
  const datalayer = (product) => {
    window.dataLayer.push({
      event: 'select_item',
      ecommerce: {
        items: [
          {
            item_name: product.name, // Name or ID is required.
            item_id: product._id,
            item_brand: product.brand,
            item_category: product.category,
            item_variant: product.description,
            item_list_name: data,
            item_list_id: 1,
            index: products.indexOf(product) + 1,
            price: product.price,
          },
        ],
      },
    });
    window.dataLayer.push({
      event: 'productClick',
      ecommerce: {
        click: {
          actionField: { list: data }, // Optional list property.
          products: [
            {
              name: product.name, // Name or ID is required.
              id: product._id,
              price: product.price,
              brand: product.brand,
              category: product.category,
              variant: product.description,
              position: products.indexOf(product) + 1,
            },
          ],
        },
      },
    });
  };

  return (
    <>
      {category && (
        <h2 className='category'>
          {category === 'MobilePhones' ? 'Mobile Phones' : category}
        </h2>
      )}

      <ul className='filter'>
        <li>
          Sort By{' '}
          <select name='sortOrder' value={sortOrder} onChange={sortHandler}>
            <option value='Newest'>Newest</option>
            <option value='lowest' default>
              Lowest
            </option>
            <option value='highest'>Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className='products'>
          {products.map((product) => (
            <li key={product._id}>
              <div className='product'>
                <Link
                  to={'/product/' + product._id}
                  onClick={() => {
                    datalayer(product);
                  }}
                >
                  <img
                    className='product-image'
                    src={product.image}
                    alt='product'
                  />
                </Link>
                <div className='product-brand'>BRAND: {product.brand}</div>
                <div className='product-name'>
                  <Link
                    to={'/product/' + product._id}
                    onClick={() => {
                      datalayer(product);
                    }}
                  >
                    {product.name}
                  </Link>
                </div>
                <div className='product-price'>${product.price}</div>
                <div className='product-rating'></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
