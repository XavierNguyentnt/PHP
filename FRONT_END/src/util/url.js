const URL = {
  BASE_URL: "http://localhost:8888/api",
  CATEGORIES: "/categories.php",
  DETAIL_PRODUCT: "/detail_products.php?id=",
  CATEGORY_PRODUCT: "/category_products.php?category_id=",
  FEATURED_PRODUCT: "/featured_products.php",
  LATEST_PRODUCT: "/latest_products.php",
  CART: "/cart.php",
  ADD_TO_CART: "/add_to_cart.php",
  SEARCH_PRODUCT: "/search_products.php?id=",
  CREATE_ORDER: "/create_order.php",
  ORDER_DETAIL: "/order_detail.php?id=",
  UPDATE_ORDER: "/update_order.php",
  PAYPAL_CREATE_ORDER_API_ENDPOINT: "/paypal_create_order.php",
  PAYPAL_CAPTURE_ORDER_API_ENDPOINT: "/paypal_capture_order.php",
};
export default URL;
