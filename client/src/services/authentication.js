
import { getAxiosInstance } from "./axiosCall"


export const _SignUp = async (payload) => {

  let axiosInstance = await getAxiosInstance();
  const result = await axiosInstance.post('Signup', payload)
  return result.data
  };

  export const _updateProfile = async (payload) => {

    let axiosInstance = await getAxiosInstance();
    const result = await axiosInstance.post('updateProfile', payload)
    return result.data
    };


    export const _updatePassword = async (payload) => {

      let axiosInstance = await getAxiosInstance();
      const result = await axiosInstance.post('updatePassword', payload)
      return result.data
      };

      
    export const _ResetPassword = async (payload) => {

      let axiosInstance = await getAxiosInstance();
      const result = await axiosInstance.post('ResetPassword', payload)
      return result.data
      };

  
export const Login = async (payload) => {
  let axiosInstance = await getAxiosInstance();
  const result = await axiosInstance.post('SignIn', payload)
  return result.data
  };


  export const getAllTechnician = async (payload) => {
    let axiosInstance = await getAxiosInstance();
    const result = await axiosInstance.post('getAllTechnician', payload)
    return result.data
    };
    export const getAllManager = async (payload) => {
      let axiosInstance = await getAxiosInstance();
      const result = await axiosInstance.post('getAllManagers', payload)
      return result.data
      };

  export const ForgotPassword = async () => {
    let axiosInstance = await getAxiosInstance();
    const result = await axiosInstance.post(payload)
    return result.data
  };