import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import './App.css'

class App extends Component {
    state = {
        searchValue: '',
        searchResults: []
    }

    _onSearchInput = async (event, value) => {
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

    _selectItem = value => {
        this.setState({
            searchValue: value,
            searchResults: []
        })
    }

    render() {
        const { searchValue, searchResults } = this.state

        return (
            <div className="App">
                <div className="App-header">
                    <Autocomplete
                        className="App-input"
                        value={searchValue}
                        items={searchResults}
                        onChange={this._onSearchInput}
                        onSelect={this._selectItem}
                        getItemValue={item => item.name}
                        wrapperStyle={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '80%'
                        }}
                        inputProps={{
                            className: 'App-input',
                            placeholder: 'Search for TV shows'
                        }}
                        renderMenu={children =>
                            <div className="App-autocomplete">
                                {children}
                            </div>}
                        renderItem={(item, isHighlighted) =>
                            <div
                                className={`App-autocomplete-item ${isHighlighted
                                    ? 'item-highlighted'
                                    : ''}`}
                                key={item.id}
                            >
                                {item.name}
                            </div>}
                    />
                </div>
            </div>
        )
    }
}

export default App
