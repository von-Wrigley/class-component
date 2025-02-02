import React from "react";


export default class CardList extends React.Component<{allData:Person, allDataNames:Person}> {
  constructor(props) {
    const {allData} = props;
    super(props)
    this.state = {
      allDataNames: allData
    };}

  render(){
    
    return(
      <div>
    {this.props.allDataNames?.results?.map((x, index)=>(
          <div key={index}>
           <p>{x.name}</p>
          </div>
        ))}
   
    
      </div>
    ) }
  }
  
  