import { store } from "./app/store";

import { ordered, restock } from "./features/cakeSlice";
import { fetchUsers } from "./features/userSlice";

console.log("initial state", store.getState());
const unsuscribe = store.subscribe(() =>
  console.log("updated state", store.getState())
);

store.dispatch(ordered());
store.dispatch(ordered());
store.dispatch(ordered());
store.dispatch(restock(3));
store.dispatch(fetchUsers());

export default function RTKTest() {
  return <div>RTKTest</div>;
}
