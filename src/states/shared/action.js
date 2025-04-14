/**
 * @TODO: Define all the actions (creator) that uses a combination of actions from various domain
 */
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveTaksActionCreator } from '../talks/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

function asyncPopulateUsersAndTalks() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const talks = await api.getAllTalks();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveTaksActionCreator(talks));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndTalks };