import React from 'react'
import Cartes from './carte/Cartes'
import Button from './button/Button'



class game extends React.Component {
    render() {
        console.log('props game', this.props)
        return (

            <div>

                <div className="playGame">
                    <div style={{ height: '90vh', position: 'relative' }}>
                        <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>
                        {this.props.endGame && (<div className='winlost'>
                            <Cartes key={"dealer"} cardList={this.props.dealerCardList} />
                            <h1>Winner is {this.props.nameOfWinner}</h1>
                        </div>)}
                        <Cartes key={"player"} cardList={this.props.playerCardList} />

                        <div style={{ bottom: '20px', position: 'absolute' }} className="row col-6 offset-3 flex d-flex justify-content-between">

                            <div className="d-grid gap-2">
                                <Button

                                    onClick={this.props.onClickGive}
                                    classe="btn btn-outline-warning btn-lg rounded-pill"
                                    color="white"
                                    bcolor="#0d6efd"
                                    name="Give"

                                />

                            </div>

                            <div className="d-grid gap-2">
                                <Button
                                    onClick={this.props.onClickStop}
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
export default game