const saveBtn = document.querySelector('#saveProfile');
const deleteBtn = document.querySelector('#deleteProfile');

saveBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const fn = document.querySelector('input[name="first"]').value.trim();
    const ln = document.querySelector('input[name="last"]').value.trim();
    const select = document.querySelector('#physical');
    const emojiURL = select.value; 
    const emotionText = select.options[select.selectedIndex].text; 

   
    localStorage.setItem('wellness-first', fn);
    localStorage.setItem('wellness-last', ln);
    localStorage.setItem('wellness-emoji', emojiURL);
    localStorage.setItem('wellness-text', emotionText);

    
    updateProfileDisplay();
});


deleteBtn.addEventListener('click', () => {
    localStorage.removeItem('wellness-first');
    localStorage.removeItem('wellness-last');
    localStorage.removeItem('wellness-emoji');
    localStorage.removeItem('wellness-text');
    updateProfileDisplay();
});


function updateProfileDisplay() {
    const first = localStorage.getItem('wellness-first');
    const last = localStorage.getItem('wellness-last');
    const emoji = localStorage.getItem('wellness-emoji');
    const emotion = localStorage.getItem('wellness-text');

    const newProfile = document.querySelector('#newProfile');
    const myProfile = document.querySelector('#myProfile');

    if (first && last && emoji && emotion) {
      
        newProfile.className = 'hideMe';
        myProfile.className = 'showMe';

        
        document.querySelector('#first').textContent = first;
        document.querySelector('#last').textContent = last;
        document.querySelector('#emotion').textContent = emotion;
        document.querySelector('#emoji').src = emoji;
        document.querySelector('#emoji').alt = emotion + ' emoji';
    } else {
        
        newProfile.className = 'showMe';
        myProfile.className = 'hideMe';
    }
}


updateProfileDisplay();







