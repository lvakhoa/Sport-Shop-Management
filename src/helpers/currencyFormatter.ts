export const currencyFormatter = (value: number | bigint) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(value)
    .replaceAll('.', ',')
