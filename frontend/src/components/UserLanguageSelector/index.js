import React, { useContext, useState } from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import TranslateIcon from "@material-ui/icons/Translate";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";
import api from "../../services/api";

const UserLanguageSelector = () => {
    const [langueMenuAnchorEl, setLangueMenuAnchorEl] = useState(null);
    const { user } = useContext(AuthContext);

    // Verifica se o usuário está presente e tem um ID
    if (!user || !user.id) {
        return null; // Se o usuário não estiver disponível, não renderize o seletor de idioma
    }

    const handleOpenLanguageMenu = (event) => {
        setLangueMenuAnchorEl(event.currentTarget);
    };

    const handleCloseLanguageMenu = () => {
        setLangueMenuAnchorEl(null);
    };

    const handleChangeLanguage = async (language) => {
        try {
            await i18n.changeLanguage(language);
            await api.put(`/users/${user.id}`, { language });
        } catch (error) {
            handleApiError(error);
        } finally {
            handleCloseLanguageMenu();
        }
    };

    const handleApiError = (error) => {
        if (error.response && error.response.status === 401) {
            toastError("Unauthorized: Please login again.");
            // Você pode redirecionar para a página de login ou tratar a desconexão do usuário aqui
        } else {
            toastError("An error occurred while changing language.");
        }
    };

    return (
        <>
            <Button
                color="inherit"
                onClick={handleOpenLanguageMenu}
                startIcon={<TranslateIcon style={{ color: "white" }} />}
                style={{ color: "white" }}
                aria-haspopup="true" // Adiciona atributo aria para acessibilidade
                aria-controls="language-menu" // ID do menu associado
            >
                <ExpandMoreIcon />
            </Button>
            <Menu
                id="language-menu" // ID do menu
                anchorEl={langueMenuAnchorEl}
                keepMounted
                open={Boolean(langueMenuAnchorEl)}
                onClose={handleCloseLanguageMenu}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {/* Adicione um identificador único para cada idioma */}
                <MenuItem onClick={() => handleChangeLanguage("ptBr")}>
                    Português
                </MenuItem>
                <MenuItem onClick={() => handleChangeLanguage("en")}>
                    Inglês
                </MenuItem>
                <MenuItem onClick={() => handleChangeLanguage("es")}>
                    Espanhol
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserLanguageSelector;
