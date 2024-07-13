import React, {
  useEffect,
  useState,
} from 'react';

import QRCode from 'qrcode.react';

import {
  Dialog,
  DialogContent,
  Paper,
  Typography,
} from '@material-ui/core';

import toastError from '../../errors/toastError';
import api from '../../services/api';
import { socketConnection } from '../../services/socket';
import { i18n } from '../../translate/i18n';

const QrcodeModal = ({ open, onClose, whatsAppId }) => {
  const [qrCode, setQrCode] = useState("");
  const [expirationTime, setExpirationTime] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      if (!whatsAppId) return;

      try {
        const { data } = await api.get(`/whatsapp/${whatsAppId}`);
        setQrCode(data.qrcode);
        setExpirationTime(data.expirationTime); // Assuming the API returns expiration time
      } catch (err) {
        toastError(err);
      }
    };
    fetchSession();
  }, [whatsAppId]);

  useEffect(() => {
    if (!whatsAppId) return;
    const companyId = localStorage.getItem("companyId");
    const socket = socketConnection({ companyId });

    socket.on(`company-${companyId}-whatsappSession`, (data) => {
      if (data.action === "update" && data.session.id === whatsAppId) {
        setQrCode(data.session.qrcode);
        setExpirationTime(data.session.expirationTime); // Assuming the socket event returns expiration time
        setSuccessMessage(""); // Reset success message
      }

      if (data.action === "update" && data.session.qrcode === "") {
        setSuccessMessage("WhatsApp conectado com sucesso!");
        onClose();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [whatsAppId, onClose]);

  const formatTimeLeft = () => {
    if (!expirationTime) return '';

    const now = new Date();
    const timeDiff = expirationTime - now;

    if (timeDiff <= 0) {
      return 'Expirado';
    }

    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" scroll="paper">
      <DialogContent>
        {successMessage && (
          <Typography variant="body1" gutterBottom style={{ color: "green" }}>
            {successMessage}
          </Typography>
        )}
        <Paper elevation={0}>
          <Typography color="primary" gutterBottom>
            {i18n.t("qrCode.message")}
          </Typography>
          {qrCode ? (
            <>
              <QRCode value={qrCode} size={256} />
              {expirationTime && (
                <Typography variant="caption">
                  {`Tempo restante: ${formatTimeLeft()}`}
                </Typography>
              )}
            </>
          ) : (
            <span>Waiting for QR Code</span>
          )}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(QrcodeModal);
