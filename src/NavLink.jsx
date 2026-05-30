import Button from '@mui/material/Button';
export default function NavLink(props){
    return(
        <Button href={props.link} variant="contained" color='primary' disableElevation>
            {props.name}
        </Button>
    )
}