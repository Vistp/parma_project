import { Box, Typography } from "@mui/material"
import { IDetail } from "types/types"


const DrillCardTmp = ({
	item
} : {
	item: IDetail
}) => {
	return (
		<>
			<Box sx={{ flex: 1, mr: { sm: 2, xs: 0 }, mb: { xs: 2, sm: 0 } }}>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					ID: {item.id}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Название: {item.name}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Диаметр: {item.diameter}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Длина: {item.length_xD}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Глубина сверления: {item.deep_of_drill}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Компания: {item.company}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Описание: {item.description}
				</Typography>
			</Box>
		</>
	)
}

const ScrewCardTmp = ({
	item
} : {
	item: IDetail
}) => {
	return (
		<>
			<Box sx={{ flex: 1, mr: { sm: 2, xs: 0 }, mb: { xs: 2, sm: 0 } }}>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					ID: {item.id}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Тип: {item.type}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Длина: {item.length}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Резьба: {item.thread}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Шаг резьбы: {item.step_of_thread}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Компания: {item.company}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Описание: {item.description}
				</Typography>
			</Box>
		</>
	)
}

const PlatesCardTmp = ({
	item
} : {
	item: IDetail
}) => {
	return (
		<>
			<Box sx={{ flex: 1, mr: { sm: 2, xs: 0 }, mb: { xs: 2, sm: 0 } }}>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					ID: {item.id}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Тип: {item.type}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Материал: {item.material}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Количество: {item.amount}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Компания: {item.company}
				</Typography>
				<Typography gutterBottom sx={{ fontSize: 14 }}>
					Описание: {item.description}
				</Typography>
			</Box>
		</>
	)
}

export {
	DrillCardTmp,
	ScrewCardTmp,
	PlatesCardTmp,
}
