$(document).ready(function() {

    // 移动
    var moves = 0;
    // 点开的卡片
    var openedCards = [];
    // 卡1
    var firstCard = "";
    // 卡2
    var secondCard = "";
    var timer;
    var stars = 3;
    var timerValue;
    var matched = 0;
    var startGame = false;
    $('#reset-button').click(resetGame);

    cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass(animationName).one(animationEnd, function() {
                $(this).removeClass(animateName);
            });
            return this;
        }
    });


    // Restart memory Game
    function resetGame() {
        moves = 0;
        matched = 0;
        $('#deck').empty();
        $('#stars').empty();
        startGame = false;
        clearInterval(timer);
        $(".timer").text("00:00");
        initGame();
    }
    // Initial Game and Display the cards on the page
    function initGame() {
        moves = 0;
        matched = 0;
        $('#deck').empty();
        $('#stars').empty();
        startGame = false;
        clearInterval(timer);
        $(".timer").text("00:00");
        createCards();
        $('.card').click(toggleCard);
        $('#moves').html("0 Moves");
        addStars(3);
    }
    function addStars() {
        for (var i = 0; i < 3; i++) {
            $('#stars').append('<li><i class="fa fa-star"></i></li>');
        }
    }
    function createCards() {
        for (var i = 0; i < 2; i++) {
            cardsList = shuffle(cardsList);
            cardsList.forEach(AddCard);
        }


    }
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;

        }
        return array;
    }
    function AddCard(card) {
        $('#deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
    }




    function toggleCard() {
		
        if (startGame == false) {
            startGame = true;
            Timer();
        }
        if (openedCards.length === 0) {
            $(this).toggleClass("show open").animateCss('flipInY');
            openedCards.push($(this));
            firstCard = this.firstChild.className;
            disableClick();
        } else if (openedCards.length === 1) {
            updateMoves();
            $(this).toggleClass("show open").animateCss('flipInY');
            openedCards.push($(this));
            secondCard = this.firstChild.className;
            setTimeout(matchCards, 1000);

        }
    }
    function disableClick() {
        openedCards.forEach(function(card) {
            card.off('click');
        });
    }
    // increment moves
    function updateMoves() {
        moves += 1;
        $('#moves').html(`${moves} Moves`);
        if (moves == 32) {
            rate();
        } else if (moves == 24) {
            rate();
        } else if (moves == 17) {
            rate();
        }

    }

    function rate() {
        $('#stars li').first().remove();
        stars -= 1;
        $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
    }
    function EnableClick() {
        openedCards[0].click(toggleCard);
    }
    function matchCards() {
        // Compare opened cards
        if (firstCard === secondCard) {
            console.log("matchCard");
            openedCards[0].addClass('match');
            openedCards[0].animateCss('pulse');
            openedCards[1].addClass('match');
            openedCards[1].animateCss('pulse');
            removeOpenCards();
            setTimeout(checkResult, 500);
        } else {
            openedCards[0].toggleClass("show open").animateCss('flipInY');
            openedCards[1].toggleClass("show open").animateCss('flipInY');
            EnableClick();
            removeOpenCards();
        }

    }

    function removeOpenCards() {
        openedCards = [];
    }

    function checkResult() {
        matched += 1;
        if (matched == 8) {
            timerValue = document.getElementsByClassName("timer").innerHTML;
            setTimeout(showWinBox, 1000);
        }

    }

    function Timer() {
        let startTime = new Date().getTime();

        // 更新时间
        timer = setInterval(function() {

            let currentTime = new Date().getTime();

            let timePlayed = currentTime - startTime;

            let mins = Math.floor((timePlayed % (1000 * 60 * 60)) / (1000 * 60));
            let secs = Math.floor((timePlayed % (1000 * 60)) / 1000);
            timerValue = mins + " minutes " + secs + " seconds ";
            // Add starting 0 if seconds < 10
            if (secs < 10) {
                secs = "0" + secs;
            }
            if (mins < 10) {
                mins = "0" + mins;
            }

            let lastCurrentTime = mins + ':' + secs;

            $(".timer").text(lastCurrentTime);
        }, 500);
    }
    function showWinBox() {
		clearInterval(timer);
        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            animation: true,
            customClass: 'animated tade',
            title: 'Congratulations! You Won!',
            text: 'With ' + moves + ' Moves and ' + stars + ' Stars.\n wooo! ' + ' Ellapsed Time' + timerValue,
            type: 'success',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Play again!'
        }).then(function(isConfirm) {
            if (isConfirm) {
                clearInterval(timer);
                initGame();
            }
        })
    }

    initGame();
});