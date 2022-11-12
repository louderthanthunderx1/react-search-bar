import { Component } from 'react'

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css'

class App extends Component {
  // Consturctor method
  constructor() {
    super() // call super()

    this.state = {
      monsters: [],
      searchField: '',
    }
    // console.log('constructor')
  }

  // Test API
  componentDidMount() {
    // console.log('componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respone) => respone.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users }
        })
      )
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase()

    this.setState(() => {
      return { searchField }
    })
  }
  render() {
    // console.log('render from app.js')

    const { monsters, searchField } = this.state
    const { onSearchChange } = this

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField)
    })

    return (
      <div className='App'>
        <h1 className='app-title'>Monster Katty</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder='search monsters'
          className='monster-search-box'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App
