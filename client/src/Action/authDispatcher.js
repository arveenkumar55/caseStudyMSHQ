import {
    LOG_IN_SUCCESS,
    LOG_OUT,
    GET_ALL_TECHNICIAN,
    GET_ALL_MANAGER
  } from "./globalTypes";
  
  import { Login, _SignUp , _updateProfile, _updatePassword,  _ResetPassword, getAllTechnician, getAllManager} from "../services/authentication";
  
  export const _getAllTechnician = (payload) => async (dispatch) => {
    try {
    const data = await getAllTechnician(payload);
  
     if(data.success) {
    dispatch({
      type: GET_ALL_TECHNICIAN,
      payload: data.payload
    })
  
  }
  }catch (error) {
                
    console.log('Ticket', error)
    
    
  }
  }

  
  export const _getAllManager = (payload) => async (dispatch) => {
    try {
    const data = await getAllManager(payload);
  
     if(data.success) {
    dispatch({
      type: GET_ALL_MANAGER,
      payload: data.payload
    })
  
  }
  }catch (error) {
                
    console.log('Ticket', error)
    
    
  }
  }


  export const signIN =
    (payload, callBack) =>
    async (dispatch) => {
      try {
        const data = await Login(payload);

        console.log('login data', data)
  
        if (data.success) {

          sessionStorage.setItem("user", JSON.stringify(data.payload));
          dispatch({
            type: LOG_IN_SUCCESS,
            payload: data.payload ,
          })

        }
        callBack(data) 
     } catch (error) {
                
      console.log('login data', error)

        callBack('Internal Server Error');
      }
    };

    export const SignUp =
    (payload, callBack) =>
    async (dispatch) => {
      try {
        const data = await _SignUp(payload);
       
      //  console.log('data', data)
        callBack(data)
     } catch (error) {         
        callBack(data);
      }
    };

    export const ResetPassword =
    (payload, callBack) =>
    async (dispatch) => {
      try {
        const data = await _ResetPassword(payload);
       
      //  console.log('data', data)
        callBack(data)
     } catch (error) {         
        callBack(data);
      }
    };


    export const updateProfile =
    (payload, callBack) =>
    async (dispatch) => {
      try {
        const data = await _updateProfile(payload);
       
      //  console.log('data', data)
        callBack(data)
     } catch (error) {         
        callBack(data);
      }
    };


    
    export const updatePassword =
    (payload, callBack) =>
    async (dispatch) => {
      try {
        const data = await _updatePassword(payload);
       

        let user  = JSON.parse(sessionStorage.getItem("user"));

        if(user) {
            
          user.isPasswordVerifed = 1
          sessionStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: LOG_IN_SUCCESS,
            payload: user ,
          })
        }


        //  console.log('data', data)
        callBack(data)
     } catch (error) {
      
      console.log('error', error)
        // callBack('');
      }
    };
  
  export const signOUT = () => async (dispatch) => {
    const data = await signingOut();
    if (data.deletedCount && data.deletedCount === 1) {
      dispatch({
        type: LOG_OUT,
        payload: { isLoggedIn: false, user: {} },
      });
    }
  };
  