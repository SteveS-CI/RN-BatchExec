import React, {PureComponent} from 'react'

class Processes extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log('Processes: WillReceiveProps')
  }

  componentDidMount() {
    const nav = this.props.navigation
    const batchID = nav.getParam('batchID')
    const location = nav.getParam('location')
    console.log(batchID, location)
    nav.navigate('ActionDetail')
  }

  render() {
    return null
  }
}

export default Processes