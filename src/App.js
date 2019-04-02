import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import classNames from 'classnames'
import Weakness from './Weakness'

const characters = [
  {
    "faction": "Covenant",
    "name": "brute",
    "description": "the large strong, but dumb front line infantry",
    "largeIconImageUrl": "https://vignette.wikia.nocookie.net/halo/images/2/2b/H2A_Render_Jiralhanae.png/revision/latest?cb=20160403044401",
    'liked': false,
    'weaknesses': []
  },
  {
    "faction": "Flood",
    "name": "Carrier",
    "description": "small hurking mess of flood spores",
    "largeIconImageUrl": "https://content.halocdn.com/media/Default/encyclopedia/species/flood/flood-square-542x542-b00f3c2ba637426bbcae0cf35e0d3d69.jpg",
    'liked': false,
    'weaknesses': []
  },
  {
    "faction": "Flood",
    "name": "Spore",
    "description": "Small petty unit of flood forces, infects other beings",
    "largeIconImageUrl": "https://t1.rbxcdn.com/143901c60e9a8e3b4b3eabac09b41407",
    'liked': false,
    'weaknesses': []
  }
]

class App extends Component {
  constructor() {
    super()
    this.state = {
      characters: characters,
      value:'default'
    }
  }

  componentDidMount(){
    const instance = axios.create({
      baseURL: 'https://www.haloapi.com/metadata/h5/metadata',
      timeout: 1000,
      headers: {'Ocp-Apim-Subscription-Key': '4d804a05fbf241fcaeaa67db3d2806b5'}
    })
    instance.get('/enemies')
    .then(result => {
      console.log(result)
      const data = result.data.map(enemy => {
        enemy.weaknesses = []
        return enemy
      })
      this.setState({characters: this.state.characters.concat(data)})
    })
  }

  getCharactersI = (name) => {
    return this.state.characters.findIndex(character => character.name === name)
  }

  handleClick = (i, name) => {
    const { characters } = this.state
    let old_characters = characters.slice()

    let real_index = this.getCharactersI(name)

    let old_character = Object.assign({}, characters[real_index])
    old_character.liked = !old_character.liked
    old_characters[real_index] = old_character

    this.setState({characters: old_characters})
  }

  filter_character = (character) => {
    const cur_val = this.state.value
    if (cur_val === 'default' || cur_val === character.faction) {
      return true
    }
    return false
  }

  handleSubmit = (name, value) => {
    const new_characters = this.state.characters.map(character => {
      if (character.name !== name) {
        return character
      }
      let new_char = Object.assign({}, character)
      new_char.weaknesses = new_char.weaknesses.concat(value)
      return new_char
    })
    this.setState({characters: new_characters})
  }

  renderCharacters = () => {
    return this.state.characters.filter(character => this.filter_character(character)).map((character, i) => {
      const btn_text = character.liked ? 'Liked!' : 'Like'
      const btn_class = classNames({liked: character.liked})
      const pic_style = {'height': '190px'}
      return <div style={{'margin': '15px 15px 0 0'}} >
        <section>
          <img style={pic_style} src={character.largeIconImageUrl} alt='portrait of warrior'/>
        </section>
        <section>
          <div>
            <h5>Name: </h5><span>{character.name}</span>
          </div>
          <div>
            <h5>Faction: </h5><span>{character.faction}</span>
          </div>
          <div style={{maxWidth: '300px'}}>
            <h5>Description: </h5><span>{character.description}</span>
          </div>
          <Weakness weaknesses={character.weaknesses} onSubmit={this.handleSubmit} character={character}/>
          <div>
            <button className={btn_class} onClick={this.handleClick.bind(this, i, character.name)} >{btn_text}</button>
          </div>
        </section>
      </div>
    })
  }

  handleSelect = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <h2>Halo Characters</h2>
        <section>
          <label for='show_by'>Filter By</label>
          <select onChange={this.handleSelect} value={this.state.value} id='show_by'>
            <option value='default'>None Seleted</option>
            <option value='Covenant'>Covenant</option>
            <option value='Unsc'>UNSC</option>
            <option value='Promethean'>Promethean</option>
          </select>
        </section>

        <section style={{display: 'flex', flexWrap: 'wrap' ,justifyContent: 'center' }}>
          {this.renderCharacters()}
        </section>
      </div>
    );
  }
}

export default App;
