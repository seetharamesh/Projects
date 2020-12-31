console.log($);
$(() => {
  var tileValue = 0;
  console.log("document loaded");
  class Team {
    constructor(name, $el) {
      this.name = name;
      this.score = 0;
      //let us assign the element $el to each team instance
      this.$el = $el;
    } //end of constructor

    increaseScore(pointValue) {
      this.score += Number(pointValue);
      this.$el.children().eq(1).text(this.score); //changed from 0 to 1
    }
    decreaseScore(pointValue) {
      this.score -= pointValue;
      this.$el.children().eq(1).text(this.score); //changed from 0 to 1
    }

    // setup() {
    //   this.$el.children().eq(1).on('click', () => {
    //     console.log("increase score clicked");
    //     this.increaseScore(100)
    //   })
    //   this.$el.children().eq(2).on('click', () => {
    //     this.decreaseScore(100)
    //   })
    //   return this;
    // }
  } //end of class
  //var tileValue = 0;
  const $tiles = $('.tile').on('click', (event) => {
    $(event.currentTarget).toggleClass('active');
    // The below 2 statements returns the tile value and extracts just the numbers without $" sign.
    tileValue = event.currentTarget.children[0].innerHTML;//children[0] is div-question value. children[1] is div question-answer
    //console.log(tileValue);
    tileValue = /\d+/g.exec(tileValue)[0]; //extracts only numbers from $tilevalue
  //  console.log("Value of tile after extraction:" + tileValue);

   $("#popup-overlay, #popup-content").addClass("active");

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked
$(".close, #popup-overlay").on("click", function() {
  $("#popup-overlay, #popup-content").removeClass("active");
});

});


  //instantiate 3 teams
  const team1 = new Team('team1', $('.container1'));
  const team2 = new Team('team2', $('.container2'));
  const team3 = new Team('team3', $('.container3'));

  //Team 1 increment scoreboard
  $('.increment1').click(function() {
    console.log("inside +");
    team1.increaseScore(Number(tileValue));
  });
  //Team 2 increment scoreboard
  $('.increment2').click(function() {
    team2.increaseScore(Number(tileValue));
  });
  //Team 3 increment scoreboard
  $('.increment3').click(function() {
    team3.increaseScore(Number(tileValue));
  });

  //decrement score board for team 1
  $('.decrement1').click(function() {
    console.log("inside -");
    console.log("tileValue:" + tileValue);
    team1.decreaseScore(Number(tileValue));
  });
  //decrement score board for team 2
  $('.decrement2').click(function() {
    team2.decreaseScore(Number(tileValue));
  });
  //decrement score board for team 3
  $('.decrement3').click(function() {
    team3.decreaseScore(Number(tileValue));
  });
}) //document end
