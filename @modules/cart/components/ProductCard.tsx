import { Box, IconButton, Paper, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { CartAction, IProduct, OutOfStock } from "@shared";
import { FC, useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
interface IProductCart extends IProduct {
  count: number;
  removeProduct: (id: number) => void;
  quantityDecrease: (id: number, count: number) => void;
  quantityIncrease: (id: number, count: number) => void;
}

export const ProductCard: FC<IProductCart> = ({
  id,
  image,
  title,
  category,
  price: { actualPrice, discountedPrice, offer },
  rating: { rate: productRate, count: productRateCount },
  count,
  removeProduct,
  quantityDecrease,
  quantityIncrease,
  outOfStock,
}) => {
  const [isOutOfStock, setOutOfStock] = useState<boolean>(false);
  useEffect(() => {
    if (!outOfStock) return;
    outOfStock.then(() => {
      setOutOfStock(true);
    });
  }, [outOfStock]);
  return (
    <Stack
      component={Paper}
      alignItems="center"
      flexDirection="row"
      sx={{
        width: "100%",
        padding: { xs: 1, sm: 2 },
        border: "1px solid #80808050",
        borderRadius: "4px",
        position: "relative",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      {isOutOfStock && (
        <OutOfStock
          sx={{
            position: "absolute",
            left: { xs: "4px", sm: "8px" },
          }}
        />
      )}
      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: "20px",
        }}
        onClick={removeProduct.bind(this, id)}
      >
        <DeleteOutlineIcon />
      </IconButton>
      <Stack
        justifyContent="center"
        sx={{ width: "100px", height: "120px", mr: "16px" }}
      >
        <Box
          component="img"
          sx={{
            width: "100px",
            maxHeight: "120px",
            objectFit: "cover",
          }}
          src={image}
        />
      </Stack>
      <Stack sx={{ mr: "30px" }}>
        <Typography
          variant="h4"
          sx={{
            margin: "12px 6px 4px 6px",
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
        <Stack flexDirection="row" alignItems="center" margin={"4px 0"}>
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
            >
              MRP :
            </Typography>
            {actualPrice && (
              <Typography
                variant="body2"
                sx={{
                  opacity: ".5",
                  alignSelf: "center",
                  mr: "4px",
                  textDecoration: "line-through",
                }}
              >
                &#8377; {actualPrice}
              </Typography>
            )}
          </Stack>
          <Stack flexDirection="row">
            <Typography
              variant="body1"
              color="#006E5A"
              fontWeight={600}
              mr="2px"
            >
              &#8377; {discountedPrice}
            </Typography>
            {offer && (
              <Typography
                variant="caption"
                color="#F04E23"
                sx={{
                  alignSelf: "center",
                  ml: "4px",
                }}
              >
                | {offer}% off
              </Typography>
            )}
          </Stack>
        </Stack>
        <CartAction
          id={id}
          count={count}
          disabled={isOutOfStock}
          quantityDecrease={quantityDecrease}
          quantityIncrease={quantityIncrease}
        />
      </Stack>
    </Stack>
  );
};
