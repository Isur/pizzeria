import React from 'react';
import { Visibility } from 'semantic-ui-react';

export default function responsive(Inner) {
    return class Responsive extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                width: undefined,
                height: undefined,
            };
            this.onUpdate = this.onUpdate.bind(this);
        }
        
        onUpdate(e, { calculations }) {
            this.setState({
                width: calculations.width,
                height: calculations.height,
            })
        }

        render(){
            const  {width, height } = this.state;
            return(
                <Visibility onUpdate={this.onUpdate} fireOnMount>
                    <Inner width={width} height={height} {...this.props}/>
                </Visibility>
            )
        }
    }
}