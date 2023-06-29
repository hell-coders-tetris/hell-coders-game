import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import { mainAxios } from '../../http-common'
import { BASE_URL, CUSTOM_BASE_URL } from '../../shared/consts'
import { ChangePasswordRequest, CreateLocalUserRequest, User, UserUpdateRequest } from './types'

export const getAuthUser = createAsyncThunk<
  AxiosResponse<User>,
  void,
  { rejectValue: AxiosError['response'] }
>('user/getAuthUser', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await mainAxios.get(`${BASE_URL}/auth/user`, {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json'
      }
    })
    console.log(response)
    if (response) {
      dispatch(createLocalUser({
        'first_name': response.data.first_name,
        'second_name': response.data.second_name,
        'password': '', // что сюдат вставлять и зачем нужен?????
        'phone': response.data.phone,
        'login': response.data.login,
        'email': response.data.email
      }))
    }
    return response
  } catch (error) {
    return rejectWithValue((error as AxiosError)?.response)
  }
})


export const putUser = createAsyncThunk<
  AxiosResponse<User>,
  UserUpdateRequest,
  { rejectValue: AxiosError['response'] }
>('user/putUser', async (data, { rejectWithValue }) => {
  try {
    const response = await mainAxios.put(
      `${BASE_URL}/user/profile`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    return rejectWithValue((error as AxiosError)?.response)
  }
})

export const putAvatar = createAsyncThunk<
  AxiosResponse<User>,
  FormData,
  { rejectValue: AxiosError['response'] }
>('user/putAvatar', async (data, { rejectWithValue }) => {
  try {
    const response = await mainAxios.put(
      `${BASE_URL}/user/profile/avatar`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    return rejectWithValue((error as AxiosError)?.response)
  }
})

export const putPassword = createAsyncThunk<
  AxiosResponse,
  ChangePasswordRequest,
  { rejectValue: AxiosError['response'] }
>('user/putPassword', async (data, { rejectWithValue }) => {
  try {
    const response = await mainAxios.put(
      `${BASE_URL}/user/password`,
      data,
      {
        withCredentials: true,
        headers: {
          'Content-type': 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    // @ts-ignore
    if (error.response?.data?.reason === 'Password is incorrect') {
      alert('Введен неверный пароль')
    }
    return rejectWithValue((error as AxiosError)?.response)
  }
})

export const createLocalUser = createAsyncThunk<
  AxiosResponse,
  CreateLocalUserRequest,
  { rejectValue: AxiosError['response'] }
>('user/create', async (data, { rejectWithValue, dispatch }) => {
  console.log('action')
  try {
    const response = await mainAxios.post(
      `${CUSTOM_BASE_URL}/user/create`,
      data
    )
    return response
  } catch (error) {
    return rejectWithValue((error as AxiosError)?.response)
  }
})
