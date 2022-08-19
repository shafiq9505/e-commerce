import axios from 'axios'

// import { store } from '../redux'

type MethodProps = 'GET' | 'POST'

interface ApiProps {
  url: string
  token?: string
  type: MethodProps
  body?: any
  query?: string
}

const Api = async ({ url, token, type, body, query }: ApiProps) => {
//   store.dispatch(setLoading({ isLoading: true }))
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  // reserve for actual api calls will need token
  // axios.defaults.headers.common = { Authorization: `bearer ${token}` }
  try {
    if (type === 'POST') {
      const response = await axios({
        method: type,
        url: `${url}`,
        data: body
      })
    //   store.dispatch(setLoading({ isLoading: false }))
    } else if (type === 'GET') {
      const getUrl = query ? `${url}?${query}` : url
      const response = await axios.get(getUrl)
    //   store.dispatch(setLoading({ isLoading: false }))
      return response
    }
  } catch (error) {
    console.log('---error', error)
    // store.dispatch(setLoading({ isLoading: false }))
  }
}

export default Api
