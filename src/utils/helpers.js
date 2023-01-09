import axios from 'axios'
import Swal from 'sweetalert2'

// axios
const baseURL = "https://calm-cliffs-38682.herokuapp.com/"

export const apiHelper = axios.create({
  baseURL
});

// sweetalert2 Toast
export const Toast = Swal.mixin({
  customClass: 'customClass',
  width: '394px',
  padding: '20px',
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
})