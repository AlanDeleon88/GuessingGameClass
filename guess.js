class Guess{
    constructor(){
        this.min = Math.floor(Math.random() * (1000 - 0 + 1) + 0);//random number
        this.max = Math.floor(Math.random() * (1000 - this.min + 1) + this.min); //random number
        this.num = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);  // random range between min and max
        this.limit = Infinity // can be changed to finite number
        this.num_guess = 0 // will increment after each guess
    }
    change_min(rl, prompt){
        rl.question('Please set a minimum number \n', answer =>{
            let min_num = Number(answer)
            if(!isNaN(min_num)){
                this.min = min_num
                console.log(`minimum number set to ${answer} \n`);
                this.change_max(rl, prompt)
            }
            else{
                console.log('ERROR a number was not inputted\n')
                this.change_min(rl, prompt)
            }
        })

    }

    change_max(rl, prompt){
        rl.question('Please set a maximum number\n', answer =>{
            let max_num = Number(answer)
            if(!isNaN(max_num)){
                this.max = max_num
                console.log(`maximum number set to ${answer}\n`);
                let newNum = this.get_random_range(this.min, this.max)
                prompt.count--
                prompt.create_rounds(rl, true)

            }
            else{
                console.log('ERROR a number was not inputted\n')
                this.change_max(rl, prompt)

            }

        })
    }

    change_limit(rl, prompt){
        rl.question('Please set a maximum amount of guesses allowed \n', answer =>{
            let num = Number(answer)
            if(!isNaN(num) && (num > 0)){
                this.limit = num
                console.log(`Guess limit is now set to ${this.limit}\n`);
                prompt.guess_settings_prompt(rl, this, 'min-max')

            }
            else{
                console.log('Either a number was not inputted, or the value was below 0\n');
                this.change_limit(rl)
            }
        })
    }

    get_random_range(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        let num = Math.floor(Math.random() * (max - min + 1) + min);
        this.num = num
        return num
    }

    check(input){
        if(input === this.num){
            return true
        }
        else{
            this.num_guess++
            if(input < this.num) console.log('Guess Higher!')
            if(input > this.num) console.log('Guess Lower!')
            return false
        }
    }
}



module.exports = Guess;
