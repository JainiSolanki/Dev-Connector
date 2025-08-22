import axios from "axios";
import { setAlert } from "./alert";

// Action Types
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, ACCOUNT_DELETED , CLEAR_PROFILE} from "./types";

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Error fetching profile", "danger"));
  }
}

export const createProfile = (formData, navigate, edit=false) => async dispatch => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if(!edit) {
      navigate('/dashboard');
    }

  } catch(err) {
      if (err.response?.data?.errors) {
      err.response.data.errors.forEach(error => 
        dispatch(setAlert(error.msg, 'danger'))
      );
    }
        
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

//add experience
export const addExperience = (formData, navigate) => async dispatch => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    navigate('/dashboard');

  } catch(err) {
      if (err.response?.data?.errors) {
      err.response.data.errors.forEach(error => 
        dispatch(setAlert(error.msg, 'danger'))
      );
    }
        
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

//add education
export const addEducation = (formData, navigate) => async dispatch => {
  try{
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    navigate('/dashboard');

  } catch(err) {
      if (err.response?.data?.errors) {
      err.response.data.errors.forEach(error => 
        dispatch(setAlert(error.msg, 'danger'))
      );
    }
        
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

//delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Error deleting experience', 'danger'));
  }
}

//delete education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('Error deleting education', 'danger'));
  }
}

//delete account & profile
export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
      dispatch(setAlert('Error deleting account', 'danger'));
    }
  }
}