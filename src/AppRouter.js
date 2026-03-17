import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Route, Routes } from "react-router";
import RouteWrapper from "./components/RouteWrapper";
import routes from "./config/routes";

const AppRouter = props => {
	return <>
		<Suspense fallback={null}>
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
		</Suspense>
	</>
};

AppRouter.propTypes = {
	props: PropTypes.object
};
AppRouter.defaultProps = {
	props: {}
};

export default AppRouter
