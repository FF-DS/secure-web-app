exports.mutations = {
    setProfileDialogStateFlag: (state, stateFlag) => (state.profileDialogState = stateFlag),
    setNotificationDialogStateValue: (state, stateFlag) => (state.notificationDialogState = stateFlag),
    setSideBarStateFlag: (state, stateFlag) => (state.sideBarState = stateFlag),
    setSideBarBurgerStateFlag: (state, stateFlag) => (state.sideBarBurgerState = stateFlag),
    setProfileEditDialogStateFlag: (state, stateFlag) => (state.profileEditDialogState = stateFlag),
    setUserError: (state, userError) => (state.userError = userError),
    setSnakBarMessageValue: (state, message) => (state.snakBarMessage = message),
    setSelectedObjectValue: (state, selectedObject) => (state.selectedObject = selectedObject),
    setUserNotification: (state, notification) => (state.userNotification = notification),
}