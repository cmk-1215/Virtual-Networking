import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const SET_CURRENT_EVENT = "SET_CURRENT_EVENT";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
export const LOGIN = "LOGIN";
export const JOIN_CONVERSATION = "JOIN_CONVERSATION";
export const LEAVE_ALL_CONVERSATIONS = "LEAVE_ALL_CONVERSATIONS";
export const LOGOUT = "LOGOUT";
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const LEAVE_ONE_CONVERSATION = "LEAVE_ONE_CONVERSATION";

export function getEvents() {
  const url = `/api/events`;
  const request = axios.get(url);

  return {
    type: GET_EVENTS,
    payload: request,
  };
}

export function setCurrentEvent(id) {
  return {
    type: SET_CURRENT_EVENT,
    payload: id,
  };
}

export function getConversations(currentEvent) {
  const url = `/api/events/${currentEvent}`;
  const request = axios.get(url);

  request.then(console.log(`Conversations requested for ${currentEvent}`));

  return {
    type: GET_CONVERSATIONS,
    payload: request,
  };
}

export function login(eventID, userName, role) {
  const url = `/api/users/${eventID}`;

  const request = axios({
    method: "post",
    url: url,
    data: {
      userName: userName,
      role: role,
    },
  });

  // request.then(console.log("login attempted"));

  return {
    type: LOGIN,
    payload: request,
  };
}

export function getJoinedConversations(conversation) {
  return {
    type: JOIN_CONVERSATION,
    payload: conversation,
  };
}

export function leaveAllConversations() {
  return {
    type: LEAVE_ALL_CONVERSATIONS,
    payload: [],
  };
}

export function leaveOneConversation(conversationId) {
  return {
    type: LEAVE_ONE_CONVERSATION,
    payload: conversationId,
  };
}

export function logout(eventId, userId) {
  const url = `/api/events/${eventId}/users/${userId}`;

  const request = axios({
    method: "delete",
    url: url,
  });

  // request.then(console.log("logout attempted"));

  return {
    type: LOGOUT,
    payload: request,
  };
}

export function createConversation(eventId, conversationName) {
  const url = `/api/events/${eventId}/conversation`;

  const request = axios({
    method: "post",
    url: url,
    data: {
      conversationName: conversationName,
    },
  });

  // request.then(console.log("create conversation attempted"));

  return {
    type: CREATE_CONVERSATION,
    payload: request,
  };
}
