import {
	LOAD_PRODUCTS,
	SET_LISTVIEW,
	SET_GRIDVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
	if (action.type === LOAD_PRODUCTS) {
		let maxPrice = action.payload.map((p) => p.price)
		maxPrice = Math.max(...maxPrice)

		return {
			...state,
			all_products: [...action.payload],
			filter_products: [...action.payload],
			filters: {
				...state.filters,
				max_price: maxPrice,
				price: maxPrice,
			},
		}
	}
	if (action.type === SET_GRIDVIEW) {
		return {
			...state,
			grid_view: true,
		}
	}
	if (action.type === SET_LISTVIEW) {
		return {
			...state,
			grid_view: false,
		}
	}
	if (action.type === UPDATE_SORT) {
		return {
			...state,
			sort: action.payload,
		}
	}

	if (action.type === SORT_PRODUCTS) {
		const { sort, filter_products } = state

		let tempProducts = [...filter_products]

		switch (sort) {
			case 'price-lowest':
				tempProducts = tempProducts.sort((a, b) => a.price - b.price)
				break
			case 'price-highest':
				tempProducts = tempProducts.sort((a, b) => b.price - a.price)
				break
			case 'name-a':
				tempProducts = tempProducts.sort((a, b) => {
					return a.name.localeCompare(b.name)
				})
				break
			case 'name-z':
				tempProducts = tempProducts.sort((a, b) => {
					return b.name.localeCompare(a.name)
				})
				break
			default:
				return state
		}

		return { ...state, filter_products: tempProducts }
	}

	if (action.type === UPDATE_FILTERS) {
		const { name, value } = action.payload
		console.log(value)
		console.log(name, value)
		return { ...state, filters: { ...state.filters, [name]: value } }
	}

	if (action.type === FILTER_PRODUCTS) {
		console.log('filtering product')
		return { ...state }
	}

	throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
