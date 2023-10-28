import { Pagination, PaginationItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { EmptyState, Header, IProduct, useCookiesState } from "@shared";
import Link from "next/link";
import { ProductCard } from "./components";
import { useProduct } from "./hooks";

export const ProductPage = () => {
  const { addToCart } = useCookiesState();
  const { products, paginatorLimit, redirectTo, queryParam } = useProduct();
  return (
    <>
      <Header />
      <Typography variant="h1" sx={{ margin: 2, textAlign: "center", mt: '80px' }}>
        Products
      </Typography>
      <Stack flexDirection="row" flexWrap="wrap" gap={2} margin="16px">
        {products?.data?.map((product: IProduct) => {
          return (
            <ProductCard
              key={product.id}
              onClick={addToCart.bind(this, product)}
              {...product}
            />
          );
        })}
      </Stack>
      {products?.data?.length === 0 && <EmptyState />}
      <Stack alignItems="center" margin="16px">
        {products && (
          <Pagination
            sx={{ width: "fit-content" }}
            page={queryParam.page}
            count={paginatorLimit}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                href={`products?page=${item.page}${redirectTo}`}
                {...item}
              />
            )}
          />
        )}
      </Stack>
    </>
  );
};
