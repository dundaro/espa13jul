import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  IconButton,
  StepContent,
  TextField,
  Tooltip,
  Dialog,           // Importe Dialog do Material-UI
  DialogTitle,      // Importe DialogTitle do Material-UI
  DialogContent,    // Importe DialogContent do Material-UI
  DialogContentText,// Importe DialogContentText do Material-UI
  DialogActions,    // Importe DialogActions do Material-UI
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import { AttachFile, DeleteOutline } from "@material-ui/icons";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Delete";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "20vh",
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  addButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export function QueueOptionStepper({ queueId, options, updateOptions }) {
  const classes = useStyles();
  const [activeOption, setActiveOption] = useState(-1);
  const [attachment, setAttachment] = useState(null);
  const attachmentFile = useRef(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null); // State para guardar o índice da opção a ser deletada

  const handleOption = (index) => async () => {
    setActiveOption(index);
    const option = options[index];

    if (option !== undefined && option.id !== undefined) {
      try {
        const { data } = await api.request({
          url: "/queue-options",
          method: "GET",
          params: { queueId, parentId: option.id },
        });
        const optionList = data.map((option) => ({
          ...option,
          children: [],
          edition: false,
        }));
        option.children = optionList;
        updateOptions([...options]); // Atualiza o estado das opções
      } catch (e) {
        toastError(e);
      }
    }
  };

  const handleSave = async (option) => {
    try {
      if (option.id) {
        await api.request({
          url: `/queue-options/${option.id}`,
          method: "PUT",
          data: option,
        });
      } else {
        const { data } = await api.request({
          url: `/queue-options`,
          method: "POST",
          data: option,
        });
        option.id = data.id;
      }

      // Verifica se há anexo de mídia
      if (attachment) {
        const formData = new FormData();
        formData.append("file", attachment);
        await api.post(`/queue-options/${option.id}/media-upload`, formData);
      }

      option.edition = false;
      updateOptions([...options]); // Atualiza o estado das opções
      setAttachment(null); // Limpa o anexo após o salvamento
    } catch (e) {
      toastError(e);
    }
  };

  const handleEdition = (index) => {
    const updatedOptions = [...options];
    updatedOptions[index].edition = !updatedOptions[index].edition;
    updateOptions(updatedOptions); // Atualiza o estado das opções
  };

  const handleDeleteOption = async (index) => {
    const optionToDelete = options[index];

    if (optionToDelete !== undefined && optionToDelete.id !== undefined) {
      try {
        // Deletar a opção no backend
        await api.request({
          url: `/queue-options/${optionToDelete.id}`,
          method: "DELETE",
        });

        // Remover a opção do estado local
        const updatedOptions = options.filter((option, idx) => idx !== index);

        // Atualizar as opções restantes, se necessário
        updatedOptions.forEach(async (option, order) => {
          option.option = order + 1;
          await handleSave(option);
        });

        updateOptions(updatedOptions); // Atualiza o estado das opções
      } catch (e) {
        toastError(e);
      }
    }
  };

  const handleOptionChangeTitle = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].title = event.target.value;
    updateOptions(updatedOptions); // Atualiza o estado das opções
  };

  const handleOptionChangeMessage = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].message = event.target.value;
    updateOptions(updatedOptions); // Atualiza o estado das opções
  };

  const handleAttachmentFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const openConfirmation = (index) => {
    setDeleteIndex(index);
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setDeleteIndex(null);
    setConfirmationOpen(false);
  };

  const handleDeleteMedia = async () => {
    const index = deleteIndex;
    const optionToDeleteMedia = options[index];
    try {
      await api.delete(`/queue-options/${optionToDeleteMedia.id}/media-upload`);
      optionToDeleteMedia.mediaPath = null;
      optionToDeleteMedia.mediaName = null;
      setAttachment(null);
      updateOptions([...options]); // Atualiza o estado das opções
      closeConfirmation(); // Fecha o modal de confirmação após a exclusão
    } catch (err) {
      toastError(err);
    }
  };

  const renderTitle = (index) => {
    const option = options[index];

    if (option.edition) {
      return (
        <>
          <TextField
            value={option.title}
            onChange={(event) => handleOptionChangeTitle(event, index)}
            size="small"
            className={classes.input}
            placeholder="Título de la opción"
          />
          <Tooltip title="Guardar ediciones">
            <IconButton
              color="primary"
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={() => handleSave(option)}
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar opción">
            <IconButton
              variant="outlined"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={() => handleDeleteOption(index)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
          {!option.mediaPath && (
            <>
              <input
                type="file"
                ref={attachmentFile}
                style={{ display: "none" }}
                onChange={handleAttachmentFile}
              />
              <Tooltip title="Adjuntar medios">
                <IconButton
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.button}
                  onClick={() => attachmentFile.current.click()}
                >
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {(option.mediaPath || attachment) && (
                <Grid xs={12} item>
                  <Button startIcon={<AttachFile />}>
                    {attachment != null ? attachment.name : option.mediaName}
                  </Button>
                  <Tooltip title="Eliminar medios">
                    <IconButton
                      onClick={() => openConfirmation(index)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
          )}
        </>
      );
    }

    return (
      <>
        <Typography>
          {option.title !== "" ? option.title : "Título no definido"}
          <IconButton
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={() => handleEdition(index)}
          >
            <EditIcon />
          </IconButton>
        </Typography>
      </>
    );
  };

  const renderMessage = (index) => {
    const option = options[index];

    if (option.edition) {
      return (
        <>
          <TextField
            style={{ width: "100%" }}
            multiline
            value={option.message}
            onChange={(event) => handleOptionChangeMessage(event, index)}
            size="small"
            className={classes.input}
            placeholder="Introduzca el texto de la opción"
          />
        </>
      );
    }

    return (
      <>
        <Typography>{option.message}</Typography>
      </>
    );
  };

  const handleAddOption = (index) => {
    const optionNumber = options[index].children.length + 1;
    options[index].children.push({
      title: "",
      message: "",
      edition: false,
      option: optionNumber,
      queueId,
      parentId: options[index].id,
      children: [],
      mediaPath: null,
      mediaName: null,
    });
    updateOptions([...options]); // Atualiza o estado das opções
  };

  const renderStep = (option, index) => {
    return (
      <Step key={index}>
        <StepLabel style={{ cursor: "pointer" }} onClick={handleOption(index)}>
          {renderTitle(index)}
        </StepLabel>
        <StepContent>
          {renderMessage(index)}

          {option.id !== undefined && (
            <>
              <Button
                color="primary"
                size="small"
                onClick={() => handleAddOption(index)}
                startIcon={<AddIcon />}
                variant="outlined"
                className={classes.addButton}
              >
                Adicionar
              </Button>
            </>
          )}
          <QueueOptionStepper
            queueId={queueId}
            options={option.children}
            updateOptions={updateOptions}
          />
        </StepContent>
      </Step>
    );
  };

  const renderStepper = () => {
    return (
      <Stepper
        style={{ marginBottom: 0, paddingBottom: 0 }}
        nonLinear
        activeStep={activeOption}
        orientation="vertical"
      >
        {options.map((option, index) => renderStep(option, index))}
      </Stepper>
    );
  };

  return (
    <>
      {renderStepper()}
      <Dialog
        open={confirmationOpen}
        onClose={closeConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          ¿Está seguro de que desea eliminar este medio?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteMedia} color="secondary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function QueueOptions({ queueId }) {
  const classes = useStyles();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (queueId) {
      const fetchOptions = async () => {
        try {
          const { data } = await api.request({
            url: "/queue-options",
            method: "GET",
            params: { queueId, parentId: -1 },
          });
          const optionList = data.map((option) => ({
            ...option,
            children: [],
            edition: false,
          }));
          setOptions(optionList);
        } catch (e) {
          toastError(e);
        }
      };
      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateOptions = (updatedOptions) => {
    setOptions(updatedOptions);
  };

  const addOption = () => {
    const newOption = {
      title: "",
      message: "",
      edition: false,
      option: options.length + 1,
      queueId,
      parentId: null,
      children: [],
      mediaPath: null,
      mediaName: null,
    };
    setOptions([...options, newOption]);
  };

  const renderStepper = () => {
    if (options.length > 0) {
      return (
        <QueueOptionStepper
          queueId={queueId}
          updateOptions={updateOptions}
          options={options}
        />
      );
    }
  };

  return (
    <div className={classes.root}>
      <br />
      <Typography>
      opciones
        <Button
          color="primary"
          size="small"
          onClick={addOption}
          startIcon={<AddIcon />}
          style={{ marginLeft: 10 }}
          variant="outlined"
        >
          para agregar
        </Button>
      </Typography>
      {renderStepper()}
    </div>
  );
}
