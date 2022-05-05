import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children}) => {
	const { user } = useAuth0()

	if (!user) {
		return <Navigate to='/' />
	}
	return children
	// return (
	// 	<Route
	// 		{...rest}
	// 		render={() => {
	// 			return user ? children : <Navigate to='/' />
	// 		}}></Route>
	// )
}
export default PrivateRoute
