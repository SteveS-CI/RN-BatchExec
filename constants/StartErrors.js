import i18n from 'i18n-js'

export function GetBatchStartErrors(value) {
  if (value==0) return ""
  var ctr = 0
  var errors = ""
  for (ctr; ctr < 9; ctr++) {
    if ((2**ctr) & value) {
      const err = i18n.t('startErrors.' + ctr)
      console.log(err)
      errors = errors.concat(err, "\n")
    }
  } 
  return errors.trim()
}