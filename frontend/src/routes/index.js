import React, {
  useEffect,
  useState,
} from 'react';

import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../context/Auth/AuthContext';
import { TicketsContextProvider } from '../context/Tickets/TicketsContext';
import { WhatsAppsProvider } from '../context/WhatsApp/WhatsAppsContext';
import LoggedInLayout from '../layout';
import Annoucements from '../pages/Annoucements';
import CampaignReport from '../pages/CampaignReport';
import Campaigns from '../pages/Campaigns';
import CampaignsConfig from '../pages/CampaignsConfig';
import Chat from '../pages/Chat';
import Connections from '../pages/Connections/';
import ContactListItems from '../pages/ContactListItems/';
import ContactLists from '../pages/ContactLists/';
import Contacts from '../pages/Contacts/';
import Dashboard from '../pages/Dashboard/';
import Files from '../pages/Files/';
import Financeiro from '../pages/Financeiro/';
import ForgetPassword from '../pages/ForgetPassWord/'; // Reset PassWd
import Helps from '../pages/Helps/';
import Kanban from '../pages/Kanban';
import Login from '../pages/Login/';
import MessagesAPI from '../pages/MessagesAPI/';
import Prompts from '../pages/Prompts';
import QueueIntegration from '../pages/QueueIntegration';
import Queues from '../pages/Queues/';
// import Companies from "../pages/Companies/";
import QuickMessages from '../pages/QuickMessages/';
import Schedules from '../pages/Schedules';
import SettingsCustom from '../pages/SettingsCustom/';
import Signup from '../pages/Signup/';
import Subscription from '../pages/Subscription/';
import Tags from '../pages/Tags/';
import TagsKanban from '../pages/TagsKanban/';
import TicketResponsiveContainer from '../pages/TicketResponsiveContainer';
import ToDoList from '../pages/ToDoList/';
import Users from '../pages/Users';
import Route from './Route';

const Routes = () => {
  const [showCampaigns, setShowCampaigns] = useState(false);

  useEffect(() => {
    const cshow = localStorage.getItem("cshow");
    if (cshow !== undefined) {
      setShowCampaigns(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <TicketsContextProvider>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgetpsw" component={ForgetPassword} /> 
            {/* <Route exact path="/create-company" component={Companies} /> */}
            <WhatsAppsProvider>
              <LoggedInLayout>
                <Route exact path="/" component={Dashboard} isPrivate />
                <Route
                  exact
                  path="/tickets/:ticketId?"
                  component={TicketResponsiveContainer}
                  isPrivate
                />
                <Route
                  exact
                  path="/connections"
                  component={Connections}
                  isPrivate
                />
                <Route
                  exact
                  path="/quick-messages"
                  component={QuickMessages}
                  isPrivate
                />
                <Route
                  exact
                  path="/todolist"
                  component={ToDoList}
                  isPrivate
                  />
                <Route
                  exact
                  path="/schedules"
                  component={Schedules}
                  isPrivate
                />
                <Route exact path="/tags" component={Tags} isPrivate />
                <Route exact path="/contacts" component={Contacts} isPrivate />
                <Route exact path="/helps" component={Helps} isPrivate />
                <Route exact path="/users" component={Users} isPrivate />
                <Route exact path="/queues" component={Queues} isPrivate />
                <Route exact path="/TagsKanban" component={TagsKanban} isPrivate />
                <Route
                 exact
                  path="/announcements"
                  component={Annoucements}
                  isPrivate
                />
                <Route exact path="/files" component={Files} isPrivate />
                <Route exact path="/prompts" component={Prompts} isPrivate />
                <Route exact path="/queue-integration" component={QueueIntegration} isPrivate />

                <Route
                  exact
                  path="/messages-api"
                  component={MessagesAPI}
                  isPrivate
                />
                <Route
                  exact
                  path="/settings"
                  component={SettingsCustom}
                  isPrivate
                />
				        <Route 
                  exact
                  path="/kanban"
                  component={Kanban}
                  isPrivate
                />
                <Route
                  exact
                  path="/financeiro"
                  component={Financeiro}
                  isPrivate
                />
                
                <Route
                  exact
                  path="/subscription"
                  component={Subscription}
                  isPrivate
                />
                <Route exact path="/chats/:id?" component={Chat} isPrivate />
                {showCampaigns && (
                  <>
                    <Route
                      exact
                      path="/contact-lists"
                      component={ContactLists}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/contact-lists/:contactListId/contacts"
                      component={ContactListItems}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/campaigns"
                      component={Campaigns}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/campaign/:campaignId/report"
                      component={CampaignReport}
                      isPrivate
                    />
                    <Route
                      exact
                      path="/campaigns-config"
                      component={CampaignsConfig}
                      isPrivate
                    />
                  </>
                )}
              </LoggedInLayout>
            </WhatsAppsProvider>
          </Switch>
          <ToastContainer autoClose={3000} />
        </TicketsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
