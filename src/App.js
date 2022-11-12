import { Component } from 'react'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  // Consturctor method
  constructor() {
    super() // call super()

    this.state = {
      monsters: [],
      searchField: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(( respone ) => respone.json())
      .then(( users ) =>
        this.setState(
          () => {
            return { monsters: users }
          },
          () => {
            console.log(this.state.monsters)
          }
        )
      )
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField }
    });

  }
  render() {
    console.log('render')

    const {monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField)
    })

    return (
      <div className='App'>
        <input
          className='search-box'
          type='search'
          placeholder='search monsters'
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monsters) => {
          return (
            <div key={monsters.id}>
              <h1>{monsters.name}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

export default App
