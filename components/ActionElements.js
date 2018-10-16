import React from 'react'
import TextBar from './TextBar'
import NexaColours from '../constants/NexaColours'

export function ActionTitle(props) {
  return (
    <TextBar backColor={NexaColours.Grey}>{props.title}</TextBar>
  )
}

export function ActionPrompt(props) {
  return (
    <TextBar backColor={NexaColours.AlertCyan}>{props.prompt}</TextBar>
  )
}
