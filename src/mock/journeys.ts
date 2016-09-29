export const JOURNEYS = {
    id: 'one',
	name: 'Welo Airplane',
	description: { 
		en: 'An Airplane XPTO in Toronto',
		ptbr: 'Um Avião XPTO em Toronto', 
	},
	isFavorite: true,
	rating: 5,
	ratingsQuantity: 20,
	basePrice: {
		daily: 300,
		weekly: 200,
		monthly: null	
	},
	category: 'plane',
    pictures: [
        'img/plane-1.jpg',
        'img/plane-2.jpg'
    ],
	owner: {
		id: 'pedro',
		name: 'Pedro Elton',
		photoURL: 'img/profile-1.jpg'	
	},
}