import { Box, Typography ,Stack} from "@mui/material"

export const EmptyState = () => {
    return (
        <Stack alignItems='center' margin='16px 4px'>
            <Box component='img' src="./assets/icons/emptyPageIcon.svg"/>
            <Typography variant="h2">No Data Yet</Typography>
            <Typography variant="body1" textAlign='center'>
                We have not computed and data yet!
            </Typography>
            <Typography variant="body1" textAlign='center'>
                Please try again later
            </Typography>
        </Stack>
    )
}