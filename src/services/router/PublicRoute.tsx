// import { Route, Navigate } from "react-router-dom";
// import { getCookie } from "../cookie";

// interface PublicRouteProps {
//   component: React.ComponentType<any>;
//   restricted: boolean;
//   path: string;
// }

// const PublicRoute = ({
//   component: Component,
//   restricted,
//   path,
// }: PublicRouteProps) => {
//   const auth = !!getCookie("user").token;
//   return (
//     <Route
//       path={path}
//       element={auth && restricted ? <Navigate to="/sign-in" /> : <Component />}
//     />
//   );
// };

export {};
