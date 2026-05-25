import Button from '@mui/material/Button';
export default function NavLink(props){
    return(
        <Button href={props.link} variant="text" sx={{ color: '#ffffff' }}>
            {props.name}
        </Button>
    )
}