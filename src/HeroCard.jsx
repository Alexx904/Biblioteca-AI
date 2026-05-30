import { Card, CardContent, Typography } from "@mui/material";

export default function HeroCard(props){
    return(
        <Card raised sx={{display:'flex',textAlign:'center', border:'1px solid',borderColor:'primary.main', borderRadius:4}}>
            <CardContent>
                {/* Il testo piccolo in alto */}
                <Typography variant="subtitle1" gutterBottom color="textSecondary">
                    {props.title}
                </Typography>
                <Typography variant="h4" color="textPrimary" sx={{fontWeight:'bold'}}>
                    {props.value}
                </Typography>
            </CardContent>
        </Card>        
    )
}