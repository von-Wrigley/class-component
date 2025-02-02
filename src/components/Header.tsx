import React from 'react';
import { Person } from '../App';

interface ChangeForm {
  (x: string): void;
}

export default class Header extends React.Component<{
  info: Person;
  changeLink: ChangeForm;
}>
 {
  constructor(props) {
    super(props);
    const cachedValue = localStorage.getItem('name');
    this.state = {
      nameValue: cachedValue ?? '',
      homeLink: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ nameValue: e.target.value });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = this.props.info.results?.find(
      (x) => x.name === this.state.nameValue);
    // console.log(q)
    if (q === undefined) {
      this.setState({ nameValue: '' });
      this.setState({ homeLink: '' });
    } else {
      const filtrName = Object.values(q)[0];
      localStorage.setItem('name', filtrName);
      this.setState({ nameValue: filtrName });
    }
  }
  onChangeLink() {
    this.setState({ homeLink: this.state.nameValue });
    this.props.changeLink(this.state.homeLink);
  }
  render() {
    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          onClick={this.onChangeLink.bind(this)}
        >
          <label>
            Name:
            <input
              required
              type="text"
              name="name"
              value={this.state.nameValue}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
      </>
    );
  }
}
