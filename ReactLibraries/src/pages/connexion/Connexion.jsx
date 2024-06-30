import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
useForm



export default function Connexion() {

  const {handleSubmit, register, formState: {errors} } = useForm()

  const navigate = useNavigate()

  useEffect(()=>{
    if (localStorage.getItem('user')){
      navigate('/')
    }
  })



  /**
   * 
   * @function
   * Ici, je vérifie dans la base de donnée si le mot de passe et l' email correspondent. Si oui, je le redirige vers le Dashboard. Si non, ça voudrait dire qu' il a tapé des identifiants incorrect.  
   * Je peux aussi, dans ce cas le sauvegarder dans le localStorage ainsi, s' il est déjà inscrit , directement, je l' empêche d' accéder à certaines pages.
   * Ici, on l' envoie directement dans dashboard, si le user existe. 
   * 
   */
  const onSubmit = (data) => {
    axios
        .get(`http://localhost:3000/utilisateurs?userEmail=${data.userEmail}&userPass=${data.userPass}`)
        .then(res => {
          if (res.data.length > 0){
            toast.success("Connexion réussie")
            navigate("/")
          } else {
            toast.error('Vos identifiants sont incorrects')
          }
        } )
        .catch( err => {
          console.log(err)
        })
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
        <Typography variant='h4' marginBottom={2}>Connexion</Typography>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Stack gap={2}>
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
            <Typography > Voulez vous créer un compte ? {' '} <Link to={'/inscription'}>Cliqué ici</Link>
            </Typography>
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
