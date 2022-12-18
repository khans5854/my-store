import { Components, Theme } from '@mui/material'
import { pxToRem } from '../../utils'

export const minor = (theme: Theme) => {
	const config: Components = {
		MuiButton: {
			defaultProps: {
				variant: 'contained',
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'capitalize',
				},
				sizeSmall: {
					fontSize: pxToRem(14),
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				color: 'secondary',
			},
		},

		MuiPaper: {
			defaultProps: {
				variant: 'outlined',
			},
		},
		MuiGrid: {
			defaultProps: {
				display: 'flex',
				alignItems: 'stretch',
			},
			styleOverrides: {
				item: {
					flexDirection: 'column',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				label: {
					fontSize: '12px',
					fontWeight: '500',
				},
			},
		},
		MuiRadio: {
			defaultProps: {
				color: 'default',
			},
			variants: [
				{
					props: { color: 'default' },
					style: { color: '#111213' },
				},
			],
		},
		MuiCircularProgress: {
			defaultProps: {
				size: pxToRem(28),
			},
		},
	}
	return config
}
