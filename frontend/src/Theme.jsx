import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1A365D',
            dark: '#142A4D',           
            contrastText: '#ffffff',            
        },
        secondary: {
            main: '#0284C7',
            light: '#38BDF8',
            contrastText: '#fff',
        },
        background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A',
            secondary: '#475569',
        },
        navbar: {
            main: '#1A365D',
            dark: '#142A4D',           
            contrastText: '#ffffff',            
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#38BDF8',
            dark: '#309ecd',
            contrastText: '#0F172A',
        },
        secondary: {
            main: '#38BDF8',
            light: '#0F172A',
            contrastText: '#0F172A',
        },
        background: {
            default: '#0F172A',
            paper: '#121b32',
            
        },
        text: {
            primary: '#F8FAFC',
            secondary: '#a8afb8',
        },
        navbar: {
            main: '#0A1E3F',
            dark: '#081935',           
            contrastText: '#F8FAFC',            
        },
    },
});