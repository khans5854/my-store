import { Box, SxProps } from "@mui/material"
import { FC } from "react"
interface IOutOfStock{
    sx?: SxProps
}

export const OutOfStock: FC<IOutOfStock> = ({sx}) => {
    return (
        <Box sx={{
            padding: '4px 8px',
            color: '#ffffff',
            borderRadius: '16px',
            background: '#CD201F',
            ...sx
        }}>Out of stock</Box>
    )
}