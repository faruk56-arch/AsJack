

function transformCardIntoInt(cardValue) {
        if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "A" || cardValue === "0") {
        cardValue = "10"
        }
    
        return parseInt(cardValue)
    }

    export default transformCardIntoInt
    


