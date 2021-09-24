import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { put, takeLatest } from "redux-saga/effects";

export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
};

// #####################################################
// #####################################################


const initialDashboardState = {
    isAuthorized: false
};

// #####################################################


// export const reducer = (state = initialDashboardState, action) => {
export const reducer = persistReducer(
    { storage, key: "v01-clara-auth", whitelist: ["isAuthorized"] },
    (state = initialDashboardState, action) => {

        switch (action.type) {

            case actionTypes.Login: {
                return { 
                    ...state,
                    isAuthorized: true
                }
            }

            case actionTypes.Logout: {
                return { 
                    ...state,
                    isAuthorized: false
                }
            }

            default:
                return state;
        }
    }
)

// #####################################################
// #####################################################

export const actions = {

    login: response => {
		return { type: actionTypes.Login, payload: { response } }
	},
    logout: () => {
		return { type: actionTypes.Logout }
	},
}

// #####################################################
// #####################################################

export function* saga() {

    // yield takeLatest(actionTypes.GetDataDashboard, function* getDataDashboardSaga( action ) {
    //     yield put(actions.setStatusDataDashboard("initial"))
    //     try {
    //         const dataWeeks = yield getDataDashboardAsync( action.payload.startDateWeek, action.payload.userUUIDs, action.payload.type )
    //         yield put(actions.requestDataDashboardCompleted( dataWeeks.data ))
    //     } catch(error) {
    //         yield put(actions.setStatusDataDashboard("fail"))
    //     }

    // })
}
