// components/LoadingPage.tsx
import { Box, CircularProgress, Typography } from "@mui/material"

type LoadingPageProps = {
  text?: string
}

const LoadingPage = ({ text }: LoadingPageProps) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <CircularProgress size={48} />
      {text && (
        <Typography mt={2} variant='body1'>
          {text}
        </Typography>
      )}
    </Box>
  )
}

export default LoadingPage
