import PropTypes from 'prop-types'
import NexaColours from './NexaColours'

export const ButtonStyleProps = PropTypes.shape(
  {
    name: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }
)

export default ButtonStyles = {
  Cancel: {
    name: "cancel",
    display: "Cancel",
    color: NexaColours.Grey
  },
  OK: {
    name: "ok",
    display: "OK",
    color: NexaColours.AlertGreen
  },
  No: {
    name: "no",
    display: "No",
    color: NexaColours.AlertRed
  },
  Yes: {
    name: "yes",
  display: "Yes",
  color: NexaColours.AlertGreen
},
  Back: {
    name: "back",
    display: "Back",
    color: NexaColours.CyanAccent
  },
  Comments: {
    name: "comments",
    display: "Comments...",
    color: NexaColours.Cyan
  },
  Confirm: {
    name: "confirm",
    display: "Confirm",
    color: NexaColours.AlertYellow
  },
  Sign: {
    name: "sign",
    display: "Sign",
    color: NexaColours.AlertOrange
},
  Approve: {
    name: "approve",
    display: "Approve",
    color: NexaColours.AlertRed
  },
  Components: {
    name: "components",
    display: "Components",
    color: NexaColours.Cyan
  }
}
