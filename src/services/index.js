export const getDateFromString = str => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const d = new Date(str)
    return new Date(d - tzoffset).toISOString().split('T')[0]
  }