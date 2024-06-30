import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import FormPublications from './Components/FormPublications'
import Publications from './Components/Publications'

export default function Dashboard() {
const navigate = useNavigate()


  /**
   * ici, on redirige le user vers la connexion s' il n' existe pas. Sinon, on le laisse.
   */
  useEffect(()=>{
    if (!localStorage.getItem('user')){
      navigate('/connexion')
    }
  })
  


  return (
    <Box bgcolor={'#eee'}>
      <Navbar/>
      <Box width={"60%"} margin={'auto'} >
        <FormPublications/>
        <Publications/>
      </Box>

    </Box>
  )
}
