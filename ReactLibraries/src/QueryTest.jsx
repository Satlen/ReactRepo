import { NavLink } from "react-router-dom";
import { Center } from "./styledComponents/Center";
import { Outlet } from "react-router-dom";

export const QueryTest = () => {
  return (
    <Center>
      <h1>QueryTest</h1>
      <div
        style={{
          marginBlock: "50px",
          display: "flex",
          gap: "10px",
        }}
      >
        <NavLink
          to={"pagination"}
          style={({ isActive }) => {
            return { fontWeight: isActive ? "bold" : "", fontSize: "1.3rem" };
          }}
        >
          Test_Pagination
        </NavLink>
        <NavLink
          to={"scroll"}
          style={(props) => {
            console.log(props);
            return {
              fontWeight: props.isActive ? "bold" : "",
              fontSize: "1.3rem",
            };
          }}
        >
          Test_Scroll
        </NavLink>
        <NavLink
          to={"handleMutation"}
          style={({ isActive }) => {
            return { fontWeight: isActive ? "bold" : "", fontSize: "1.3rem" };
          }}
        >
          Test_HandleMutation
        </NavLink>
      </div>
      <Outlet />
    </Center>
  );
};
