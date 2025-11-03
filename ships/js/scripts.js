const myNavigation = document.querySelector('nav');
const myViewer = document.querySelector('main');

// Go grab the data and then W A I T for the result
fetch("data/starships.json")
  .then((response) => response.json())
  .then((shipArray) => {
    console.log(shipArray);
    populateNav(shipArray);
  })
  .catch((error) => console.error("Error fetching JSON:", error));

// Populate the nav bar
function populateNav(allShips) {
  console.log(allShips);
  allShips.forEach(ship => {
    let myButton = document.createElement('button');
    myButton.textContent = ship.name;
    myButton.addEventListener('click', () => showShip(ship))
    myNavigation.appendChild(myButton);
  });
}

// ship viewer 
function showShip(shipData) {
    console.log(shipData);
    //Create a figure and its parts 
    let myFigure = document.createElement('figure');
    let myImage = document.createElement('img');
    let myCaption = document.createElement('figcaption');

    // assign data to the figure 
    console.log(shipData.url);  
    let urlArray = shipData.url.split('/');
    console.log(urlArray[5]);    
    myImage.src =`https://starwars.dgmuvu.com/ships/${urlArray[5]}.jpg`
    myCaption.textContent = shipData.name;

    // error checking for image 
    myImage.addEventListener('error', () => {
        myImage.src = "https://starwars.dgmuvu.com/ships/placeholder.jpg"
        myCaption.textContent = `The ${shipData.name} was destroyed in a recent battle`
    })

    // assemble the figure
    myFigure.appendChild(myImage);
    myFigure.appendChild(myCaption);


    // add the figuure to the html
    myViewer.textContent = ''
    myViewer.appendChild(myFigure);
}// end viewer 



