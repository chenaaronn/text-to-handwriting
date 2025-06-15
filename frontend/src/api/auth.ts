import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1'

interface LoginCredentials {
  username: string
  password: string
}

interface RegisterData {
  email: string
  username: string
  password: string
}

interface AuthResponse {
  access_token: string
  token_type: string
}

interface UserResponse {
  id: string
  email: string
  username: string
  is_active: boolean
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new FormData()
    formData.append('username', credentials.username)
    formData.append('password', credentials.password)

    const response = await axios.post<AuthResponse>(`${API_URL}/auth/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data
  },

  register: async (data: RegisterData): Promise<UserResponse> => {
    const response = await axios.post<UserResponse>(`${API_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  },

  getCurrentUser: async (token: string): Promise<UserResponse> => {
    const response = await axios.get<UserResponse>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
} 