import React from "react";
export default class Card extends React.Component<{homeLink:Link}> {
    constructor(props) {
        super(props);
      }
      
  render() {
    return <p>{this.props.homeLink}</p>};
};