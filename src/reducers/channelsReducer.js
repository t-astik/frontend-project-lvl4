const SET_CHANNELS = 'SET_CHANNELS';
const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
const SET_MESSAGES = 'SET_MESSAGES';

const defaultState = {
    channels: [],
    messages: [],
    currentChannel: 1, 
};

export const channelsReducer = (state=defaultState, action) => {
    switch (action.type) {
        case SET_CHANNELS: return {...state, channels: action.payload};
        case SET_MESSAGES: return {...state, messages: action.payload};
        case SET_CURRENT_CHANNEL: return {...state, currentChannel: action.payload};
        default: 
            return state;
    };
};

export const setMessages = (messagers) => ({ type: SET_MESSAGES, payload: messagers});
export const setChannels = (channels) => ({ type: SET_CHANNELS, payload: channels});
export const setCurrentChannel = (channelId) => ({ type: SET_CURRENT_CHANNEL, payload: channelId});