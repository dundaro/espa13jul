import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { isArray } from 'lodash';
import {
  Link as RouterLink,
  useHistory,
} from 'react-router-dom';

import {
  Badge,
  List,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  AllInclusive,
  AttachFile,
  DeviceHubOutlined,
} from '@material-ui/icons';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ForumIcon from '@material-ui/icons/Forum';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PlaylistAddCheckTwoToneIcon
  from '@material-ui/icons/PlaylistAddCheckTwoTone';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CampaignIcon from '@mui/icons-material/Campaign';
import HelpIcon from '@mui/icons-material/Help';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import PowerSettingsNewRoundedIcon
  from '@mui/icons-material/PowerSettingsNewRounded';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import StyleIcon from '@mui/icons-material/Style';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
//ICone novos
import WindowIcon from '@mui/icons-material/Window';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import { Can } from '../components/Can';
import { AuthContext } from '../context/Auth/AuthContext';
import { WhatsAppsContext } from '../context/WhatsApp/WhatsAppsContext';
import toastError from '../errors/toastError';
import usePlans from '../hooks/usePlans';
import api from '../services/api';
import { socketConnection } from '../services/socket';
import { i18n } from '../translate/i18n';

const useStyles = makeStyles((theme) => ({
  ListSubheader: {
    height: 26,
    marginTop: "-15px",
    marginBottom: "-10px",
  },
  cardcampanha: {
    fontSize: "55px",
  },
}));


function ListItemLink(props) {
  const { icon, primary, to, className } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button dense component={renderLink} className={className}>
        {icon ? <ListItemIcon style={{ color: "white" }}>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} style={{ color: "white" }} />
      </ListItem>
    </li>
  );
}

const reducer = (state, action) => {
  if (action.type === "LOAD_CHATS") {
    const chats = action.payload;
    const newChats = [];

    if (isArray(chats)) {
      chats.forEach((chat) => {
        const chatIndex = state.findIndex((u) => u.id === chat.id);
        if (chatIndex !== -1) {
          state[chatIndex] = chat;
        } else {
          newChats.push(chat);
        }
      });
    }

    return [...state, ...newChats];
  }

  if (action.type === "UPDATE_CHATS") {
    const chat = action.payload;
    const chatIndex = state.findIndex((u) => u.id === chat.id);

    if (chatIndex !== -1) {
      state[chatIndex] = chat;
      return [...state];
    } else {
      return [chat, ...state];
    }
  }

  if (action.type === "DELETE_CHAT") {
    const chatId = action.payload;

    const chatIndex = state.findIndex((u) => u.id === chatId);
    if (chatIndex !== -1) {
      state.splice(chatIndex, 1);
    }
    return [...state];
  }

  if (action.type === "RESET") {
    return [];
  }

  if (action.type === "CHANGE_CHAT") {
    const changedChats = state.map((chat) => {
      if (chat.id === action.payload.chat.id) {
        return action.payload.chat;
      }
      return chat;
    });
    return changedChats;
  }
};

