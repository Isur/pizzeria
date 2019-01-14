import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react';


export default class RespondModal extends Component {
    constructor(props) {
      super(props)

      this.state = {

      }
    }



  render() {
    return (
      <div>
        <Modal open={this.props.open}
               header={this.props.header}
               content={this.props.message}
               size="mini"
               actions={[{ key: 'done', content: 'Done', positive: true, onClick: this.props.close }]} />
      </div>
    )
  }
}
