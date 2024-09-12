import {
	Button,
	ButtonGroup,
	Container,
	Grid,
	Switch,
	TextField,
	Typography,
} from '@mui/material'

export const typography = () => {
	return (
		<Container>
			<section>
				<Grid container>
					<Typography
						component='h1'
						variant='h4'
					>
						Headings ff = Montserrat capitalized
					</Typography>
					<Typography
						component='h1'
						variant='h1'
					>
						h1
					</Typography>
					<Typography
						component='h2'
						variant='h2'
					>
						h2
					</Typography>
					<Typography
						component='h3'
						variant='h3'
					>
						h3
					</Typography>
					<Typography
						component='h4'
						variant='h4'
					>
						h4
					</Typography>
				</Grid>
				<Grid
					container
					direction={'column'}
				>
					<Typography variant='h4'>subtitles ff = Montserrat</Typography>
					<Typography variant='subtitle1'>Lorem ipsum dolor sit,</Typography>
					<Typography variant='subtitle2'>Lorem ipsum dolor sit,</Typography>
				</Grid>
				<Grid
					container
					direction={'column'}
				>
					<Typography variant='h4'>plain text ff - JetBrains</Typography>
					<Typography>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
						animi.
					</Typography>
					<Typography variant='body1'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
						animi.
					</Typography>
					<Typography variant='body2'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
						animi.
					</Typography>
				</Grid>
			</section>
			<section>
				<Typography
					component='h1'
					variant='h4'
				>
					buttons
				</Typography>
				<Grid
					container
					direction={'column'}
					gap={2}
				>
					<ButtonGroup
						variant='contained'
						size='small'
					>
						<Button color='primary'>primary</Button>
						<Button color='secondary'>secondary</Button>
						<Button color='info'>info</Button>
						<Button color='success'>success</Button>
						<Button color='warning'>warning</Button>
					</ButtonGroup>
					<ButtonGroup variant='contained'>
						<Button color='primary'>primary</Button>
						<Button color='secondary'>secondary</Button>
						<Button color='info'>info</Button>
						<Button color='success'>success</Button>
						<Button color='warning'>warning</Button>
					</ButtonGroup>
					<ButtonGroup
						variant='contained'
						size='large'
					>
						<Button color='primary'>primary</Button>
						<Button color='secondary'>secondary</Button>
						<Button color='info'>info</Button>
						<Button color='success'>success</Button>
						<Button color='warning'>warning</Button>
					</ButtonGroup>
				</Grid>
			</section>
			<section>
				<Typography
					component='h1'
					variant='h4'
				>
					inputs
				</Typography>
				<Grid container>
					<Switch
						color='primary'
						checked
					/>
					<Switch
						color='secondary'
						checked
					/>
					<Switch
						color='info'
						checked
					/>
					<Switch
						color='success'
						checked
					/>
					<Switch
						color='warning'
						checked
					/>
				</Grid>
				<Grid container>
					<TextField
						variant='outlined'
						placeholder='Placeholder'
					/>
				</Grid>
			</section>
		</Container>
	)
}

export default typography
