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
            accent: '#38BDF8',
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
        bookcard:{
            border:'#f0e2e2',
            borderHover:'#cbd5e1',
        },
        warning:{
            main:'#ea580c',            
            disabled:'#94a3b8'
        },
         success:{
            main:'#10b981'
        },
         error:{
            main:'#ef4444',
            dark:'#991b1b',
            light:'#fca5a5'
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
            light: '#6ecef8',
            contrastText: '#0F172A',
            accent: '#0F172A',
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
        bookcard:{
            border:'#0c1323',
            borderHover:'#05080f',
        },
        warning:{
            main:'#ea580c',            
            disabled:'#94a3b8'
        },
         success:{
            main:'#10b981'
        },
         error:{
            main:'#ef4444',
            dark:'#991b1b',
            light:'#fca5a5'
        },
    },
});