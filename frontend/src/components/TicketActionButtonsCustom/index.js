import React, { useContext, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { MoreVert, Replay } from "@material-ui/icons";

import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import TicketOptionsMenu from "../TicketOptionsMenu";
import ButtonWithSpinner from "../ButtonWithSpinner";
import toastError from "../../errors/toastError";
import { Can } from "../Can";
import { AuthContext } from "../../context/Auth/AuthContext";
import { TicketsContext } from "../../context/Tickets/TicketsContext";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ConfirmationModal from "../ConfirmationModal";
import TransferTicketModalCustom from "../TransferTicketModalCustom";
import ScheduleModal from "../ScheduleModal";
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { green } from '@material-ui/core/colors';
import EventIcon from "@material-ui/icons/Event";
import UndoIcon from '@material-ui/icons/Undo';
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CachedOutlinedIcon from "@material-ui/icons/CachedOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { BiSend, BiTransfer } from 'react-icons/bi';


const useStyles = makeStyles(theme => ({
	actionButtons: {
		marginRight: 6,
		flex: "none",
		alignSelf: "center",
		marginLeft: "auto",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	},
}));

const TicketActionButtonsCustom = ({
	ticket,
	handleClose,
	showSelectMessageCheckbox,
	selectedMessages,
	forwardMessageModalOpen,
	setForwardMessageModalOpen
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const [loading, setLoading] = useState(false);
	const isMounted = useRef(true);
	const ticketOptionsMenuOpen = Boolean(anchorEl);
	const [initialState, setInitialState] = useState({ ratingId: "" });
	const { user } = useContext(AuthContext);
	const { setCurrentTicket } = useContext(TicketsContext);
	const [showSchedules, setShowSchedules] = useState(false);
	const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
	const [confirmationOpen, setConfirmationOpen] = useState(false);
	const [transferTicketModalOpen, setTransferTicketModalOpen] = useState(false);
	const [contactId, setContactId] = useState(null);

	const customTheme = createTheme({
		palette: {
			primary: green,
		}
	});
	const handleOpenTransferModal = (e) => {
		setTransferTicketModalOpen(true);
		if (typeof handleClose == "function") handleClose();
	};

	const handleOpenConfirmationModal = (e) => {
		setConfirmationOpen(true);
		if (typeof handleClose == "function") handleClose();
	};

	const handleCloseTicketWithoutFarewellMsg = async () => {
		setLoading(true);
		try {
			await api.put(`/tickets/${ticket.id}`, {
				status: "closed",
				userId: user?.id || null,
				sendFarewellMessage: false,
				amountUsedBotQueues: 0
			});

			setLoading(false);
			history.push("/tickets");
		} catch (err) {
			setLoading(false);
			toastError(err);
		}
	};

	const handleCloseTransferTicketModal = () => {
		if (isMounted.current) {
			setTransferTicketModalOpen(false);
		}
	};

	const handleDeleteTicket = async () => {
		try {
			await api.delete(`/tickets/${ticket.id}`);
		} catch (err) {
			toastError(err);
		}
	};


	const handleOpenTicketOptionsMenu = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseTicketOptionsMenu = e => {
		setAnchorEl(null);
	};

	const handleOpenModalForward = () => {
		if (selectedMessages.length === 0) {
			toastError({ response: { data: { message: "Nenhuma mensagem selecionada" } } });
			return;
		}
		setForwardMessageModalOpen(true);
	}

	const handleUpdateTicketStatus = async (e, status, userId) => {
		setLoading(true);
		try {
			await api.put(`/tickets/${ticket.id}`, {
				status: status,
				userId: userId || null,
			});

			setLoading(false);
			if (status === "open") {
				setCurrentTicket({ ...ticket, code: "#open" });
			} else {
				setCurrentTicket({ id: null, code: null })
				history.push("/tickets");
			}
		} catch (err) {
			setLoading(false);
			toastError(err);
		}
	};

	const handleOpenScheduleModal = () => {
		if (typeof handleClose == "function") handleClose();
		setContactId(ticket.contact.id);
		setScheduleModalOpen(true);
	}

	const handleCloseScheduleModal = () => {
		setScheduleModalOpen(false);
		setContactId(null);
	}
	return (
		<div className={classes.actionButtons}>
			{ticket.status === "closed" && (
				<ButtonWithSpinner
					loading={loading}
					startIcon={<Replay />}
					size="small"
					onClick={e => handleUpdateTicketStatus(e, "open", user?.id)}
				>
					{i18n.t("messagesList.header.buttons.reopen")}
				</ButtonWithSpinner>
			)}
			{ticket.status === "open" && (
				<>
					{!showSelectMessageCheckbox ? (
						<>
							<IconButton className={classes.bottomButtonVisibilityIcon}>
								<Tooltip title="Devolver la cola">
									<UndoIcon
										color="primary"
										onClick={(e) => handleUpdateTicketStatus(e, "pending", null)}
									/>
								</Tooltip>
							</IconButton>
							<IconButton className={classes.bottomButtonVisibilityIcon}>
								<Tooltip title="Conversación privada">
									<HighlightOffIcon
										color="primary"
										onClick={(e) => handleUpdateTicketStatus(e, "closed", user?.id)}
									/>
								</Tooltip>
							</IconButton>
							<IconButton className={classes.bottomButtonVisibilityIcon}>
								<Tooltip title="Transferir conversación">
									<TransferWithinAStationIcon
										color="primary"
										onClick={handleOpenTransferModal}
									/>
								</Tooltip>
							</IconButton>
							<IconButton className={classes.bottomButtonVisibilityIcon}>
								<Tooltip title="Planificación">
									<EventIcon
										color="primary"
										onClick={handleOpenScheduleModal}
									/>
								</Tooltip>
							</IconButton>
							<Can
								role={user.profile}
								perform="ticket-options:deleteTicket"
								yes={() => (
									<IconButton className={classes.bottomButtonVisibilityIcon}>
										<Tooltip title="Eliminar billete">
											<DeleteOutlineIcon
												color="primary"
												onClick={handleOpenConfirmationModal}
											/>
										</Tooltip>
									</IconButton>
								)}
							/>
							<ThemeProvider theme={customTheme}>
							</ThemeProvider>
						</>) : (
						<ButtonWithSpinner
							loading={loading}
							startIcon={<BiSend />}
							size="small"
							onClick={handleOpenModalForward}
						>
							{i18n.t("messageOptionsMenu.forwardbutton")}
						</ButtonWithSpinner>
					)}
				</>
			)}
			<ConfirmationModal
				title={`${i18n.t("ticketOptionsMenu.confirmationModal.title")} #${ticket.id}?`}
				open={confirmationOpen}
				onClose={setConfirmationOpen}
				onConfirm={handleDeleteTicket}
			>
				{i18n.t("ticketOptionsMenu.confirmationModal.message")}
			</ConfirmationModal>
			<TransferTicketModalCustom
				modalOpen={transferTicketModalOpen}
				onClose={handleCloseTransferTicketModal}
				ticketid={ticket.id}
			/>
			<ScheduleModal
				open={scheduleModalOpen}
				onClose={handleCloseScheduleModal}
				aria-labelledby="form-dialog-title"
				contactId={contactId}
			/>
			{ticket.status === "pending" && (
				<ButtonWithSpinner
					loading={loading}
					size="small"
					variant="contained"
					color="primary"
					onClick={e => handleUpdateTicketStatus(e, "open", user?.id)}
				>
					{i18n.t("messagesList.header.buttons.accept")}
				</ButtonWithSpinner>
			)}
		</div>
	);
};

export default TicketActionButtonsCustom;
