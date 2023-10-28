import { IconButton, Stack, Typography } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FC } from "react";

interface ICartAction{
    id:number,
    count: number,
    quantityDecrease: (id: number, count: number) => void,
    quantityIncrease: (id: number, count: number) => void,
    disabled?: boolean
}

export const CartAction: FC<ICartAction> = ({
    id,
    count,
    quantityDecrease,
    quantityIncrease,
    disabled
}) => {
    return (
        <Stack flexDirection='row' alignItems='center' sx={disabled ? {
          textDecoration: 'line-through',
          opacity: '.75',
          color: 'gray'
        }: {}}>
          <Typography variant='caption' fontSize={'1rem'}>Qty:</Typography>
          <IconButton onClick={quantityDecrease.bind(this, id, count)} disabled={disabled}>
            <RemoveCircleOutlineIcon fontSize="small"/>
          </IconButton>
          <Typography variant='caption' fontSize={'1rem'} fontWeight={600}>{count}</Typography>
          <IconButton onClick={quantityIncrease.bind(this, id, count)} disabled={disabled}>
            <AddCircleOutlineIcon fontSize="small"/>
          </IconButton>
        </Stack>
    )
}