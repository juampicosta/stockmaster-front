export const getOrderStateColor = (estado) => {
  switch (estado) {
    case 'Pendiente':
      return 'bg-yellow-200 text-yellow-800'
    case 'Finalizada':
      return 'bg-green-200 text-green-800'
    case 'Cancelada':
      return 'bg-red-200 text-red-800'
    default:
      return 'bg-sky-200 text-sky-800'
  }
}
