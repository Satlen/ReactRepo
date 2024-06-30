import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "./features/userSlice";

export default function ReactRedux() {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch;
  useEffect(() => {
    //dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <div>ReactRedux</div>
      {user.loading && "...is loading"}
      {user.error && user.error}
      <div>{user.user}</div>
    </div>
  );
}
