import { Box, SxProps } from "@mui/material";
import { FC } from "react";
interface IMyLoader {
  sx?: SxProps;
}

export const MyLoader: FC<IMyLoader> = ({ sx }) => {
  return (
    <Box
      component="img"
      src="./assets/icons/loader.svg"
      sx={{
        height: "24px",
        opacity: ".5",
        animation: "rotation 2s infinite linear",
        "@keyframes rotation": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(359deg)",
          },
        },
        ...sx,
      }}
    />
  );
};
