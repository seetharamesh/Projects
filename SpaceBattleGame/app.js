$(() => {
  /* Begin */

  //The variables flag, inputAliens, inputName are used by userprompt function below.
  var flag = true;
  var inputAliens = 0;
  var inputName = "";
  //Declaring class for "user"
  class User {
    constructor(userName, numberOfAliens, hull, firePower, accuracy) {
      this.hull = hull; //given 20
      this.firePower = firePower; //given is 5
      this.accuracy = accuracy; // given is 0.7
      this.userName = userName;
      this.numberOfAliens = numberOfAliens;
      this.isAlive = true;
    } //end of constructor

    //construct methods for user class.
    //This method introduces user.
    introduceYourself() {
      //console.log(`Hello ${this.userName}!! You are going to battle with ${this.numberOfAliens} alien(s) today. All the Best!`);
      console.log("%c Hello " + this.userName + "!! You are going to battle with " + this.numberOfAliens + " alien(s) today. All the Best!", "color:blue;font-size:20px");
    }
    //This method has the user logic of attacking the alien. First the user's accuracy is compared to random number.
    //If the accuracy is less then it means you hit the alien and points are deducted from alien's hull using your firepower.
    //check if alien's hull is below zero(inclusive). It means alien is dead reduce the number of aliens from the total aliens
    //that are going to fight with you. set alien alive flag to false.
    //If the accuracy is greater then it means you missed hitting the alien and it's alien's turn to attack.

    attack(alien) {
      console.log("%c" + this.userName + " is attacking " + alien.userName, "color:green;font-size:20px");
      let randomNumber = Math.random();
      //console.log(`Accuracy threshold is ${randomNumber}`);
      console.log("%c Accuracy threshold is: " + randomNumber, "color:green;font-size:15px");
      console.log("%c It is less than: " + this.accuracy, "color:green;font-size:15px");
      if (randomNumber < this.accuracy) {
        //console.log(`It's a direct hit!! Well done ${this.userName}!`);
        console.log("%c" + this.userName + " you HIT the alien ! Well done!!", "color:rgb(236, 5, 5);font-size:25px");
        alien.hull = alien.hull - this.firePower; //reduce points for alien with user's firepower
        //console.log(`alien has ${alien.hull} hull points left.`);
        console.log("%c" + alien.userName + " has " + alien.hull + " hull points left", "color:rgb(85, 77, 76);font-size:20px");
        if (alien.hull <= 0) {
          alien.isAlive = false;
          console.log("%cAlien is not Alive","color:red;font-size:20px");
          alien.numberOfAliens--;
          //console.log(`Alien ship is destroyed!! ${this.userName} has saved the Universe from complete destruction!!`);
          console.log("%cAlien ship is destroyed!!" + this.userName + " has saved the Earth!!", "color:#0e7808;font-size:30px");
        }
      } else { //if random number is greater than threshold then user looses.
        //console.log(`${this.userName} missed destroying the alien !`);
        console.log("%c" + this.userName + " missed destroying " + alien.userName, "color:rgb(110, 38, 212);font-size:20px");
      }
    } //end of attack method
  } //end of User class*****************************************************************************************************
  //Declaring class for "Alien"
  class Alien {
    constructor(alienName, numberOfAliens) {
      this.hull = Math.floor(Math.random() * 4) + 3; //given between 3 and 6
      this.firePower = Math.floor(Math.random() * 3) + 2; //given between 2 and 4
      this.accuracy = (Math.floor(Math.random() * 3) + 6) / 10; // given between 0.6 and 0.8
      this.userName = alienName;
      this.numberOfAliens = numberOfAliens;
      this.isAlive = true;
    } //end of constructor
    //construct methods for Alien class
    introduceYourself() {
      console.log("%c Hello " + this.userName + " you are going to battle against ONE strong user!", "color:orange;font-size:20px");
    }
    //This "attack" method has the alien logic of attacking the user. First the alien's accuracy is compared to random number.
    //If the accuracy is less then it means you hit the user and points are deducted from user's hull using your firepower.
    //check if user's hull is below zero(inclusive). It means user is dead. Set user alive flag to false.
    //If the accuracy is greater then it means you missed hitting the user and it's user's turn to attack.

    attack(user) {
      console.log("%c" + this.userName + " is attacking " + user.userName, "color:green;font-size:20px");
      let randomNumber = Math.random();
      //console.log(`Accuracy threshold is ${randomNumber}`);
      console.log("%c" + "Accuracy threshold is " + randomNumber, "color:green;font-size:15px");
      console.log("%c It is less than: " + this.accuracy, "color:green;font-size:15px");

      if (randomNumber < this.accuracy) {
        //console.log(`Its a direct hit!! Well done alien ${this.userName}!`);
        console.log("%c" + this.userName + " hit the strong User!!", "color:#25ac14;font-size:25px");
        user.hull = user.hull - this.firePower; //reduce points for alien with user's firepower
        //console.log(`User has ${user.hull} hull points left.`);
        console.log("%c The User has " + user.hull + " points left!", "color:green;font-size:20px");
        if (user.hull <= 0) {
          user.isAlive = false;
          console.log("User is not alive");
          //console.log(`User ship is destroyed!! ${this.userName} has Won!!`);
          console.log("%c" + user.userName + " is destroyed!!" + this.userName + " has Won!!", "color:red;font-size:30px")
        }
      } else {
        //console.log(`${this.userName} missed destroying the user !`);
        console.log("%c" + this.userName + " you missed destroying " + user.userName, "color:rgb(110, 38, 212);font-size:20px");
      }
    } //end of attack method
  } //end of alien class
  //end of alien class******************************************************************************************************

  //****Begin**** The below code is written for modal pop-up for "About the Game" button
  // Grabbing "About the Game" button. #openModal is the id defined for this button in HTML
  const $openBtn = $('#openModal');
  // // Grabbing modal element
  const $modal = $('#modal');
  //
  //  Grabbing close button
  const $closeBtn = $('#close');
  //  Event handler to open the modal
  const openModal = () => {
    //Make a setTimeout for the modal to automatically pop-up after 5 seconds.
    //setTimeout(openModal, 5000);
    $modal.css('display', 'block'); //change the css property. setting the display to block so the box pops up after every 5 secs.
  }
  // Add event listener to About the Game button
  $openBtn.on('click', openModal);

  // Event handler to close the modal
  const closeModal = () => {
    $modal.css('display', 'none'); //change the css property. setting the display property to none so the box closes after clicking close button.
    //add a start button
  }
  // Add event listener to Close button
  $closeBtn.on('click', closeModal);
  //****End**** The above code is written for modal pop-up for "About the Game" button

  //function added for startGame button to request user prompts
  $("#startGame").click(function() {

    //Remember whatever you put in prompt box is considered as a string=>console.log(typeof inputAliens);
    //The flag is used to prompt user with valid data. It's set to false and will exit the loop until a valid data is entered
    while (flag == true) {
      inputName = prompt("Please Enter Your Name: ");
      inputAliens = prompt("Input Number of Aliens you want to play with[1 - 6 (inclusively)]: ");

      if (inputName == null || inputAliens == null) {
        // it means user hit cancel
        alert("Missing Information! To play the game you need BOTH VALID user name and number of Aliens to play with!");
        inputAliens = 0;
        //console.log(`You are going to play with ${inputAliens} aliens`);
        break;
      } else if (inputAliens.length <= 0 || isNaN(inputAliens) || inputName.length <= 0) {
        //  it means user pressed OK, but input invalid or does not input anything
        alert("Invalid input or missing information!");
        inputAliens = 0;
        inputName = "";
        break;
      } else {
        // it means user typed something valid and hit OK
        inputAliens = parseInt(inputAliens);
        if (inputAliens <= 0 || inputAliens > 6) {
          alert("You are ONLY allowed to play with 1-6 aliens (inclusively)");
          flag = true;
        } else {
          //console.log(`${inputName} is going to play with ${inputAliens} alien(s)`);
          console.log("%c" + inputName + " is going to play with " + inputAliens + " alien(s)!!","color:#025267; font-size:25px");
          console.log('%c SPACE BATTLE BEGINS NOW!!!!', 'font-size: 40px');
          break;
        }//end of else
      }//end of else
    } //end of while loop

    //Start the game only if input aliens from console is greater than zero
    if (inputAliens != 0) {
      //instantiate object here as class get created when document loads so you would be able to access the inputs from the prompt and then create objects of the class
      const user = new User(inputName, inputAliens, 20, 5, 0.7);
      //console.log(user);
      user.introduceYourself();
      var alien = new Alien('Alien', inputAliens);
      //console.log(alien);
      alien.introduceYourself();
      //The game will continue only if there are still aliens to play
      while (alien.numberOfAliens != 0) {
        console.log("alien count is:" + alien.numberOfAliens);
      //The game begins if both players are alive
        while (user.isAlive && alien.isAlive) {
          console.log("inside battle");
          user.attack(alien);
          if (user.isAlive && alien.isAlive) {
            alien.attack(user);
          }
        } //end of battle while
        //check if user is alive and still there are aliens to battle with.
        if (user.isAlive && alien.numberOfAliens >= 1) {
          //ask if user wants to continue battling or retreat
          console.log("%c Number of aliens remaining after the battle is:" + alien.numberOfAliens,"font-size:20px;font-color:grey");
          //use the confirm() to check if user wants to continue or retire.
          if (confirm("Do you want to continue playing the game")) {
            console.log("user wants to fight with next alien");
            alien = new Alien('New Alien on the scene', alien.numberOfAliens);
          } else {
            console.log("User is tired and retiring for the day!!");
            break;
          }
        } else {
          //end the game as user is dead or no more aliens to play with.
          console.log("%cGame Ends","color:#952c4f;font-size:30px");
        }
      } //end of alien count while
    } //end of if inputAliens != 0
    else {
      console.log("%cGame Ends as information provided in the prompt is insufficient","color:#952c4f;font-size:30px");
    }
  }) //end of click function


  //********************************************************************************

}); //End
