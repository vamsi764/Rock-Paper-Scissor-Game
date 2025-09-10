let scores=JSON.parse(localStorage.getItem('scores'))||{
            win:0,tie:0,lose:0
        }
        updateScoreElement();
        let isautoplay = false;
        let intervId;
        document.querySelector('.js-reset-score').addEventListener(
            'click',()=>
            {
               resetScore();
            }
        );
        document.querySelector('.js-auto-play').addEventListener(
            'click',()=>
            {
                isautoplay=autoPlay(isautoplay);
                
            }
        );
        document.querySelector('body').
        addEventListener('keydown',(event)=>
        {
            if(event.key==='r'||event.key==='R')
            {
                playGame('Rock');
            }
            else if(event.key==='p' || event.key==='P')
            {
                playGame('Paper');
            }
            else if(event.key==='s' || event.key==='S')
            {
                playGame('Scissors');
            }
            else if(event.key==='Backspace')
            {
                resetScore();
            }
            else if(event.key===" ")
            {
                isautoplay=autoPlay(isautoplay);
            }
        });
        document.querySelector('.js-rock-button').addEventListener(
            'click',()=>
            {
                playGame('Rock');
            }
        );
        document.querySelector('.js-paper-button').addEventListener(
            'click',()=>
            {
                playGame('Paper');
            }
        );
        document.querySelector('.js-scissors-button').addEventListener(
            'click',()=>
            {
                playGame('Scissors');
            }
        );
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
        function resetScore()
        {
             scores.win=0;
            scores.lose=0;
            scores.tie=0;
            localStorage.removeItem('scores');
            updateScoreElement(); 
            document.querySelector('.js-result').innerHTML='';
            document.querySelector('.js-move').innerHTML='';
        }
        function autoPlay(isautoplay)
        {
            if(!isautoplay)
                {
                intervId=setInterval(()=> {
                    const playerMove=pickComputerMove();
                    playGame(playerMove);
                    
                },1000);
                isautoplay=true;
                document.querySelector('.js-auto-play').innerText="Stop";
                }
                else{
                    isautoplay=false;
                    clearInterval(intervId);
                    document.querySelector('.js-result').innerHTML='';
                    document.querySelector('.js-move').innerHTML='';
                    document.querySelector('.js-auto-play').innerText="AutoPlay";
                }
            return isautoplay;
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
