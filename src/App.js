import React,{useEffect} from "react";
import "./styles.css";

import { connect } from 'react-redux'

import GameBoy from "./components/GameBoy";
import PokeList from "./components/PokeList";


import {CLICK,showPokemonAction,catchPokemonAction} from './store/action'
import fetchPokemon from "./store/fetchPokemons";
import Loader from "./components/Loader";



const App = ({fetchPokemon,handleClick,pending,catchPokemon,showPokemon,pokemons}) => {
  useEffect(()=>{
    fetchPokemon()
  },[fetchPokemon])

  useEffect(()=>{
    console.log(pokemons)
  },[pokemons])


  if(pending){
    return <Loader></Loader>
  }
  else{
    return (
      <div className="App">
        <GameBoy handleClick={()=>handleClick()} showPokemon={()=>showPokemon(pokemons)} 
        catchPokemon={catchPokemon}/>
        <PokeList />
      </div>
    );
  }
};

const mapStateToProps = ({pokemons,pending})=>{
  return {
    pending,
    pokemons
  }
}

const mapDispatchToProps= dispatch => {
  return {
    fetchPokemon: () => dispatch(fetchPokemon()),
    handleClick: () => dispatch({type:CLICK}),
    showPokemon: pokemons=>dispatch(showPokemonAction(pokemons)),
    catchPokemon: ()=>dispatch(catchPokemonAction())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
