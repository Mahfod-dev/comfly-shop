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

		return { ...state, filters: { ...state.filters, [name]: value } }
	}

	if (action.type === FILTER_PRODUCTS) {
		const { all_products } = state

		const { text, company, category, color, price, shipping } = state.filters
		let tempsProducts = [...all_products]

		if (text) {
			tempsProducts = tempsProducts.filter((product) =>
				product.name.toLowerCase().startsWith(text)
			)
		}

		if (category !== 'all') {
			tempsProducts = tempsProducts.filter(
				(product) => product.category === category
			)
		}
		if (company !== 'all') {
			tempsProducts = tempsProducts.filter(
				(product) => product.company === company
			)
		}
		if (color !== 'all') {
			tempsProducts = tempsProducts.filter((product) =>
				product.colors.find((c) => c === color)
			)
		}
		if (company !== 'all') {
			tempsProducts = tempsProducts.filter(
				(product) => product.company === company
			)
		}
		tempsProducts = tempsProducts.filter((product) => product.price <= price)
		if (shipping) {
			tempsProducts = tempsProducts.filter(
				(product) => product.shipping === true
			)
		}

		return { ...state, filter_products: tempsProducts }
	}
	if (action.type === CLEAR_FILTERS) {
		return {
			...state,
			filters: {
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.max_price,
				shipping: false,
			},
		}
	}

	throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
