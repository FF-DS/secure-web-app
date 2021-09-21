exports.getters = {
    getProfileDialogState: (state) => state.profileDialogState,
    getNotificationDialogState: (state) => state.notificationDialogState,
    getProfileEditDialogState: (state) => state.profileEditDialogState,
    getSideBarState: (state) => state.sideBarState,
    getSideBarBurgerState: (state) => state.sideBarBurgerState,
    getUserError: (state) => state.userError,
    getSnakBarMessage: (state) => state.snakBarMessage,
    getSelectedObject: (state) => state.selectedObject,
    getUserNotification: (state) => state.userNotification,
}