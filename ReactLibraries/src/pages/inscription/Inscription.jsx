import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
useForm
import { useEffect } from 'react'

export default function Inscription() {

const {handleSubmit, register, formState: {errors} } = useForm()

const navigate = useNavigate()

useEffect(()=>{
  if (localStorage.getItem('user')){
    navigate('/connexion')
  }
})

/**
 * @function
 * @param {Objet} data renvoyé après que le formulaire soit valide (ie le register est conforme) 
 * 
 * Ici, c'est le formulaire d' inscription.
 * D' abord, je vérifie si l' user est dans la base de donnée (en utilisant son email. Le user est en effet déjà inscrit si la réponse qu' on m' envoie à une longueur > 0 ) sinon, je l' inscris. Une fois inscrit, je le redirige vers la page connexion. Mais avant celà, je vérifie les données qui sont validées après le register pour voir si les 2 mots de passe correspondent.
 * Je peux aussi, dans ce cas le sauvegarder dans le localStorage ainsi, s' il est déjà inscrit, directement, je l' empêcher d' accéder à certaines pages.
 */
const onSubmit = (data) => {

  console.log(data)

  if (data.userPass !== data.userPassConfirm){
    toast.error('Les 2 mots de pass doivent correspondre', {
      position:'top-right',
    })
  }
  else {
    axios
        .get(`http://localhost:3000/utilisateurs?userEmail=data.userEmail`)
        .then( res => {
          //comme c' est dans utilisateurs qu' on cherche de réponse et c' est un tableau, alors, on m' envoie le résultat recherché contenu dans le tableau soit ici, un objet.
          if (res.data.length > 0){
            toast.error('You are already register')
            navigate('/connexion')
          } else {
            axios
                .post("http://localhost:3000/utilisateurs", data)
                .then(res => {
                  console.log(res.data)
                  toast.success("Inscription successful")
    // On stocke les données qu' on a mise dans la base de donnée dans le localStorage
                  localStorage.setItem("user", JSON.stringify(res.data))

                  navigate('/connexion')
                } )
          }
        })
        .catch( err => {
          console.Log(err)
        })



    toast.success("Formulaires soumis avec succès")
  }
}


  return (
    <Stack alignItems={'center'} justifyContent={'center'} sx={{
      width:'100%',
      height:'100vh',
    }}> 
      <Box sx={{
        width:'500px',
        padding:'20px',
        backgroundColor:'#eee',
        borderRadius:"10px",
      }}  >
        <Typography variant='h4' marginBottom={2}>Inscription</Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Stack gap={2}>
            <TextField 
              id="outlined-basic" 
              label="Veuillez saisir votre nom" 
              variant="outlined" 
              fullWidth
              {...register('userName', {required:true, minLength: {
                value: 5,
                message: 'Entrez au moins un nom de 5 caractères'
              }})}
            />
            {errors.userName && <p style={{color: "red"}}>{errors.userName.message}</p>}
             <TextField 
              id="outlined-basic" 
              label="Veuillez saisir votre email" 
              variant="outlined" 
              fullWidth
              type='email'
              {...register('userEmail', {required:true,
              pattern:{
                value: /^\S+@\S+\.\S+$/,
                message: 'Email non valide'
              },
            })}
            />
            {errors.userEmail && <p style={{color: "red"}}>{errors.userEmail.message}</p>}
              <TextField 
              id="outlined-basic" 
              label="Veuillez saisir un mot de passe" variant="outlined" 
              fullWidth 
              type='password'
              {...register("userPass", {required:true, minLength: {
                value: 4,
                message: "Entrez un mot de passe d' au moins 4 caractères"
              }})}
            />
            <TextField 
              id="outlined-basic" 
              label="Veuillez confirmer votre mot de passe" variant="outlined" 
              type='password' 
              fullWidth 
              {...register("userPassConfirm", {required:true,minLength: {
                value: 4,
                message: "Entrez un mot de passe d' au moins 4 caractères"
              }})}
            />
          </Stack>
            <Button variant="contained" size='large'
            type='submit'
            sx={{
              marginTop:'20px'
            }}>INSCRIPTION</Button>
        </form>
      
      </Box>
      
    </Stack>
  )
}
