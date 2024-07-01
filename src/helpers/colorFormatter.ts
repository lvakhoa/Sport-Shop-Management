export const colorFormatter = (colorName: string) => {
  switch (colorName.toLowerCase()) {
    case 'red':
      return '#E72929'

    case 'blue':
      return '#0079FF'

    case 'green':
      return '#81A263'

    case 'black':
      return '#31363F'

    case 'white':
      return '#F9F9F9'

    case 'yellow':
      return '#FFDB5C'

    case 'cyan':
      return '#6FDCE3'

    case 'magenta':
      return '#9E2F50'

    case 'grey':
      return '#EEEEEE'

    case 'pink':
      return '#FFD0D0'

    case 'beige':
      return '#F6DCAC'

    case 'brown':
      return '#A67B5B'

    default:
      return 'transparent'
  }
}
