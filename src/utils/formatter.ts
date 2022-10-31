export const dateFormatter = new Intl.DateTimeFormat()

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})
