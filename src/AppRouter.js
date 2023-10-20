import React from 'react';
import PropTypes from 'prop-types';
import {Route, Routes} from "react-router";
import routes from "./config/routes";
import RouteWrapper from "./components/RouteWrapper";

const AppRouter = props => {
	return <>
		<Routes>
			{
				routes.map(({path, component: Component, ...rest}) => <Route
						path={path}
						element={
							<RouteWrapper {...rest}>
								<Component/>
							</RouteWrapper>
						}
					/>
				)
			}
		</Routes>
	</>
};

AppRouter.propTypes = {
	props: PropTypes.object
};
AppRouter.defaultProps = {
	props: {}
};

export default AppRouter
