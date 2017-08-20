import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
    state = {
        searchValue: '',
        searchResults: []
    }

    _onSearchInput = async event => {
        const value = event.target.value
        let results = []

        if (value) {
            const response = await fetch(`http://localhost:3000?q=${value}`)
            const data = await response.json()
            results = data.hits.hits.map(hit => hit._source)
        }

        this.setState({
            searchValue: value,
            searchResults: results
        })
    }

    render() {
        const { searchValue, searchResults } = this.state

        return (
            <div className="App">
                <div className="App-header">
                    <input
                        className="App-input"
                        type="text"
                        placeholder="Search for TV shows"
                        value={searchValue}
                        onChange={this._onSearchInput}
                        autoFocus
                    />
                </div>

                <div>
                    {searchResults.map(result =>
                        <div key={result.id}>
                            {result.name}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App
