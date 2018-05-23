(function(){
    var matches = 0;

    var tentativas = 0;

    var contador = 10;

    TEXT_SCORE = "Pontos: ";

    var images = [];

    var flippedCards = [];

    var textMatchSign = document.querySelector("#textMatchSign");

    var linkAddItem = document.getElementById('control');

    for (var i = 0; i < 16; i++) {
        var img = {
            src: "img/jogoMemoria/"+ i +".jpg",
            id: i%8
        };
        images.push(img);
        
    }

    linkAddItem.addEventListener('click', startGame, false);


     matchCardSign();


    function startGame(){
      contador = 10;

      matches = 0;

      matchCardSign();

      flippedCards = [];
      images = randomSort(images);

      var frontFaces = document.getElementsByClassName("front");
      var backFaces = document.getElementsByClassName("back");

      for(var i = 0; i < 16; i++){
          frontFaces[i].classList.remove("flipped","match");
          backFaces[i].classList.remove("flipped","match");

          var card = document.querySelector("#card" + i);
          card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 3 + "px"; 
          card.style.top = i < 8 ? 5 + "px" : 5 + "px";

          card.addEventListener("click",flipCard,false);

          frontFaces[i].style.background = "url('"+ images[i].src +"')";
          frontFaces[i].style.backgroundSize = 100 + "%", 100 + "%";
          frontFaces[i].setAttribute("id",images[i].id);
      }
    }

    function randomSort(oldArray) {
        
        var newArray = [];

        while(newArray.length !== oldArray.length){
            var i = Math.floor(Math.random()*oldArray.length);

            if(newArray.indexOf(oldArray[i]) < 0){
                newArray.push(oldArray[i])
            }
        }

        return newArray;
    }

    function flipCard(){
        if(flippedCards.length < 2){
            var faces = this.getElementsByClassName("face");

            if(faces[0].classList.length > 2){

                return;
            }
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");

            flippedCards.push(this);

            if(flippedCards.length === 2){
                 if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                     flippedCards[0].childNodes[1].classList.toggle("match");
                     flippedCards[0].childNodes[3].classList.toggle("match");
                     flippedCards[1].childNodes[1].classList.toggle("match");
                     flippedCards[1].childNodes[3].classList.toggle("match");

                     tentativas = 0;

                     matches++;

                     contador += 10;

                     matchCardSign();

                     flippedCards = [];

                     if(matches === 8){

                         alert('Parabens : )!!! Proximo nivel em breve!!! Total de Pontos: ' + contador );
                         document.location.reload();
                     }
                 }
            }
        } else {

            tentativas++;

            contador -= 5;

            matchCardSign();

            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = [];

            if (tentativas === 5) {

                alert('Fim do Jogo!!! voce tem ate 5 tentativas!!! ');
                document.location.reload();
            }
        }      
    }


    function matchCardSign() {

      var pontos = document.getElementById('pontos');
       pontos.innerHTML = TEXT_SCORE + contador;
    }
}());
