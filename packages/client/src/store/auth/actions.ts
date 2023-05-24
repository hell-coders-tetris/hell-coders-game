import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { BASE_URL } from '../../shared/consts'
import { SignInRequest, SignUpRequest } from './types'

export const postRegister = createAsyncThunk<
  AxiosResponse,
  SignUpRequest,
  { rejectValue: AxiosError['response'] }
>('auth/postRegister', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, data)
    return response
  } catch (error) {
    return rejectWithValue((error as AxiosError)?.response)
  }
})

export const postAuth = createAsyncThunk<
  AxiosResponse,
  SignInRequest,
  { rejectValue: AxiosError['response'] }
>('auth/postAuth', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signin`, data, {
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    })
    console.log(response);
    return response
  } catch (error) {
    return rejectWithValue((error as AxiosError)?.response)
  }
})
