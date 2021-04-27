import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './componant/button/Button.jsx'
import Cartes from "./componant/carte/Cartes";
import Start from './componant/Play/Start.jsx'
import func from './utils/utils'

const cardArray = [
  "KS", "QS", "JS", "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S",
  "KD", "QD", "JD", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D",
  "KH", "QH", "JH", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H",
  "KC", "QC", "JC", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C"];


let arrayLength = 0
let rndCarteTemp = "";
let rndNumTemp = 0;
class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      premierLance: "yes",
      endGame: false,
      nameOfWinner: ""
    }
  }

  //rndCarte pour avoir les 52 carte randomly //
  rndCarte() {
    arrayLength = + this.state.playerCardList.length;

    rndNumTemp = Math.floor(Math.random() * 53);

    if (rndNumTemp > 52) { rndNumTemp = rndNumTemp - 10 } else if (rndNumTemp < 1) { rndNumTemp = rndNumTemp + 10 }

    rndCarteTemp = cardArray[rndNumTemp - 1];

    return rndCarteTemp
  }

  onClickStop = () => {
    //stocker les valeur de rndCarte//
    const cardSelectedDealer = this.rndCarte()
    const cardSelectedDealer2 = this.rndCarte()

    //Dans une variable stocker la function et dedans  cardSelectedDealer
    const valueCarteDealer = func.transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = func.transformCardIntoInt(cardSelectedDealer2.split("")[0])
    // ici je stock les 2 variable dans un table
    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {
      const cardSelectedDealer = this.rndCarte()
      const valueCarteDealer = func.transformCardIntoInt(cardSelectedDealer.split("")[0])

      cardsDealer.push(cardSelectedDealer)

      dealerValue += valueCarteDealer

      if (dealerValue > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }

        break;
      }
    }
    if (dealerValue <= 21) {
      if (this.state.counterPlayer > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else if (this.state.counterPlayer < dealerValue) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }
      }
    }

    console.log("update state on stop");

    this.setState({
      counterDealer: dealerValue,
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame
    })
  }

  onClickGive = () => {
    const cardSelected = this.rndCarte()
    const valueCarte = func.transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte

    this.setState({
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
  }

  //   La methode startGame envoyé à enfant Start.jsx comme un props
  startGame = () => {
    const cardSelected = this.rndCarte()
    const cardSelected2 = this.rndCarte()

    const valueCarte = func.transformCardIntoInt(cardSelected.split("")[0])

    const valueCarte2 = func.transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2
    console.log(firstPlayerValue);


    const firstTwoCardsPlayer = [cardSelected, cardSelected2]

    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }

  render() {
    // Si start game
    if (this.state.startGame === false) {
      return (
        <Start startGame={this.startGame} />
      )
    } else {
      return (<div>

        <div className="playGame">
          <div style={{ height: '90vh', position: 'relative' }}>
            <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>
            {this.state.endGame && (<div className='winlost'>
              <Cartes key={"dealer"} cardList={this.state.dealerCardList} />
              <h1>Winner is {this.state.nameOfWinner}</h1>
            </div>)}

            <Cartes key={"player"} cardList={this.state.playerCardList} />
            <div style={{ bottom: '20px', position: 'absolute' }} className="row col-6 offset-3 flex d-flex justify-content-between">
              <div className="d-grid gap-2">
                <Button
                  onClick={this.onClickGive}
                  classe="btn btn-outline-warning btn-lg rounded-pill"
                  color="white"
                  bcolor="#0d6efd"
                  name="Give"
                />
              </div>
              <div>
              </div>
              <div className="d-grid gap-2">
                <Button
                  onClick={this.onClickStop}
                  classe="btn btn-outline-warning btn-lg rounded-pill"
                  color="white"
                  bcolor="#dc3545"
                  name="Stop"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}

export default Table;

