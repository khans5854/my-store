import { IProduct, useProductStore } from "@shared";
import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
export const useCookiesState = () => {
  const { productState } = useProductStore();
  const [cookies, setCookie] = useCookies(["user-cart"]);
  const addToCart = useCallback(
    (product: IProduct) => {
      let cartData = {...cookies["user-cart"]} ?? {};
      if (cartData[product.id]) {
        cartData[product.id] = { count: cartData[product.id].count + 1 };
        setCookie("user-cart", { ...cartData });
        return;
      }
      cartData[product.id] = { count: 1 };
      setCookie("user-cart", { ...cartData });
    },
    [cookies, setCookie]
  );

  const getProductCount = useCallback(
    (id: number) => {
      if (!cookies["user-cart"]) return;
      return cookies["user-cart"][id];
    },
    [cookies]
  );

  const totalCount = useMemo(() => {
    return Object.keys(cookies["user-cart"] ?? {}).length
  },[cookies])

  const removeProduct = useCallback(
    (id: number) => {
      let cartData = {...cookies["user-cart"]} ?? {};
      delete cartData[id];
      setCookie("user-cart", { ...cartData });
    },
    [cookies, setCookie]
  );

  const quantityIncrease = useCallback(
    (id: number, count: number) => {
      let cartData = {...cookies["user-cart"]} ?? {};
      cartData[id] = { count: count + 1 };
      setCookie("user-cart", { ...cartData });
    },
    [cookies, setCookie]
  );

  const quantityDecrease = useCallback(
    (id: number, count: number) => {
      if (count === 1) {
        removeProduct(id);
        return;
      }
      let cartData = {...cookies["user-cart"]} ?? {};
      cartData[id] = { count: count - 1 };
      setCookie("user-cart", { ...cartData });
    },
    [cookies, setCookie, removeProduct]
  );

  const cartProduct :{[key: number]: {count: number, data: IProduct}} = useMemo(() => {
    if (!productState) return {};
    let cookiesProduct = {...cookies["user-cart"]} ?? {};
    productState.forEach((product) => {
      if (cookiesProduct[product.id]) {
        cookiesProduct[product.id] = {
          ...cookiesProduct[product.id],
          data: product,
        };
      }
    });
    return { ...cookiesProduct };
  }, [cookies, productState]);

  return useMemo(
    () => ({
      addToCart,
      cartProduct,
      removeProduct,
      quantityDecrease,
      quantityIncrease,
      getProductCount,
      totalCount
    }),
    [
      addToCart,
      cartProduct,
      removeProduct,
      quantityDecrease,
      quantityIncrease,
      getProductCount,
      totalCount
    ]
  );
};
