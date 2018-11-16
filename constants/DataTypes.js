import PropTypes from 'prop-types'

export const DeviationProps = {
  comment: PropTypes.string,
  severity: PropTypes.oneOf(['None','Minor','Major','Critical']),
  reference: PropTypes.string
}

export const PostDataProps = {
  batchID: PropTypes.Integer,
  procID: PropTypes.Integer,
  location: PropTypes.String,
  input: PropTypes.String,
  deviation: DeviationProps
}
