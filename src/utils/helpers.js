import Swal from 'sweetalert2'

export const Toast = Swal.mixin({
  customClass: 'customClass',
  width: '394px',
  padding: '20px',
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
})