const MainListItems = (props) => {
  const classes = useStyles();
  const { drawerClose, collapsed } = props;
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user, handleLogout } = useContext(AuthContext);
  const [connectionWarning, setConnectionWarning] = useState(false);
  const [openCampaignSubmenu, setOpenCampaignSubmenu] = useState(false);
  const [showCampaigns, setShowCampaigns] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [showOpenAi, setShowOpenAi] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false); const history = useHistory();
  const [showSchedules, setShowSchedules] = useState(false);
  const [showInternalChat, setShowInternalChat] = useState(false);
  const [showExternalApi, setShowExternalApi] = useState(false);

  const [invisible, setInvisible] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParam] = useState("");
  const [chats, dispatch] = useReducer(reducer, []);
  const { getPlanCompany } = usePlans();

  useEffect(() => {
    dispatch({ type: "RESET" });
    setPageNumber(1);
  }, [searchParam]);

  useEffect(() => {
    async function fetchData() {
      const companyId = user.companyId;
      const planConfigs = await getPlanCompany(undefined, companyId);

      setShowCampaigns(planConfigs.plan.useCampaigns);
      setShowKanban(planConfigs.plan.useKanban);
      setShowOpenAi(planConfigs.plan.useOpenAi);
      setShowIntegrations(planConfigs.plan.useIntegrations);
      setShowSchedules(planConfigs.plan.useSchedules);
      setShowInternalChat(planConfigs.plan.useInternalChat);
      setShowExternalApi(planConfigs.plan.useExternalApi);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchChats();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, pageNumber]);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const socket = socketConnection({ companyId });

    socket.on(`company-${companyId}-chat`, (data) => {
      if (data.action === "new-message") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
      if (data.action === "update") {
        dispatch({ type: "CHANGE_CHAT", payload: data });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    let unreadsCount = 0;
    if (chats.length > 0) {
      for (let chat of chats) {
        for (let chatUser of chat.users) {
          if (chatUser.userId === user.id) {
            unreadsCount += chatUser.unreads;
          }
        }
      }
    }
    if (unreadsCount > 0) {
      setInvisible(false);
    } else {
      setInvisible(true);
    }
  }, [chats, user.id]);

  useEffect(() => {
    if (localStorage.getItem("cshow")) {
      setShowCampaigns(true);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (whatsApps.length > 0) {
        const offlineWhats = whatsApps.filter((whats) => {
          return (
            whats.status === "qrcode" ||
            whats.status === "PAIRING" ||
            whats.status === "DISCONNECTED" ||
            whats.status === "TIMEOUT" ||
            whats.status === "OPENING"
          );
        });
        if (offlineWhats.length > 0) {
          setConnectionWarning(true);
        } else {
          setConnectionWarning(false);
        }
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [whatsApps]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get("/chats/", {
        params: { searchParam, pageNumber },
      });
      dispatch({ type: "LOAD_CHATS", payload: data.records });
    } catch (err) {
      toastError(err);
    }
  };

  const handleClickLogout = () => {
    //handleCloseMenu();
    handleLogout();
  };

  return (
    <div onClick={drawerClose}>
      <Can
        role={user.profile}
        perform={"drawer-service-items:view"}
        style={{
          overflowY: "scroll",
        }}
        no={() => (
          <>
            <ListSubheader
              hidden={collapsed}
              style={{
                position: "relative",
                fontSize: "17px",
                textAlign: "left",
                paddingLeft: 20
              }}
              inset
              color="inherit">
              {i18n.t("Atendimento")}
            </ListSubheader>
            <>


              <ListItemLink
                to="/tickets"
                primary={i18n.t("mainDrawer.listItems.tickets")}
                icon={<WhatsAppIcon />}
              />
              <ListItemLink
                to="/quick-messages"
                primary={i18n.t("mainDrawer.listItems.quickMessages")}
                icon={<FlashOnIcon />}
              />
              {showKanban && (
                <>
                  <ListItemLink
                    to="/kanban"
                    primary={i18n.t("mainDrawer.listItems.kanban")}
                    icon={<ViewKanbanIcon />}
                  />
                  <ListItemLink
                    to="/tagsKanban"
                    primary={i18n.t("mainDrawer.listItems.tagsKanban")}
                    icon={<StyleIcon />}
                  />
                </>
              )}
              <ListItemLink
                to="/todolist"
                primary={i18n.t("mainDrawer.listItems.todolist")}
                icon={<BorderColorIcon />}
              />
              <ListItemLink
                to="/contacts"
                primary={i18n.t("mainDrawer.listItems.contacts")}
                icon={<RecentActorsIcon />}
              />
              {showSchedules && (
                <>
                  <ListItemLink
                    to="/schedules"
                    primary={i18n.t("mainDrawer.listItems.schedules")}
                    icon={<WorkHistoryIcon />}
                  />
                </>
              )}
              <ListItemLink
                to="/tags"
                primary={i18n.t("mainDrawer.listItems.tags")}
                icon={<LoyaltyIcon />}
              />
              {showInternalChat && (
                <>
                  <ListItemLink
                    to="/chats"
                    primary={i18n.t("mainDrawer.listItems.chats")}
                    icon={
                      <Badge color="secondary" variant="dot" invisible={invisible}>
                        <ForumIcon />
                      </Badge>
                    }
                  />
                </>
              )}
              <ListItemLink
                to="/helps"
                primary={i18n.t("mainDrawer.listItems.helps")}
                icon={<HelpIcon />}
              />
            </>
          </>
        )}
      />

      <Can
        role={user.profile}
        perform={"drawer-admin-items:view"}
        yes={() => (
          <>
            <Divider />
            <ListSubheader
              hidden={collapsed}
              style={{
                position: "relative",
                fontSize: "17px",
                textAlign: "left",
                paddingLeft: 20
              }}
              inset
              color="inherit">
              {i18n.t("Gerência")}
            </ListSubheader>
            <ListItemLink
              small
              to="/"
              primary={i18n.t("mainDrawer.listItems.dashboard")}
              icon={<WindowIcon />}
            />
          </>
        )}
      />
      <Can
        role={user.profile}
        perform="drawer-admin-items:view"
        yes={() => (
          <>
            <Divider />
            <ListSubheader
              hidden={collapsed}
              style={{
                position: "relative",
                fontSize: "17px",
                textAlign: "left",
                paddingLeft: 20
              }}
              inset
              color="inherit">
              {i18n.t("mainDrawer.listItems.administration")}
            </ListSubheader>

            {showCampaigns && (
              <List component="div" disablePadding>
                <ListItemLink
                  to="/campaigns"
                  primary={i18n.t("mainDrawer.listItems.campaigns")}
                  icon={<CampaignIcon />}
                />
                <ListItemLink
                  to="/contact-lists"
                  primary={i18n.t("mainDrawer.listItems.lists")}
                  icon={<PlaylistAddCheckTwoToneIcon />}
                />
                <ListItemLink
                  to="/campaigns-config"
                  primary={i18n.t("mainDrawer.listItems.config")}
                  icon={<TuneOutlinedIcon />}
                />
              </List>
            )}
            {user.super && (
            <ListItemLink
              to="/announcements"
              primary={i18n.t("mainDrawer.listItems.annoucements")}
              icon={<AnnouncementIcon />}
              />
            )}
            {showOpenAi && (
              <ListItemLink
                to="/prompts"
                primary={i18n.t("mainDrawer.listItems.prompts")}
                icon={<AllInclusive />}
              />
            )}

            {showIntegrations && (
              <ListItemLink
                to="/queue-integration"
                primary={i18n.t("mainDrawer.listItems.queueIntegration")}
                icon={<DeviceHubOutlined />}
              />
            )}
            <ListItemLink
              to="/connections"
              primary={i18n.t("mainDrawer.listItems.connections")}
              icon={
                <Badge badgeContent={connectionWarning ? "!" : 0} color="error">
                  <SyncAltIcon />
                </Badge>
              }
            />
            <ListItemLink
              to="/files"
              primary={i18n.t("mainDrawer.listItems.files")}
              icon={<AttachFile />}
            />
            <ListItemLink
              to="/queues"
              primary={i18n.t("mainDrawer.listItems.queues")}
              icon={<AccountTreeOutlinedIcon />}
            />
            <ListItemLink
              to="/users"
              primary={i18n.t("mainDrawer.listItems.users")}
              icon={<PeopleAltOutlinedIcon />}
            />
            {showExternalApi && (
              <>
                <ListItemLink
                  to="/messages-api"
                  primary={i18n.t("mainDrawer.listItems.messagesAPI")}
                  icon={<CodeRoundedIcon />}
                />
              </>
            )}
            <ListItemLink
              to="/financeiro"
              primary={i18n.t("mainDrawer.listItems.financeiro")}
              icon={<LocalAtmIcon />}
            />

            <ListItemLink
              to="/settings"
              primary={i18n.t("mainDrawer.listItems.settings")}
              icon={<SettingsOutlinedIcon />}
            />
            { }

          </>
        )}
      />
      
      <li>
        <ListItem
          button
          dense
          onClick={handleClickLogout}>
          <ListItemIcon><PowerSettingsNewRoundedIcon style={{ color: "#ffffff" }} /></ListItemIcon>
          <ListItemText primary={i18n.t("Sair")} style={{ color: "#ffffff" }} />
        </ListItem>
        <Typography style={{ fontSize: "11px", color: "#ffffff", padding: "10px", textAlign: "right", fontWeight: "bold", marginTop: "5px" }}>
          VB6.6.0
        </Typography>
      </li>
    </div>
  );
};

export default MainListItems;