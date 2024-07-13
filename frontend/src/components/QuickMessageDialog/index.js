import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Field,
  Form,
  Formik,
} from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import { AuthContext } from '../../context/Auth/AuthContext';
import toastError from '../../errors/toastError';
import api from '../../services/api';
import { i18n } from '../../translate/i18n';
import ConfirmationModal from '../ConfirmationModal';
import MessageVariablesPicker from '../MessageVariablesPicker';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const QuickMessageSchema = Yup.object().shape({
  shortcode: Yup.string().required('Obrigatório'),
});

const QuickMessageDialog = ({ open, onClose, quickMessageId, reload }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { profile } = user;
  const messageInputRef = useRef();
  const attachmentFileRef = useRef(null);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState({
    shortcode: '',
    message: '',
    geral: false,
    status: true,
  });
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    const fetchQuickMessage = async () => {
      try {
        if (!quickMessageId) return;
        const { data } = await api.get(`/quick-messages/${quickMessageId}`);
        setQuickMessage((prev) => ({ ...prev, ...data }));
      } catch (err) {
        toastError(err);
      }
    };
    fetchQuickMessage();
  }, [quickMessageId, open]);

  const handleClose = () => {
    setQuickMessage({
      shortcode: '',
      message: '',
      geral: false,
      status: true,
    });
    setAttachment(null);
    onClose();
  };

  const handleAttachmentFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleSaveQuickMessage = async (values) => {
    const quickMessageData = { ...values };
    try {
      const endpoint = quickMessageId ? `/quick-messages/${quickMessageId}` : "/quick-messages";
      const { data } = quickMessageId ? 
        await api.put(endpoint, quickMessageData) : 
        await api.post(endpoint, quickMessageData);

      if (attachment) {
        const formData = new FormData();
        formData.append("typeArch", "quickMessage");
        formData.append("file", attachment);
        await api.post(`/quick-messages/${data.id}/media-upload`, formData);
      }
      toast.success(i18n.t("quickMessages.toasts.success"));
      if (reload) {
        reload();
      }
    } catch (err) {
      toastError(err);
    }
    handleClose();
  };

  const deleteMedia = async () => {
    if (attachment) {
      setAttachment(null);
      attachmentFileRef.current.value = null;
    }

    if (quickMessage.mediaPath) {
      await api.delete(`/quick-messages/${quickMessage.id}/media-upload`);
      setQuickMessage((prev) => ({ ...prev, mediaPath: null }));
      toast.success(i18n.t("quickMessages.toasts.deleted"));
      if (reload) {
        reload();
      }
    }
  };

  const handleClickMsgVar = async (msgVar, setValueFunc) => {
    const el = messageInputRef.current;
    const firstHalfText = el.value.substring(0, el.selectionStart);
    const secondHalfText = el.value.substring(el.selectionEnd);
    const newCursorPos = el.selectionStart + msgVar.length;

    setValueFunc("message", `${firstHalfText}${msgVar}${secondHalfText}`);

    await new Promise((resolve) => setTimeout(resolve, 100));
    messageInputRef.current.setSelectionRange(newCursorPos, newCursorPos);
  };

  return (
    <div className={classes.root}>
      <ConfirmationModal
        title={i18n.t("quickMessages.confirmationModal.deleteTitle")}
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={deleteMedia}
      >
        {i18n.t("quickMessages.confirmationModal.deleteMessage")}
      </ConfirmationModal>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        scroll="paper"
      >
        <DialogTitle id="form-dialog-title">
          {quickMessageId ? `${i18n.t("quickMessages.dialog.edit")}` : `${i18n.t("quickMessages.dialog.add")}`}
        </DialogTitle>
        <div style={{ display: "none" }}>
          <input
            type="file"
            ref={attachmentFileRef}
            onChange={handleAttachmentFile}
          />
        </div>
        <Formik
          initialValues={quickMessage}
          enableReinitialize={true}
          validationSchema={QuickMessageSchema}
          onSubmit={handleSaveQuickMessage}
        >
          {({ touched, errors, isSubmitting, setFieldValue }) => (
            <Form>
              <DialogContent dividers>
                <Grid spacing={2} container>
                  <Grid xs={12} item>
                    <Field
                      as={TextField}
                      autoFocus
                      label={i18n.t("quickMessages.dialog.shortcode")}
                      name="shortcode"
                      error={touched.shortcode && Boolean(errors.shortcode)}
                      helperText={touched.shortcode && errors.shortcode}
                      variant="outlined"
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <Field
                      as={TextField}
                      label={i18n.t("quickMessages.dialog.message")}
                      name="message"
                      inputRef={messageInputRef}
                      error={touched.message && Boolean(errors.message)}
                      helperText={touched.message && errors.message}
                      variant="outlined"
                      margin="dense"
                      multiline
                      rows={7}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <MessageVariablesPicker
                      disabled={isSubmitting}
                      onClick={(value) => handleClickMsgVar(value, setFieldValue)}
                    />
                  </Grid>
                  {(quickMessage.mediaPath || attachment) && (
                    <Grid xs={12} item>
                      <Button startIcon={<AttachFileIcon />}>
                        {attachment ? attachment.name : quickMessage.mediaName}
                      </Button>
                      <IconButton
                        onClick={() => setConfirmationOpen(true)}
                        color="secondary"
                      >
                        <DeleteOutlineIcon color="secondary" />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                {!attachment && !quickMessage.mediaPath && (
                  <Button
                    color="primary"
                    onClick={() => attachmentFileRef.current.click()}
                    disabled={isSubmitting}
                    variant="outlined"
                  >
                    {i18n.t("quickMessages.buttons.attach")}
                  </Button>
                )}
                <Button
                  onClick={handleClose}
                  color="secondary"
                  disabled={isSubmitting}
                  variant="outlined"
                >
                  {i18n.t("quickMessages.buttons.cancel")}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  variant="contained"
                  className={classes.buttonWrapper}
                >
                  {quickMessageId ? `${i18n.t("quickMessages.buttons.edit")}` : `${i18n.t("quickMessages.buttons.add")}`}
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default QuickMessageDialog;
