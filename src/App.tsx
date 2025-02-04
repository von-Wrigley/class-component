import React from "react";
import Header from './components/Header';
import './App.css';
import Main from './components/Main';
import Spinner from './components/Spinner'

export interface Person {
  count: number;
  next: string;
  previous: string;
  results: DeatilesPerson[];
}
interface DeatilesPerson {
  birth_year?: string;
  created?: string;
  edited?: string;
  eye_color?: string;
  films?: string[];
  gender?: string;
  hair_color?: string;
  height?: string;
  homeworld?: string;
  mass?: string;
  name?: string;
  skin_color?: string;
  species?: string[];
  starships?: string[];
  url?: string;
  vehicles?: string[];
}
export type Link = string | '';

export default class App extends React.Component<
   Record<string, unknown>,
  { data: Person; homeLink: Link; loading: boolean }
> {
  constructor(props: {data: Person; homeLink: Link; loading: boolean } ) {
    super(props);
    this.state = {
      data: {} as Person,
      homeLink: '',
      loading: false,
    };


  }
  componentDidMount() {
    this.fetchDataStarsWars();
  }
  fetchDataStarsWars = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      // const nwData = data.results
      this.setState({ loading: false });
      this.setState({ data: data });
      // console.log(data);
    } catch (error) {
      this.setState({ loading: false });
      console.error('Error:', error);
    }
  };

  onChangeLinkName(newName: Link) {
    this.setState({ homeLink: newName });
  }
  render() {
    return (
      <>
        <Header
          info={this.state.data}
          changeLink={this.onChangeLinkName.bind(this)}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Main homeLink={this.state.homeLink} allData={this.state.data} />
        )}
      </>
    );
  }
}
