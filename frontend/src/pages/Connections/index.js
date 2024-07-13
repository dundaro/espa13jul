import React, { useCallback, useContext, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { green, red, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {
  CheckCircle as CheckCircleIcon,
  CropFree as QRCodeIcon,
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
  SignalCellular4Bar as ConnectedIcon,
  SignalCellularConnectedNoInternet0Bar as DisconnectedIcon,
  SignalCellularConnectedNoInternet2Bar as TimeoutIcon,
  AddCircleOutline as AddConnectionIcon, // Ícone de "+"
} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { Can } from '../../components/Can';
import ConfirmationModal from '../../components/ConfirmationModal';
import MainContainer from '../../components/MainContainer';
import MainHeader from '../../components/MainHeader';
import MainHeaderButtonsWrapper from '../../components/MainHeaderButtonsWrapper';
import QrcodeModal from '../../components/QrcodeModal';
import TableRowSkeleton from '../../components/TableRowSkeleton';
import Title from '../../components/Title';
import WhatsAppModal from '../../components/WhatsAppModal';
import { AuthContext } from '../../context/Auth/AuthContext';
import { WhatsAppsContext } from '../../context/WhatsApp/WhatsAppsContext';
import toastError from '../../errors/toastError';
import api from '../../services/api';
import { i18n } from '../../translate/i18n';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';


const useStyles = makeStyles((theme) => ({
	mainPaper: {
	  flex: 1,
	  padding: theme.spacing(2),
	  overflowY: "auto",
	  borderRadius: theme.spacing(2),
	  color: theme.palette.text.primary,
	  ...theme.scrollbarStyles,
	  transition: 'box-shadow 0.3s ease-in-out', // Adicionando uma transição suave para a sombra
	  '&:hover': {
		boxShadow: theme.shadows[10], // Aumentando a intensidade da sombra ao passar o mouse
	  },
	  '&:active': {
		transform: 'translateY(2px)', // Adicionando uma pequena animação ao clicar no componente
	  },
	  '&::-webkit-scrollbar-thumb': {
		backgroundColor: theme.palette.grey[500], // Personalizando a cor da barra de rolagem
		borderRadius: '5px', // Arredondando as bordas da alça da barra de rolagem
	  },
	  '&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: theme.palette.grey[700], // Mudando a cor da alça da barra de rolagem ao passar o mouse
	  },
	},
	connectedBackground: {
	  background: green[50], // Fundo para conexão estabelecida
	},
	disconnectedBackground: {
	  background: red[50], // Fundo para conexão desconectada
	},
	timeoutBackground: {
	  background: grey[50], // Fundo para conexão expirada
	},
  }));

const CustomToolTip = ({ title, content, children }) => {
  const classes = useStyles();
  
  return (
    <Tooltip
      arrow
      classes={{
        tooltip: classes.tooltip,
        popper: classes.tooltipPopper,
      }}
      title={
        <React.Fragment>
          <Typography variant="subtitle2" gutterBottom color="inherit">
            {title}
          </Typography>
          {content && <Typography variant="body2">{content}</Typography>}
        </React.Fragment>
      }
    >
      {children}
    </Tooltip>
  );
};

const Connections = () => {
  const classes = useStyles();
  
  const { user } = useContext(AuthContext);
  const { whatsApps, loading } = useContext(WhatsAppsContext);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedWhatsApp, setSelectedWhatsApp] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const confirmationModalInitialState = {
    action: "",
    title: "",
    message: "",
    whatsAppId: "",
    open: false,
  };
  const [confirmModalInfo, setConfirmModalInfo] = useState(
    confirmationModalInitialState
  );

  const handleStartWhatsAppSession = async (whatsAppId) => {
    try {
      await api.post(`/whatsappsession/${whatsAppId}`);
    } catch (err) {
      toastError(err);
    }
  };

  const handleRequestNewQrCode = async (whatsAppId) => {
    try {
      await api.put(`/whatsappsession/${whatsAppId}`);
    } catch (err) {
      toastError(err);
    }
  };

  const handleOpenWhatsAppModal = () => {
    setSelectedWhatsApp(null);
    setWhatsAppModalOpen(true);
  };

  const handleCloseWhatsAppModal = useCallback(() => {
    setWhatsAppModalOpen(false);
    setSelectedWhatsApp(null);
  }, [setSelectedWhatsApp, setWhatsAppModalOpen]);

  const handleOpenQrModal = (whatsApp) => {
    setSelectedWhatsApp(whatsApp);
    setQrModalOpen(true);
  };

  const handleCloseQrModal = useCallback(() => {
    setSelectedWhatsApp(null);
    setQrModalOpen(false);
  }, [setQrModalOpen, setSelectedWhatsApp]);

  const handleEditWhatsApp = (whatsApp) => {
    setSelectedWhatsApp(whatsApp);
    setWhatsAppModalOpen(true);
  };

  const handleOpenConfirmationModal = (action, whatsAppId) => {
    if (action === "disconnect") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.disconnectTitle"),
        message: i18n.t("connections.confirmationModal.disconnectMessage"),
        whatsAppId: whatsAppId,
      });
    }
    
    if (action === "delete") {
      setConfirmModalInfo({
        action: action,
        title: i18n.t("connections.confirmationModal.deleteTitle"),
        message: i18n.t("connections.confirmationModal.deleteMessage"),
        whatsAppId: whatsAppId,
      });
    }
    setConfirmModalOpen(true);
  };

  const handleSubmitConfirmationModal = async () => {
    if (confirmModalInfo.action === "disconnect") {
      try {
        toast.warning("Você está prestes a desconectar o WhatsApp.");
        
        setTimeout(async () => {
          try {
            await api.delete(`/whatsappsession/${confirmModalInfo.whatsAppId}`);
            toast.info("Aguarde, estamos carregando o QR Code para você se conectar novamente.");
            
            setTimeout(() => {
              toast.success("QR CODE gerado com sucesso!");
            }, 2000);
          } catch (err) {
            toastError(err);
          }
        }, 1000);
      } catch (err) {
        toastError(err);
      }
    }
    
    if (confirmModalInfo.action === "delete") {
      try {
        setTimeout(async () => {
          try {
            await api.delete(`/whatsapp/${confirmModalInfo.whatsAppId}`);
            toast.success(i18n.t("connections.toasts.deleted"));
          } catch (err) {
            toastError(err);
          }
        }, 1000);
      } catch (err) {
        toastError(err);
      }
    }
    
    setConfirmModalInfo(confirmationModalInitialState);
  };

  const renderActionButtons = (whatsApp) => {
    return (
      <>
        {whatsApp.status === "qrcode" && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleOpenQrModal(whatsApp)}
          >
            <QRCodeIcon /> {i18n.t("connections.buttons.qrcode")}
          </Button>
        )}
        {whatsApp.status === "DISCONNECTED" && (
          <>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleStartWhatsAppSession(whatsApp.id)}
            >
              {i18n.t("connections.buttons.tryAgain")}
            </Button>{" "}
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => handleRequestNewQrCode(whatsApp.id)}
            >
              {i18n.t("connections.buttons.newQr")}
            </Button>
          </>
        )}
        {(whatsApp.status === "CONNECTED" ||
          whatsApp.status === "PAIRING" ||
          whatsApp.status === "TIMEOUT") && (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleOpenConfirmationModal("disconnect", whatsApp.id);
            }}
          >
            {i18n.t("connections.buttons.disconnect")}
          </Button>
        )}
        {whatsApp.status === "OPENING" && (
          <Button size="small" variant="outlined" disabled color="default">
            {i18n.t("connections.buttons.connecting")}
          </Button>
        )}
      </>
    );
  };

  const renderStatusToolTips = (whatsApp) => {
    return (
      <div className={classes.iconCell}>
        {whatsApp.status === "DISCONNECTED" && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.disconnected.title")}
            content={i18n.t("connections.toolTips.disconnected.content")}
          >
            <DisconnectedIcon style={{ color: red[500] }} />
          </CustomToolTip>
        )}
        {whatsApp.status === "OPENING" && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {whatsApp.status === "qrcode" && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.qrcode.title")}
            content={i18n.t("connections.toolTips.qrcode.content")}
          >
            <QRCodeIcon style={{ color: grey[500] }} />
          </CustomToolTip>
        )}
        {whatsApp.status === "CONNECTED" && (
          <CustomToolTip title={i18n.t("connections.toolTips.connected.title")}>
            <ConnectedIcon style={{ color: green[500] }} />
          </CustomToolTip>
        )}
        {(whatsApp.status === "TIMEOUT" || whatsApp.status === "PAIRING") && (
          <CustomToolTip
            title={i18n.t("connections.toolTips.timeout.title")}
            content={i18n.t("connections.toolTips.timeout.content")}
          >
            <TimeoutIcon style={{ color: red[500] }} />
          </CustomToolTip>
        )}
      </div>
    );
  };

  return (
    <MainContainer>
      <ConfirmationModal
        title={confirmModalInfo.title}
        open={confirmModalOpen}
        onClose={setConfirmModalOpen}
        onConfirm={handleSubmitConfirmationModal}
      >
        {confirmModalInfo.message}
      </ConfirmationModal>
      <QrcodeModal
        open={qrModalOpen}
        onClose={handleCloseQrModal}
        whatsAppId={!whatsAppModalOpen && selectedWhatsApp?.id}
      />
      <WhatsAppModal
        open={whatsAppModalOpen}
        onClose={handleCloseWhatsAppModal}
        whatsAppId={!qrModalOpen && selectedWhatsApp?.id}
      />
      <MainHeader>
        <Title>{i18n.t("connections.title")}</Title>
        <MainHeaderButtonsWrapper>
          <Can
            role={user.profile}
            perform="connections-page:addConnection"
            yes={() => (
				<Button
  variant="contained" // Alterando para um estilo de botão com fundo colorido
  color="primary" // Definindo a cor do botão como primária
  onClick={handleOpenWhatsAppModal}
  className={classes.button}
  style={{
    width: '120px',
    borderRadius: '20px', // Arredondando as bordas do botão
    textTransform: 'none', // Evita a transformação automática de texto em maiúsculas
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Adicionando uma sombra sutil
  }}
  startIcon={<AddIcon style={{ fontSize: 20 }} />}
>
</Button>

            )}
          />
        </MainHeaderButtonsWrapper>
      </MainHeader>
      <Paper className={classes.mainPaper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeaderCell}>
                {i18n.t("connections.table.name")}
              </TableCell>
              <TableCell align="center" className={classes.tableHeaderCell}>
                {i18n.t("connections.table.status")}
              </TableCell>
              <Can
                role={user.profile}
                perform="connections-page:actionButtons"
                yes={() => (
                  <TableCell align="center" className={classes.tableHeaderCell}>
                    {i18n.t("connections.table.session")}
                  </TableCell>
                )}
              />
              <TableCell align="center" className={classes.tableHeaderCell}>
                {i18n.t("connections.table.lastUpdate")}
              </TableCell>
              <TableCell align="center" className={classes.tableHeaderCell}>
                {i18n.t("connections.table.default")}
              </TableCell>
              <Can
                role={user.profile}
                perform="connections-page:editOrDeleteConnection"
                yes={() => (
                  <TableCell align="center" className={classes.tableHeaderCell}>
                    {i18n.t("connections.table.actions")}
                  </TableCell>
                )}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowSkeleton />
            ) : (
              <>
                {whatsApps?.length > 0 &&
                  whatsApps.map((whatsApp) => (
                    <TableRow key={whatsApp.id}>
                      <TableCell align="center">{whatsApp.name}</TableCell>
                      <TableCell align="center">
                        {renderStatusToolTips(whatsApp)}
                      </TableCell>
                      <Can
                        role={user.profile}
                        perform="connections-page:actionButtons"
                        yes={() => (
                          <TableCell align="center">
                            {renderActionButtons(whatsApp)}
                          </TableCell>
                        )}
                      />
                      <TableCell align="center">
                        {format(parseISO(whatsApp.updatedAt), "dd/MM/yy HH:mm")}
                      </TableCell>
                      <TableCell align="center">
                        {whatsApp.isDefault && (
                          <div className={classes.iconCell}>
                            <CheckCircleIcon style={{ color: green[500] }} />
                          </div>
                        )}
                      </TableCell>
                      <Can
                        role={user.profile}
                        perform="connections-page:editOrDeleteConnection"
                        yes={() => (
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => handleEditWhatsApp(whatsApp)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                handleOpenConfirmationModal(
                                  "delete",
                                  whatsApp.id
                                );
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        )}
                      />
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </Paper>
    </MainContainer>
  );
};

export default Connections;
