const readline = require('readline');
const Guess = require('./guess.js')

class GuessingGame{
    constructor(){
        this.rounds = []
        this.score = 0;
        this.count = 0;
        this.currentRound = 0;
    }

    init_game(){
        const rl = readline.createInterface({
            input:process.stdin,
            output: process.stdout
        });
        this.rounds = [];
        this.score = 0;
        this.count = 0;
        this.currentRound = 0;

        rl.question(
        `Welcome to the guessing game!\n
        Please select an option:\n
        1. Start game\n
        3. Exit game \n
        `, answer =>
        {
            switch(answer){
                case '1':
                    this.create_rounds(rl)
                    break;
                case '2':
                    console.log('Ok, See ya next time!')
                    rl.close()
                    break;
                default:
                    console.log('Looks like we have an invalid input, please try again.');
                    this.init_game()

            }
        })


    }

    create_rounds(rl, skip){
        if(!skip){

            rl.question('How many rounds would you like to play?\n', answer =>{
                let num = Number(answer)
                // rl.close()
                    this.count = answer

                if(!isNaN(num)){
                        let guess = new Guess()
                        // rounds = answer
                        this.guess_settings_prompt(rl, guess, 'limit')
                }
                else{
                    console.log('An invalid input or a value less than 0 was received, please input a number greater than 0');
                    this.create_rounds()
                }
            })
        }
        else{
            if(this.count > 0){
                let guess = new Guess()
                this.guess_settings_prompt(rl, guess, 'limit')
            }
            else{
                // console.log('START GAME');
                this.guess(rl)
                // console.log(this.rounds);
            }
        }


    }

    guess_settings_prompt(rl, guess, setting){
        let prompt = setting === 'limit' ? 'Would you like to set a guess limit for this round?\n' : 'Would you like to use random numbers for this round?\n'
        rl.question( `${prompt}\n
        1. Yes \n
        2. No \n

        `,
        answer =>{
            let num = Number(answer)

            if(!isNaN(num)){

                if(setting === 'limit'){
                    switch(num){
                        case 1:
                             guess.change_limit(rl, this)
                            break;
                        case 2:
                            this.guess_settings_prompt(rl, guess, 'min-max')
                            break
                        default:
                            console.log('Number not in range, please input a number from the list');
                            break;
                    }
                }
                else if(setting === 'min-max'){
                    switch(num){
                        case 1:
                            console.log('This round will use a random minimum and maximum');
                            this.rounds.push(guess)
                            this.count--
                            this.create_rounds(rl, true)
                            break;
                        case 2:
                            guess.change_min(rl,this)
                            this.rounds.push(guess)
                            // console.log('i made it out!', this);
                            break;
                        default:
                            console.log('Number not in range, please input a number from the list');
                            break;
                    }
                }

            }
            else{
                console.log('Invalid input, please enter a number from the list.');
                setting === 'limit' ? this.guess_settings_prompt(rl, guess, 'limit') : this.guess_settings_prompt(rl, guess, 'min-max')
            }
        })

    }

    guess(rl){
        if(this.currentRound <= this.rounds.length - 1){

            let currentGuess = this.rounds[this.currentRound]
            if(currentGuess.num_guess < currentGuess.limit){
                console.log(`${currentGuess.num_guess} guesses out of ${currentGuess.limit}`);
                console.log(`your current score: ${this.score}`);
                rl.question(`Guess a number between ${currentGuess.min} and ${currentGuess.max} \n`,
                    answer =>{
                        let num = Number(answer)
                        if(isNaN(num)){
                            console.log("Please insert a valid integer!\n");
                            this.guess(rl)
                        }

                        if(currentGuess.check(num)){
                            console.log(`Congrats! you Guessed it right! The number was ${currentGuess.num}\n`);
                            this.score++
                            this.currentRound++
                            this.guess(rl)
                        }
                        else{
                            this.guess(rl)
                        }
                    }
                )
            }
            else{
                console.log(`Sorry you reached your guess limit of ${currentGuess.limit} \n`);
                this.currentRound++
                this.guess(rl)
            }
        }
        else{
            // print their score out of this.rounds.length
            // run end_game(rl)
            console.log(`The game has ended, you scored ${this.score} out of ${this.rounds.length}`);
            this.end_game(rl)
        }
    }


    end_game(rl){
        //TODO have logic to either end the game or restart the game.
        rl.question(
            `Would you like to play again?\n
            1. Yes \n
            2. No \n
        `,
        answer =>{

            switch(answer){
                case('1'):
                    rl.close()
                    this.init_game()
                    break;
                case('2'):
                    console.log('Thanks for playing! See you again!');
                    rl.close();
                    break;

            }
        })
    }
}

let game = new GuessingGame()
game.init_game()
