import { Box, Typography, Container } from "@mui/material";

export default function SectionTitle(props){
    return(
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom sx={{fontFamily:'serif', fontWeight:'bold'}}>
            {props.title}
          </Typography>
          {/* Linea celeste sotto il titolo */}
          <Box sx={{ width: 60, height: 3, backgroundColor: 'secondary.main', mx: 'auto', mb: 2 }} />
          <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '1.25rem' }}>
            {props.subtitle}
          </Typography>
        </Box>
    )
}