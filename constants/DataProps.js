import PropTypes from 'prop-types'

export default DataProps = {
  DeviationProps: {
    comment: PropTypes.string,
    severity: PropTypes.oneOf(['None','Minor','Major','Critical']),
    reference: PropTypes.string
  },
  PostDataProps: {
    batchID: PropTypes.Integer,
    procID: PropTypes.Integer,
    location: PropTypes.String,
    input: PropTypes.String,
    deviation: DeviationProps
  },
  ValidationProps: {
    upper: PropTypes.String,
    lower: PropTypes.String,
    increment: PropTypes.String,
    minLength: PropTypes.String,
    maxLength: PropTypes.String,
    choices: PropTypes.String,
    regExp: PropTypes.String
  },
  EntryProps: {
    name: PropTypes.String,
    index: PropTypes.Integer,
    label: PropTypes.String,
    suffix: PropTypes.String,
    entryType: PropTypes.String,
    entryTypeEnum: PropType.Integer,
    validation: ValidationProps,
    value: PropTypes.String
  },
}


