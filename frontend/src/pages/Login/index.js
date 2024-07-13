import React, {
  useContext,
  useState,
} from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

import logologin from '../../assets/logologin.png';
import { AuthContext } from '../../context/Auth/AuthContext';
import { i18n } from '../../translate/i18n';

const Copyright = () => {
    const classes = useStyles();

    return (
        <Typography variant="body2" align="center" className={classes.poweredByContainer}>
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Energizado por</span>
            <span className={classes.space}></span>
            <Link color="inherit" href="http://www.contacto.chat/" style={{ textDecoration: 'none', color: '#0042DA' }}>
            Contacto chat
            </Link>
            <span style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#0042DA' }}> {new Date().getFullYear()}</span>
            <ViewInArIcon className={classes.icon} style={{ color: '#0042DA' }} />
        </Typography>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "rgba(0, 102, 255, 0.8)", // Cor azul com opacidade ajustada
        form: {
            width: "300px", // Ajuste conforme necessário
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo do formulário com transparência para manter a legibilidade
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" // Sombra para dar destaque ao formulário
        }
    },
    "@keyframes gradientAnimation": {
        "0%": {
            backgroundPosition: "0% 50%" // Início da animação
        },
        "100%": {
            backgroundPosition: "100% 50%" // Fim da animação
        }
    },
    paper: {
        backgroundColor: theme.palette.login, 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
         maxWidth: "400px", // Definindo uma largura máxima
        padding: "30px 25px",
        borderRadius: "10.5px",
    },
    poweredByContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2), // Adicione margem superior conforme necessário
        color: 'white', // Defina a cor do texto como branco
    },
    icon: {
        marginLeft: theme.spacing(1), // Adicione margem à esquerda para separar o ícone do texto
        fontSize: '1.2rem', // Ajuste o tamanho do ícone conforme necessário
    },
    space: {
        marginRight: theme.spacing(1), // Adicione margem à direita para separar o texto do ícone
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
        borderRadius: "3px",
        height: "50px", // Ajuste a altura conforme necessário
        outline: "none", // Remover o efeito de borda
    },
    powered: {
        color: "white"
    },
    signUpContainer: {
        marginTop: theme.spacing(2), // Adicionando margem superior para distanciar do formulário
        alignItems: "center",
        padding: "55px 30px",
         maxWidth: "400px", // Definindo uma largura máxima
        backgroundColor: "#FFFFFF", // Adicionando fundo branco ao container de cadastro
        padding: theme.spacing(3), // Adiciona um espaçamento interno ao container, se necessário
        borderRadius: theme.spacing(1), // Adicione bordas arredondadas ao container, se desejar
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" // Sombra para dar destaque ao container
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
    padding: 5, // Remover preenchimento padrão do IconButton
    marginLeft: theme.spacing(1), // Adicionar margem à esquerda para separar o ícone do texto
    transition: 'color 0.3s', // Adicionar transição para o efeito hover
    color: '#0042DA', // Defina a cor do ícone
},

    buttonText: {
        transition: 'color 0.3s', // Adicionar transição para o efeito hover
        textDecoration: 'none', // Remover sublinhado padrão do link
        color: '#3284FE', // Definir a cor padrão do texto
        '&:hover': {
            color: '#00f', // Mudar a cor do texto ao passar o mouse
            '& $iconButton': {
                color: '#3284FE', // Mudar a cor do ícone ao passar o mouse
            },
        },
    },
    logo: {
        margin: "0 auto",
        width: "80%",
        marginBottom: theme.spacing(2), // Adicionando margem inferior para distanciar do formulário
    }
}));

const Login = () => {
    const classes = useStyles();

    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const { handleLogin } = useContext(AuthContext);

    const handleChangeInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        handleLogin(user);
    };

    return (
        <div className={classes.root}>
            <Container className={classes.paper} maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img className={classes.logo} src={logologin} alt="Logo" />
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="email"
                            label={i18n.t("login.form.email")}
                            name="email"
                            value={user.email}
                            onChange={handleChangeInput}
                            autoComplete="email"
                            autoFocus
                            InputLabelProps={{
                                style: { color: '#000', opacity: 0.6 }, // Cor e opacidade do rótulo
                                required: false, // Oculta o asterisco indicando campo obrigatório
                            }}
                        />

                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            name="password"
                            label={i18n.t("login.form.password")}
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={user.password}
                            onChange={handleChangeInput}
                            autoComplete="current-password"
                            InputLabelProps={{
                                style: { color: '#000', opacity: 0.6 }, // Cor e opacidade do rótulo
                                required: false, // Oculta o asterisco indicando campo obrigatório
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(prev => !prev)}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {i18n.t("login.buttons.submit")}
                        </Button>
                    </form>
                    <Grid container justify="center">
                        <Grid item xs={12} style={{ textAlign: "right" }}>
                            <Link component={RouterLink} to="/forgetpsw" variant="body2">
                            Olvidaste tu contraseña?
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <Container className={classes.signUpContainer} maxWidth="xs">
                <Typography variant="body1" color="textSecondary">
                ¿Aún no tienes una cuenta?
                </Typography>
                <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                    disableElevation
                    disableRipple
                    style={{
                        backgroundColor: 'transparent', // Remove a cor de fundo
                        textTransform: 'none', // Remove a transformação de texto (caixa alta)
                        boxShadow: 'none', // Remove a sombra
                        border: 'none', // Remove a borda
                        outline: 'none', // Remove o contorno
                    }}
                >
                    <div className={classes.buttonContainer}>
                        <span className={classes.buttonText}>{i18n.t("login.buttons.register")}</span>
                        <IconButton className={classes.iconButton} aria-label="arrow">
                            <ArrowForwardIcon />
                        </IconButton>
                    </div>
                </Button>

            </Container>
            <Typography variant="body2" color="textSecondary" align="center">
            </Typography>
            <Box mt={2}>
                <Copyright />
            </Box>
        </div>
    );
};

export default Login;
