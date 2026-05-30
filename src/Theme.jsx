import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1A365D',            
            contrastText: '#ffffff',
            
        },
        secondary: {
            main: '#0284C7',
            contrastText: '#fff',
        },
        background: {
            default: '#F8FAFC',
            card: '#FFFFFF',
        },
        text: {
            primary: '#0F172A',
            secondary: '#475569',
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3b5e8c',
            dark: '#111E2E',
            light: '#3B5472',
            contrastText: '#fff',
        },
        secondary: {
            main: '#DCA743',
            dark: '#C59432',
            light: '#E6BD6B',
            contrastText: '#1a2e46',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
        },
    },
});
