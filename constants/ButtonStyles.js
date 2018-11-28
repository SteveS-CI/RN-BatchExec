import PropTypes from 'prop-types'
import NexaColours from './NexaColours'

export const ButtonStyleProps = PropTypes.shape(
  {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }
)

export default ButtonStyles = {
  Cancel: {
    name: "cancel",
    color: NexaColours.GreyLight
  },
  OK: {
    name: "ok",
    color: NexaColours.AlertGreen
  },
  No: {
    name: "no",
    color: NexaColours.AlertRed
  },
  Yes: {
    name: "yes",
    color: NexaColours.AlertGreen
  },
  Previous: {
    name: "previous",
    color: NexaColours.CyanAccent
  },
  Comments: {
    name: "comments",
    color: NexaColours.Cyan
  },
  Confirm: {
    name: "confirm",
    color: NexaColours.AlertYellow
  },
  Sign: {
    name: "sign",
    color: NexaColours.AlertOrange
},
  Approve: {
    name: "approve",
    color: NexaColours.AlertRed
  },
  Components: {
    name: "components",
    color: NexaColours.Cyan
  }
}
