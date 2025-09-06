let scores=JSON.parse(localStorage.getItem('scores'))||{
            win:0,tie:0,lose:0
        }
        updateScoreElement();
        function playGame(playerMove)
        {
            const computerMove=pickComputerMove();
            let result='';
            if(playerMove==='Rock'){
                if (computerMove === 'Rock') {
                    result = 'Tie.';
                    } else if (computerMove === 'Paper') {
                    result = 'You lose.';
                    } else if (computerMove === 'Scissors') {
                    result = 'You win.';
                    }
            }
            
            else if(playerMove==='Paper'){

            if (computerMove === 'Rock') {
                result = 'You win.';
                } else if (computerMove === 'Paper') {
                result = 'Tie.';
                } else if (computerMove === 'Scissors') {
                result = 'You lose.';
                }
            }
            else{
            if (computerMove === 'Rock') {
                result = 'You lose.';
                } else if (computerMove === 'Paper') {
                result = 'You win.';
                } else if (computerMove === 'Scissors') {
                result = 'Tie.';
                }
            }
            if(result==='Tie.'){
                scores.tie+=1;
            }
            else if(result==='You win.'){
                scores.win+=1;
            }
            else{
                scores.lose+=1;
            }
            localStorage.setItem('scores',JSON.stringify(scores));
            updateScoreElement();
            document.querySelector('.js-result').innerHTML=result;
            document.querySelector('.js-move').innerHTML=`You
            <img class="move-icon" src='${playerMove.toLowerCase()}-emoji.png'>
            <img class="move-icon" src='${computerMove.toLowerCase()}-emoji.png'>
            Computer`;
        }
            
        
        function pickComputerMove()
        {
            const picked=Math.random();
            let computerMove='';
            if(picked>=0 && picked<1/3){
                computerMove='Rock';
            }
            else if(picked>=1/3 && picked<2/3){
                computerMove='Paper';
            }
            else{
                computerMove='Scissors';
            }
            return computerMove;
        }
        function updateScoreElement()
        {
            document.querySelector('.js-score').innerHTML=`Wins: ${scores.win}, Losses: ${scores.lose}, Ties: ${scores.tie}`;
        }