/*
! Guessing Game plan out!
! try to make an approach using classes and methods maybe?
    *design class properties and methods.
! run a main function to start the game and build the new game obj with input
! make up a method / function to streamline crazy javascript info

class GuessingGame
    constructor() no need to take in values for constructor, will have init method to fill out properties
    guesses = []
    score = 0

    methods
    init_game():
        - open readline? might have create a global read line? or pass in readline through each method call perhaps
        - set up game variables like the current number
        - prompt user with an options menu:
            1. start game --> start the game with current settings --> start_game() --> will prompt to fill out the number range to start the game, then the game loop will start
            3. exit game --> will run end game method
        - depending on the user input different methods will be called


    guess(): --> i guess this is the main loop?
    prompt to guess number
    -check if input is a number -> if lower respond with higher, when guess is higher respond with lower --> increment guess_count --> check guess_count to guess limit -> call guess again OR end game
    - if guess matches current num respond with menu of play again or exit.

    end_game():
    - print there score out of length of guess array.
    - give option to continue playing or not

*/

//! refactor guess to be separate class? maybe hold an array of guesses to have multiple rounds in guessing game class?
//! give GuessingGame class a guess array to hold how many guesses the game will be.
//! add new property of points, add point when a user guesses a number.
//! create new method for GuessingGame to add a new object of Guess to guess array. IE decide number of rounds.

//! GuessingGame.init_game() ---> GuessingGame.createRounds() --> GuessingGame.guess() <--- Main game loop

/*
    * GuessingGame.createRounds(rl)
?    - Ask user how many rounds --> check valid input
?    - For loop for how many rounds was inputted
?    - variable to instatiate new Guess Object
?       - Ask for random number or no?
?           - yes? -> ask for guess limit -> yes? -> call change_guess_limit -> push to guess array
!                                            no? leave default values and push to guess array
?
?           - no ? -> call guess change_min_max --> ask guess limit --> yes? call change_guess_limit -> push to guess array
!                                                                       no? leave default values then push to guess array

    *GuessingGame.start(rl)
?   iterate through the GuessingGame.guess array and play game for each round.
?   Each iteration while loop while i < guess.length
?   check Guess.limit() true if limit reached -> increment i
!                       false -> run next lines
?   -GuesingGame.guess() -> if return true, -> increment i, increment GuessingGame.score
!                                     false -> no-op let loop continue
?   After loop finishes running run GuessingGame.end_game(rl)
?
*   GuessingGame.guess(rl, guess)
?   - rl.question -> prompt to guess number between Guess.min and Guess.max -> validate input -> valid?
*                                                                                                 yes? -> run Guess.check() -> return its boolean
!                                                                                                 no? -> prompt invalid input then call GuessingGame.guess(rl, guess)
*/

//TODO implement settings to limit number of guesses.

/*
    Guess class
    properties:
    constructor(min, max, guess_limit) ? can we do default values with constructors should be able to.
    min : init as random number
    max : random number thats at least 10+ larger than min number
    num : random int between min and max number
    guess_limit: number of guesses allowed init at infinity.
    limit : false
    num_guess: number of guesses init at 0

    methods:

    change_min_max(rl) -> change min on user input
        - rl.question -> check valid input for min ->  set min value  -> check valid input for max - set max value -> return / break

    change_guess limit(rl) -> change guess_limit
        - rl.question -> check valid input for limit -> set valid input -> return / break

    check_guess(guess) -> check user input to guess and some logic to continue guessing or not.

    ? check guess to num
        ? matches? -> yes? -> return true
        !             no? -> increment num_guess -> check limit -> if limit switch limit to true and return false




*/
