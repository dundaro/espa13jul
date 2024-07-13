import React, {
  useEffect,
  useState,
} from 'react';

import {
  Field,
  Form,
  Formik,
} from 'formik';
import moment from 'moment';
import qs from 'query-string';
import {
  Link as RouterLink,
  useHistory,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import logologin from '../../assets/logologin.png';
import toastError from '../../errors/toastError';
import usePlans from '../../hooks/usePlans';
import { openApi } from '../../services/api';
import { i18n } from '../../translate/i18n';

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100vw",
		height: "100vh",
		backgroundColor: "rgba(0, 102, 255, 0.8)", // Cor azul com opacidade ajustada
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%",
		backgroundPosition: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	},
	paper: {
		background: "white",
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "55px 30px",
		borderRadius: "12.5px",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(2),
	},
	inputLabel: {
		color: "#ffffff",
	},
	underline: {
		"&::before": {
			borderBottom: "1px solid #ffffff",
		},
	},
	submit: {
        margin: theme.spacing(1, 0, 1),
        borderRadius: "3px",
        height: "50px", // Ajuste a altura conforme necessário
        outline: "none", // Remover o efeito de borda
	},
	powered: {
		color: "#666666",
		textAlign: "center",
		marginTop: "20px",
	},
	whatsappButton: {
		margin: theme.spacing(2, 0, 0),
		background: "#5785FE",
		color: "#ffffff",
		padding: "8px 10px",
		 height: "50px", // Ajuste a altura conforme necessário
		borderRadius: "3px",
		textDecoration: "none",
		display: "flex",
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		gap: "8px",
		"&:hover": {
			background: "#3568f0",
			textAlign: "center",
			alignItems: "center",
			justifyContent: "center",
		},
	},
	logo: {
		margin: "10px auto",
		width: "90%",
		display: "block",
		transform: "scale(0.7)",
	},
}));

const handleNewUserMessage = (newMessage) => {
	window.open(
		`https://api.whatsapp.com/send?phone=5511980999308&text=${encodeURIComponent(
			newMessage
		)}`,
		"_blank"
	);
};

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Muito curto!")
        .max(50, "Muito extenso!")
        .required("Obrigatório"),
    companyName: Yup.string()
        .min(2, "Muito curto!")
        .max(50, "Obrigatório!")
        .required("Obrigatório"),
    password: Yup.string()
        .min(5, "Muito curto!")
        .max(50, "Muito extenso!"),
    email: Yup.string()
        .email("Email inválido")
        .required("Obrigatório"),
    phone: Yup.string()
        .required("O número de telefone é obrigatório")
        .matches(
            /^(?:\+?\d{1,3}[-.\s]?)?\(?(?:\d{2,3})\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/,
            "Número de telefone inválido. Por favor, insira um número de telefone válido do Brasil ou internacional."
        )
});

