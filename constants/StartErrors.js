import i18n from 'i18n-js';

function GetBatchStartErrors(value) {
  if (value === 0) return '';
  let ctr = 0;
  let errors = '';
  for (ctr; ctr < 9; ctr += 1) {
    // eslint-disable-next-line no-bitwise
    if ((2 ** ctr) & value) {
      const err = i18n.t(`startErrors.${ctr}`);
      console.log(err);
      errors = errors.concat(err, '\n');
    }
  }
  return errors.trim();
}

export default GetBatchStartErrors;
