import Button from '@mui/material/Button';
export default function NavLink(props){
    return(
        <Button href={props.link} variant="text" disableElevation
        sx={{
            color:'navbar.contrastText',
            '&:hover':{backgroundColor:'navbar.dark'}}} >
            {props.name}
        </Button>
    )
}