
import { Provider } from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import store from "src/store/store";

import WithPlatformHeader from "src/components/app/WithPlatformHeader";
import Home from "src/pages/Home.page";
import LogoutPage from "src/pages/Logout.page";

export const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<WithPlatformHeader />}>
            <Route path="" element={<Home />} />
            <Route path="/logout" element={<LogoutPage />} />
        </Route>
    )
);

export default function AppRouter() {
    return (
        <Provider store={store}>
            <RouterProvider router={appRouter} />
        </Provider>
    )
}