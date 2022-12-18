import { Box, Typography } from "@mui/material"
import { EmptyState, IProduct, useCookiesState } from "@shared"
import { ProductCard } from "./components";

export const Cart = () => {
    const {cartProduct, removeProduct, quantityDecrease, quantityIncrease} = useCookiesState();
    
    return (
    <Box sx={{maxWidth: '500px', minWidth: 'min(500px , 90vw)', maxHeight: 'calc(100vh - 100px)', overflow: 'hidden'}}>
        <Typography variant="h1" sx={{textAlign: 'center', margin: '12px 6px'}}>My Cart</Typography>
        <Box sx={{maxHeight: 'calc(100vh - 150px)', overflow: 'auto'}}>
            {Object.entries(cartProduct).map(([key, value]) => {
                return <ProductCard key={key} removeProduct={removeProduct} quantityDecrease={quantityDecrease} quantityIncrease={quantityIncrease} count={value.count} {...value.data}/>
            })}
        </Box>
        {!Object.keys(cartProduct).length && <EmptyState/>}
    </Box>
    )
}