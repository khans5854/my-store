import { Box, Button, Paper, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CartAction, IProduct, OutOfStock, useCookiesState } from "@shared";
import { FC, useEffect, useMemo, useState } from "react";

interface IProductCard extends IProduct{
  onClick?: () => void
}

export const ProductCard: FC<IProductCard> = ({
  id,
  image,
  title,
  category,
  price: {actualPrice, discountedPrice, offer},
  rating: { rate: productRate, count: productRateCount },
  onClick,
  outOfStock
}) => {
  const {getProductCount, quantityIncrease, quantityDecrease} = useCookiesState();
  const cartProduct = useMemo(() => (getProductCount(id)),[getProductCount,id]);
  const [isOutOfStock, setOutOfStock] = useState<boolean>(false);
  useEffect(() => {
    if(!outOfStock) return 
    outOfStock.then(() => {
      setOutOfStock(true)
    })
  },[outOfStock])
  return (
    <Stack
      component={Paper}
      alignItems="center"
      sx={{
        width: "100%",
        maxWidth: {
          xs: "calc(50% - 8px)",
          sm: "calc(33% - 12px)",
          md: "280px",
        },
        padding: { xs: 1, sm: 2 },
        border: "1px solid #80808050",
        borderRadius: "4px",
        position: "relative",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      {isOutOfStock && <OutOfStock
        sx={{
          position: "absolute",
          left: { xs: "4px", sm: "8px" },
        }}
      />}
      <Stack
        justifyContent="center"
        sx={{ width: "80%", height: { xs: "150px", sm: "220px", md: "250px" } }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
            maxHeight: { xs: "150px", sm: "220px", md: "250px" },
            objectFit: "cover",
          }}
          src={image}
        />
      </Stack>
      <Typography
        variant="h4"
        sx={{
          margin: "12px 6px",
          // whiteSpace: 'nowrap',
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
          width: "90%",
          flex: 1,
          fontSize: { xs: ".75rem", sm: "1rem" },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "90%",
        }}
      >
        {category}
      </Typography>
      <Stack flexDirection="row" alignItems="center" margin={{xs: '6px 0',sm:"12px 0"}}>
        <Rating
          name="product-rating"
          value={productRate}
          readOnly
          sx={{ fontSize: { xs: ".75rem", sm: "1rem" }, mr: "4px" }}
        />
        <Typography variant="caption" mt="4px">
          {productRateCount} reviews
        </Typography>
      </Stack>
      <Stack flexDirection="row" alignContent="center" flexWrap="wrap">
        <Stack flexDirection="row">
            <Typography
            variant="body2"
            sx={{ opacity: ".5", alignSelf: "center", mr: "4px" }}
            >MRP :</Typography>
            {actualPrice && <Typography
            variant="body2"
            sx={{ opacity: ".5", alignSelf: "center", mr: "4px", textDecoration: 'line-through' }}
            >&#8377; {actualPrice}</Typography>}
        </Stack>
        <Stack flexDirection="row">
          <Typography variant="body1" color="#006E5A" fontWeight={600} mr="2px">
            &#8377; {discountedPrice}
          </Typography>
          {offer && <Typography
            variant="caption"
            color="#F04E23"
            sx={{
              alignSelf: "center",
              ml: "4px",
            }}
          >
            | {offer}% off
          </Typography>}
        </Stack>
      </Stack>
      {
        cartProduct ? <CartAction disabled={isOutOfStock} id={id} count={cartProduct.count} quantityDecrease={quantityDecrease} quantityIncrease={quantityIncrease} /> : 
        (
          <Button
            variant="outlined"
            color="success"
            type="button"
            onClick={onClick}
            sx={{
              mt: "12px",
              fontSize: { xs: ".75rem", sm: "1rem", whiteSpace: "nowrap" },
            }}
            disabled={isOutOfStock}
          >
            ADD TO CART
          </Button>
        )
      }
      
    </Stack>
  );
};
