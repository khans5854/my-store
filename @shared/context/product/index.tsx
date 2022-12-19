import { Stack, LinearProgress } from "@mui/material";
import { BASE_URL, IProduct } from "@shared";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const OUT_OF_STOCK_IDS = [1, 3, 5];

interface IProductContext {
  getProduct: (
    page: number,
    limit: number,
    search?: string
  ) => { total?: number; data?: IProduct[] };
  productState: IProduct[] | null
}

const initialContext: IProductContext = {
  getProduct: (page: number, limit: number, search?: string) => ({
    total: 0,
    data: [],
  }),
  productState: null
};
const ProductContext = createContext<IProductContext>(initialContext);
export const ProductProvider = ({ children }: { children: JSX.Element }) => {
  const [productState, setProductState] = useState<IProduct[] | null>(null);
  const isPrime = useCallback((id: number) => {
    for (let i = 2, s = Math.sqrt(id); i <= s; i++) {
      if (id % i === 0) return false;
    }
    return id > 1;
  }, []);

  const discountPrice = useCallback((price: number) => {
    return +parseFloat(price - (price * 5) / 100 + "").toFixed(2);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try{
        const products = await fetch(`${BASE_URL}/products`, { signal }).then(
          (res) => res.json()
        );
        const allProduct = products.map((product: any) => {
          return isPrime(product.id)
            ? {
                ...product,
                price: {
                  actualPrice: product.price,
                  discountedPrice: discountPrice(product.price),
                  offer: 5,
                },
                outOfStock: OUT_OF_STOCK_IDS.includes(product.id)
                  ? new Promise((resolve) => {
                      setTimeout(resolve, 60000);
                    })
                  : undefined,
              }
            : {
                ...product,
                price: { discountedPrice: product.price },
                outOfStock: OUT_OF_STOCK_IDS.includes(product.id)
                  ? new Promise((resolve) => {
                      setTimeout(resolve, 60000);
                    })
                  : undefined,
              };
        });
        setProductState(allProduct);
      } catch(error) {
        console.error(error)
      }
    })();
    return () => controller?.abort();
  }, []);

  const getProduct = useCallback(
    (page: number = 0, limit: number = 10, search?: string) => {
      if (!search || !search.length) {
        return {
          total: productState?.length,
          data: productState?.slice(page * limit, page * limit + limit),
        };
      }
      const filteredProduct = productState?.filter(({ title }: IProduct) =>
        title.toLowerCase().includes(search.toLowerCase())
      );
      return {
        total: filteredProduct?.length,
        data: filteredProduct?.slice(page * limit, page * limit + limit),
      };
    },
    [productState]
  );

  const contextValue = useMemo(
    () => ({
      getProduct,
      productState
    }),
    [getProduct,productState]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {productState ? (
        children
      ) : (
        <Stack
          sx={{
            width: "80%",
            height: "calc(100vh - 90px)",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <LinearProgress color="success" />
        </Stack>
      )}
    </ProductContext.Provider>
  );
};

export const useProductStore = () => useContext(ProductContext);
