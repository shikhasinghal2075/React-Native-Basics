const serverUrl = "http://192.168.1.13:8082"
let chargers = []
let selectedConnector= {
    chargerId: '',
    connectorId: ''
}
let transactionId = 0
let sessionEndInfo= {
    unitsConsumed: '',
    bill: ''
}

export const getServerUrl = () => {
    return serverUrl;
}

export const getChargers = () => {
    return chargers
}

export const setChargers = (chargersData) => {
    chargers = chargersData
}

export const getSelectedConnector = () => {
    return selectedConnector;
}

export const setSelectedConnector = (connectorInfo) => {
    selectedConnector.chargerId = connectorInfo.chargerId;
    selectedConnector.connectorId = connectorInfo.connectorId;
}

export const getTransactionId = () => {
    return transactionId;
}

export const setTransactionId = (id) => {
    transactionId = id
}

export const getSessionEndInfo = () => {
    return sessionEndInfo
}

export const setSessionEndInfo = (info) => {
    sessionEndInfo.unitsConsumed = info.unitsConsumed;
    sessionEndInfo.bill = info.bill;
}
