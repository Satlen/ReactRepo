import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";



export default function FormPublications() {

  const {handleSubmit, register, formState: {errors}, reset} = useForm()
  
  
/**
 * 
 * Après l' enregistrement des publications dans la base de données, on voudrait afficher ces publications qu' on va récupérer directement de la base de donnée. Pour éviter la surchage et tous les problèmes de rendu, on le fera dans composant dédié et c' est un effet de bord.
 */
  const onSubmit = (data) => {

    const userRegister = JSON.parse(localStorage.getItem('user'))

    const publication = {
      ...data,
      userId: userRegister.id,
      userDate: new Date(),
      userLike: 0,
      userAuthor: userRegister.userName,
    }

    axios
        .post("http://localhost:3000/publications", publication)
        .then( res => {
          //permet de réinitialiser les champs 
          reset()
          console.log(res.data)
          toast.success("Publications successful")

        

        } )
        .catch(err => {
          toast.error("Une erreur est survenue")
          console.log(err)
        })
  }

  return (
    <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={4} paddingTop={5}>
            <h2 style={{
              textAlign: 'center'
            }}>
              Ajouter une publication
              </h2>
            <TextField id="outlined-basic" label="Parlez nous de votre journée " variant="outlined" multiline rows={4}
            {...register("userPublication",{required: 'Vous devez spécifier quelque chose', minLength: {
              value: 10,
              message: "Entrez des textes d' au moins 10 caractères"
            }})}
            />
            {errors.userPublication && <p style={{
              color: 'red'
            }}> {errors.userPublication.message} </p>}
            <TextField id="outlined-basic" label="Saisir l' url de votre image" variant="outlined" {...register("userImage",{required: 'Vous devez spécifier quelque chose', minLength: {
              value: 10,
              message: "Entrez d' url correcte"
            }})} />
            {errors.userImage && <p style={{
              color: 'red'
            }}> {errors.userImage.message} </p>}
            <Button variant="contained" size="medium" type="submit">Publier</Button>
          </Stack>
        </form>

    </Box>
  );
}
