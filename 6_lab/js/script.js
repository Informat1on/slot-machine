let balance = 0; //наш баланс
//функция отображения баланса
function showBalance(balance){
    document.getElementById("balance_count").innerHTML = balance;

}

//Класс самой ставки
class Bet{
    constructor() {
        this.bet = 0; // ставка пользователя
    }

    //функция отображеения ставки пользователя
    showBet(){
        document.getElementById("bet_count").innerHTML = this.bet;
        console.log(this.bet);
        console.log(typeof this.bet);
    }

    //функция увеличения ставки
    increaseBet() {
        this.bet++;
        this.showBet();
        this.updateBet();
    }

    //функция уменьшения ставки
    decreaseBet() {
        if (this.bet === 0)
            return
        this.bet--;
        this.showBet();
        this.updateBet();
    }

    //функция обновляет переменную
    updateBet(){
        this.bet = Number(document.getElementById("bet_count").value);
        console.log(`bet is ${(this.bet)}`);
        console.log(typeof this.bet)
    }

    //функция очищает ставку
    clearBet(){
        this.bet = 0;
        this.showBet(0);
    }
}

// обьект с коэффициентами при выигрыше
const prizes = {
    '7_7_7': 10,
    'L_L_L': 2,
    'B_B_B': 0.8,
    'W_W_W': 0.5,
};