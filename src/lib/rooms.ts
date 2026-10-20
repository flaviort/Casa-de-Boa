export const ROOMS = ['cozinha', 'quarto', 'sala', 'banheiro', 'lavanderia', 'organizacao', 'especial'] as const

export type Room = typeof ROOMS[number]

export const ROOM_LABELS: Record<Room, string> = {
	cozinha: 'Cozinha',
	quarto: 'Quarto',
	sala: 'Sala',
	banheiro: 'Banheiro',
	lavanderia: 'Lavanderia',
	organizacao: 'Organização',
	especial: 'Especiais'
}
