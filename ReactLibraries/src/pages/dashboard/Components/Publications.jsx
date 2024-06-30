import { Avatar, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Publications() {
  const [takePublication, setTakePublication] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/publications")
      .then((res) => {
        console.log(res.data);
        //les publications sont dans un tableau donc je peux mapper dessus.
        setTakePublication(()=>res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {takePublication.map((p) => (
        <div key={p.id}>
          <Stack direction={"row"} justifyContent={"space-between"} marginY={3}>
            <Avatar />
            <Typography >{p.userAuthor}</Typography>
          </Stack>
          <Typography >{p.userPublication}</Typography>
          <img src={p.userImage} alt="student" />
        </div>
      ))}
    </div>
  );
}