const SignUp = () => {
	const classes = useStyles();
	const history = useHistory();
	let companyId = null;

	const params = qs.parse(window.location.search);
	if (params.companyId !== undefined) {
		companyId = params.companyId;
	}
	
	const initialState = { name: "", email: "", password: "", phone: "", companyId, companyName: "", planId: "" };
	const [user, setUser] = useState(initialState);
	const [isCodeEnabled, setIsCodeEnabled] = useState(false);
	const [validationCode, setValidationCode] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const dueDate = moment().add(7, "day").format();

	const validCodes = ["WHATSAASCOD-5724", "SOMECODE-9999", "WACODE-8924", "ANOTHERCODE-1234", "YETANOTHERCODE-5678"];

const handleSignUp = async (values) => {
  if (!validCodes.includes(validationCode)) {
    toast.error("Código de validação inválido. Não foi possível registrar.");
    return;
  }

		Object.assign(values, { recurrence: "MENSAL" });
		Object.assign(values, { dueDate: dueDate });
		Object.assign(values, { status: "t" });
		Object.assign(values, { campaignsEnabled: true });


		try {
			await openApi.post("/companies/cadastro", values);
			toast.success(i18n.t("signup.toasts.success"));
			history.push("/login");
		} catch (err) {
			console.log(err);
			toastError(err);
		}
	};

	const [plans, setPlans] = useState([]);
	const { list: listPlans } = usePlans();

	useEffect(() => {
		async function fetchData() {
			const list = await listPlans();
			setPlans(list);
		}
		fetchData();
	}, []);

		const handleWhatsAppClick = () => {
  const welcomeMessage = "🚀 Bem-vindo(a) ao nosso serviço! 🌟\nAguarde enquanto verificamos seu código de validação.\n\n";
  const userDetails = `🏢 *Organização:* ${user.companyName}\n👤 *Nome:* ${user.name}\n✉️ *Email:* ${user.email}\n📱 *WhatsApp:* ${user.phone}\n💼 *Plano:* ${user.planId}\n\n`;
  const message = welcomeMessage + userDetails;
  handleNewUserMessage(message);
  setIsCodeEnabled(true);
};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	
		return (
			<div className={classes.root} >
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						<div>
							<img style={{ margin: "0 auto", height: "70px", width: "100%" }} src={logologin} alt="Whats" />
						</div>
						<Typography component="h1" variant="h5">
							{i18n.t("signup.title")}
						</Typography>
						<Formik
							initialValues={user}
							enableReinitialize={true}
							validationSchema={UserSchema}
							onSubmit={(values, actions) => {
								setTimeout(() => {
									handleSignUp(values);
									actions.setSubmitting(false);
								}, 400);
							}}
						>
							{({ touched, errors, handleChange, handleBlur, values }) => (
								<Form className={classes.form}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Field
												as={TextField}
												variant="outlined"
												fullWidth
												id="companyName"
												label={i18n.t("signup.form.company")}
												error={touched.companyName && Boolean(errors.companyName)}
												helperText={touched.companyName && errors.companyName}
												name="companyName"
												autoComplete="companyName"
												autoFocus
												required
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												as={TextField}
												autoComplete="name"
												name="name"
												error={touched.name && Boolean(errors.name)}
												helperText={touched.name && errors.name}
												variant="outlined"
												fullWidth
												id="name"
												required
												label={i18n.t("signup.form.name")}
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												as={TextField}
												variant="outlined"
												fullWidth
												id="email"
												label={i18n.t("signup.form.email")}
												name="email"
												error={touched.email && Boolean(errors.email)}
												helperText={touched.email && errors.email}
												autoComplete="email"
												required
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												as={TextField}
												variant="outlined"
												fullWidth
												name="password"
												error={touched.password && Boolean(errors.password)}
												helperText={touched.password && errors.password}
												label={i18n.t("signup.form.password")}
												type={showPassword ? 'text' : 'password'}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={() => setShowPassword((e) => !e)}
															>
																{showPassword ? <VisibilityOff /> : <Visibility />}
															</IconButton>
														</InputAdornment>
													)
												}}
												id="password"
												autoComplete="current-password"
												required
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<Field
												as={TextField}
												variant="outlined"
												type="number"
												fullWidth
												id="phone"
												label={i18n.t("signup.form.phone")}
												name="phone"
												error={touched.phone && Boolean(errors.phone)}
												helperText={touched.phone && errors.phone}
												autoComplete="phone"
												required
												inputProps={{ maxLength: 15 }} // Limita o número máximo de caracteres
												//placeholder="(00) 00000-0000" // Placeholder personalizado
												onChange={handleInputChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControl variant="outlined" fullWidth style={{ borderColor: '#B1B6C7', marginTop: '1px' }}>
                      <InputLabel htmlFor="planId">Seleccione su plan de suscripción</InputLabel>
                      <Select
													
													variant="outlined"
													fullWidth
													label="Seleccione su plan de suscripción"
                        labelId="planId"
                        id="planId"
                        name="planId"
                        
                        value={values.planId}
													
													
													
													required
													onChange={handleInputChange}
													
												>
													{plans.map((plan, key) => (
														<MenuItem key={key} value={plan.id}>
															{plan.name} - Atendentes: {plan.users} - WhatsApp:{" "}
															{plan.connections} - Filas: {plan.queues} - R${" "}
															{plan.value}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										 </Grid>
                  {isCodeEnabled && (
  <Grid item xs={12}>
    <Field
      as={TextField}
      variant="outlined"
      fullWidth
      name="validationCode"
      label="Código de validação"
      id="validationCode"
      autoComplete="validation-code"
      required
      value={validationCode}
      onChange={(e) => setValidationCode(e.target.value)}
    />
    {validationCode && (
      <>
        {validCodes.includes(validationCode) ? (
          <Typography variant="body1">Código de validación aceptado. Proceder.</Typography>
        ) : (
          <Typography variant="body1">El código de validación ingresado no es válido.</Typography>
        )}
      </>
    )}
  </Grid>
)}

                </Grid>
									<Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.whatsappButton}
                  startIcon={<VpnKeyIcon />}
                  onClick={handleWhatsAppClick}
                >
                  Solicita tu código
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {i18n.t('signup.buttons.submit')}
                </Button>
									<Grid container justify="flex-end">
										<Grid item>
											<Link
												href="#"
												variant="body2"
												component={RouterLink}
												to="/login"
											>
												{i18n.t("signup.buttons.login")}
											</Link>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</div>
					<Box mt={5}></Box>
				</Container>
			</div>
		);
	};

	export default SignUp;