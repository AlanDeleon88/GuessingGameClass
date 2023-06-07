/*
! Guessing Game plan out!
! try to make an approach using classes and methods maybe?
    *design class properties and methods.
! run a main function to start the game and build the new game obj with input
! make up a method / function to streamline crazy javascript info

class GuessingGame
    constructor() no need to take in values for constructor, will have init method to fill out properties
    current_num = {
        min: 0
        num: 0
        max: 0
    }
    guess_limit = Infinity
    guess_count = 0

    methods
    init_game():
        - open readline? might have create a global read line? or pass in readline through each method call perhaps
        - set up game variables like the current number
        - prompt user with an options menu:
            1. start game --> start the game with current settings --> start_game() --> will prompt to fill out the number range to start the game, then the game loop will start
            2. change settings --> will prompt a settings menu --> settings() -->prompt another message to enable guess_limit
            3. exit game --> will run end game method
        - depending on the user input different methods will be called

    start_game():
    start with prompt to set number range (maybe later I can make it so random numbers are an option) maybe create a set_numbers() method
    prompt will be:


    set_min():
    - prompt min number input
            -   "Please set a range of numbers to guess from.
            Please enter a min number.
            type in "exit" to leave game
            - this cb will set current_num.min pojo, only if number is greater  than 0
            - if not greater than 0, --> display an error message and recall callback for asking for min number
            - if it is, set current_num.min to the inputted number then call method to grab max number

    set_max():
    - prompt max number input
    - check number if its, set to current_num.max pojo, if not re call the prompt.

    guess(): --> i guess this is the main loop?
    prompt to guess number
    -check if input is a number -> if lower respond with higher, when guess is higher respond with lower --> increment guess_count --> check guess_count to guess limit -> call guess again OR end game
    - if guess matches current num respond with menu of play again or exit.

    end_game():
    - print 'Thanks for playing' then close rl

*/

//! refactor guess to be separate class? maybe hold an array of guesses to have multiple rounds in guessing game class?

//TODO implement settings to limit number of guesses.

const readline = require('readline');

class GuessingGame{
    constructor(){
        this.current_guess = {
            min:0,
            num: 0,
            max:0,

        }
        this.guess_limit = Infinity;
        this.num_guess = 0;
    }

    init_game(){
        const rl = readline.createInterface({
            input:process.stdin,
            output: process.stdout
        });

        rl.question(
        `Welcome to the guessing game!\n
        Please select an option:\n
        1. Start game\n
        2. Change settings\n
        3. Exit game \n
        `, answer =>
        {
            switch(answer){
                case '1':
                    this.set_min(rl)
                    break;
                case '2':
                    return console.log('you selected two')
                case '3':
                    console.log('Ok, See ya next time!')
                    rl.close()
                    break;
                default:
                    console.log('Looks like we have an invalid input, please try again.');
                    this.init_game()

            }
        })


    }

    set_min(rl){
        rl.question('Please set a minimum number \n', answer =>{
            let min_num = Number(answer)
            if(!isNaN(min_num)){
                this.current_guess.min = answer
                console.log(`minimum number set to ${answer} \n`);
                this.set_max(rl)

            }
            else{
                console.log('ERROR a number was not inputted')
                this.set_min(rl)
            }
        })
    }

    set_max(rl){
        rl.question('Please set a maximum number \n', answer =>{
            if(!isNaN(answer) && this.current_guess.min < answer){
                this.current_guess.max = answer
                console.log(`The game will start! Try and guess the number between ${this.current_guess.min} and ${this.current_guess.max} \n`)
                //! run a randomizer to get a number between min and max, then set it to the current_guess num

                this.current_guess.num = this.get_random_range(this.current_guess.min, this.current_guess.max)
                // console.log(`TEST ANSWER IS`, this.current_guess.num);
                this.guess(rl);
            }
            else{
                console.log(`ERROR either the inputted field was not a number OR it was a number less than ${this.current_guess.min}`);
                this.set_max(rl)
            }
        })


    }

    get_random_range(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    guess(rl){
        rl.question(`Please try to guess the number between ${this.current_guess.min} and ${this.current_guess.max} \n`, answer =>{
            let guess = Number(answer)
            if(isNaN(guess) || (guess < this.current_guess.min) || (guess > this.current_guess.max)){
                console.log(`Invalid input, please enter a number between ${this.current_guess.min} and ${this.current_guess.max}`)
                this.guess(rl)
            }
            else if(guess < this.current_guess.num){
                console.log(`Higher`);
                this.num_guess++
                this.guess(rl)
            }
            else if(guess > this.current_guess.num){
                console.log('Lower!');
                this.num_guess++
                this.guess(rl)
            }
            else if(guess === this.current_guess.num){
                console.log(`Congratulation!!!! you guessed the number ${this.current_guess.num} \n`);
                this.end_game(rl)
            }
        })
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
