import axios from 'axios'

export default axios.create({
    baseURL: 'https://auth-init.gallimap.com/api/v1'
})