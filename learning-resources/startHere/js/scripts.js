import { people } from './data/people.js';
console.log(people);


const myNavigation = document.querySelector('nav');
const myParent = document.querySelector('#peopleHere');


// create an all people button 
const btnAll = document.createElement('button');
btnAll.textContent = "All People";
btnAll.addEventListener('click', () => displayPeople(people))

// create a female people button with a filter 
const btnFemale = document.createElement('button');
btnFemale.textContent = "Female Peoples";
btnFemale.addEventListener('click', () => {
    const arrayFemale = people.filter(person => person.gender === 'female');
    displayPeople(arrayFemale);
}) // end of button

// create a male people button with a filter 
const btnMale = document.createElement('button');
btnMale.textContent = "Male Peoples";
btnMale.addEventListener('click', () => {
    const arrayMale = people.filter(person => person.gender === 'male');
    displayPeople(arrayMale);
}) // end of button

// create a other people button with a filter 
const btnOther = document.createElement('button');
btnOther.textContent = "Other Peoples";
btnOther.addEventListener('click', () => {
    const arrayOther = people.filter(person => person.gender != 'male' && person.gender != 'female');
    displayPeople(arrayOther);
}) // end of button


// add buttons to page 
myNavigation.appendChild(btnAll);
myNavigation.appendChild(btnFemale);
myNavigation.appendChild(btnMale);
myNavigation.appendChild(btnOther);



// loop through all the people
function displayPeople(x) {
    myParent.textContent = ""
    x.forEach(person => {
        const myFigure = document.createElement('figure');

        const myImage = document.createElement('img');
        const explodedArray = person.url.split('/');
        console.log(explodedArray);
        const charNumber = explodedArray[5]
        myImage.src =`https://starwars.dgmuvu.com/characters/${charNumber}.jpg`
        myImage.alt = person.name;

        const myCaption = document.createElement('figcaption');
        myCaption.textContent = person.name

        // assign gender class 
        console.log(person.gender);
        switch(person.gender) {
            case "female":
             myFigure.className = "female";
             break;
            case "male":
             myFigure.className = "male";
             break;
            default: 
             myFigure.className = "other";
        } // end of switch

        // assemble the parts 
        myFigure.appendChild(myImage);
        myFigure.appendChild(myCaption);
       
        //attach to the html page 
        myParent.appendChild(myFigure);


        









    }//end of fat arrow
   )// end of the loop

} // end of function 

displayPeople(people);
