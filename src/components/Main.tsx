import React from 'react';
import { Link } from '../App';
import { Person } from '../App';
import '../styles/result.css';

export default class Results extends React.Component<{
  homeLink: Link;
  allData: Person;
}> {
  constructor(props: { homeLink: Link; allData: Person }) {
    const { allData } = props;
    super(props)
    this.state = {
      info: allData,
    };
  }

  render() {
    const result = {
      marginTop: '1.5rem',
    };
    const detailedInfo = {
      display: 'flex',
      marginTop: '0.5rem',
      border: '1px solid black',
      justifyContent: 'space-between',
    };
    return (
      <div style={result}>
        {this.props.homeLink === ''
          ? (this.props.allData?.results?.map((x, index) => (
              <div style={detailedInfo} key={index}>
                <div>
                  <p>
                    <strong>Name:</strong>
                    {x.name}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Date of Birth:</strong> {x.birth_year}
                  </p>
                  <p>
                    <strong>Height:</strong> {x.height}
                  </p>
                </div>
              </div>)
            ))
          : this.props.allData?.results
              ?.filter((x) => x.name === this.props.homeLink)
              .map((x, index) => (
                <div style={detailedInfo} key={index}>
                  <div>
                    <p>
                      <strong>Name:</strong> {x.name}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Date of Birth:</strong> {x.birth_year}
                    </p>
                    <p>
                      <strong>Height:</strong> {x.height}
                    </p>
                  </div>
                </div>)
              )}
      </div>
    );
  }
}
