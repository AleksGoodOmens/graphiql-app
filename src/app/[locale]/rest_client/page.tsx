'use client'

import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function RestClientPage() {
	const { t } = useTranslation()
	return (
		<Typography
			variant='body1'
			sx={{ textAlign: 'center' }}
		>
			{t('rest:fillForm')}
		</Typography>
	)
}
