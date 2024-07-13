import 'react-toastify/dist/ReactToastify.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { useMediaQuery } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import {
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import ColorModeContext from './layout/themeContext';
import Routes from './routes';

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '4px',
                    height: '4px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#0A54EF",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#000" : "#0A54EF",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#0042DA" : "#F3F3F3" }, // Cores Primario
                secondary: { main: mode === "light" ? "#151718" : "#151718" },
                textPrimary: mode === "light" ? "#000" : "#FFFFFF",
                background: {
                    default: mode === "light" ? "#fafafa" : "#303841",
                    paper: mode === "light" ? "#FFFFFF" : "#151718",
                },
                borderPrimary: mode === "light" ? "#000" : "#FFFFFF",
                dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
                tabHeaderBackground: mode === "light" ? "#fff" : "#151718",
                optionsBackground: mode === "light" ? "#fafafa" : "#333",
                options: mode === "light" ? "#fafafa" : "#333",
                fontecor: mode === "light" ? "#000" : "#fff",
                fancyBackground: mode === "light" ? "#fafafa" : "#333",
                bordabox: mode === "light" ? "#eee" : "#333",
                newmessagebox: mode === "light" ? "#eee" : "#333",
                inputdigita: mode === "light" ? "#fff" : "#333",
                contactdrawer: mode === "light" ? "#fff" : "#333",
                announcements: mode === "light" ? "#ededed" : "#333",
                login: mode === "light" ? "#fff" : "#333",
                announcementspopover: mode === "light" ? "#fff" : "#333",
                chatlist: mode === "light" ? "#eee" : "#333",
                boxlist: mode === "light" ? "#ededed" : "#333",
                boxchatlist: mode === "light" ? "#ededed" : "#333",
                total: mode === "light" ? "#fff" : "#222",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#FFFFFF" : "#333",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #10005C, #130167, #10005C)" : "#151718", // Cores Gradiente Barra Superior
                boxticket: mode === "light" ? "#EEE" : "#333",
                campaigntab: mode === "light" ? "#ededed" : "#333",
                corIconesbarra: mode === "light" ? "#1C2E36" : "#34DD3B", // Cor dos ícones da barra
                fundologoLateral: mode === "light" ? "linear-gradient(to right, #10005C, #10005C, #10005C)" : "linear-gradient(to right, #151718, #151718 #151718)", //Fundo Logo Superior
                barraLateral: mode === "light" ? "linear-gradient(to right, #130167, #130167, #130167)" : "linear-gradient(to right, #151718, #151718, #151718)", //Barra Vertical
                corTextobarraLateral: mode === "light" ? "#FFFFFF" : "#FFFFFF",
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Routes />
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
