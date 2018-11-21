import PropTypes from 'prop-types'

export const DeviationProps = {
  comment: PropTypes.string,
  severity: PropTypes.oneOf(['None','Minor','Major','Critical']),
  reference: PropTypes.string
}

export const ValidationProps = {
  upper: PropTypes.String,
  lower: PropTypes.String,
  increment: PropTypes.String,
  minLength: PropTypes.String,
  maxLength: PropTypes.String,
  choices: PropTypes.String,
  regExp: PropTypes.String
}

export const ListHeaderProps = {
  caption: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired
}

export const DataProps = {
  PostDataProps: {
    batchID: PropTypes.Integer,
    procID: PropTypes.Integer,
    location: PropTypes.String,
    input: PropTypes.String,
    deviation: DeviationProps
  },
  EntryProps: {
    name: PropTypes.String,
    index: PropTypes.Integer,
    label: PropTypes.String,
    suffix: PropTypes.String,
    entryType: PropTypes.String,
    entryTypeEnum: PropTypes.Integer,
    validation: ValidationProps,
    value: PropTypes.String
  },
}
