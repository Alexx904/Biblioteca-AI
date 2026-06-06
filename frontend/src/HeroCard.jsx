import { Card, CardContent, Typography } from "@mui/material";

export default function HeroCard(props){
    return(
        <Card elevation={2} sx={{textAlign:'center', border:'1px solid', borderColor:'primary.main', borderRadius:4, flex:1,minWidth:220}}> {/*flex:1 per far si che le card si espandano in modo uniforme, minWidth in coppia con il flexWrap dello Stack contenitore permette di mandare le card a capo se diventano troppo strette */}
            <CardContent sx={{
                display:"flex",
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                height:'100%'}}>
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