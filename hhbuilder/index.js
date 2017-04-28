var form = document.getElementsByTagName('form')[0];	
		age = document.getElementsByTagName('input')[0].value,
		selectField = document.getElementsByTagName('select')[0].value;
		
function validateEntry(event) {
	var errorMessage = document.createElement('p');
	event.preventDefault();
	var	age = document.getElementsByTagName('input')[0].value;
	var	selectField = document.getElementsByTagName('select')[0].value;
	if (!age && !selectField) {
		errorMessage.innerText = 'Must have select relationship and age';
		form.appendChild(errorMessage);
		return false;		
	} else if (isNaN(age) || age < 0 || !age) {
		var errorMessage = document.createElement('p')
		errorMessage.innerText = 'Please enter a valid age';	
		form.appendChild(errorMessage);
		return false;				
	} else if (!selectField) {
		errorMessage.innerText = 'Must have selected field!'
		form.appendChild(errorMessage);
		return false;				
	} 
	return true;
}
function deleteEntry(event) {
	event.preventDefault();
	var elem = this;
	console.log(this);
	elem.parentNode.removeChild(elem);
}

function addEntry(event) {
	event.preventDefault();
	var age = document.getElementsByTagName('input')[0].value;
	var selectField = document.getElementsByTagName('select')[0].value;
	if (validateEntry(event)) {
		var peoples = document.getElementById('peoples');
		var li = document.createElement('li');
		li.appendChild(document.createTextNode('Age: '+ age + ' Relationship: ' + selectField));
		var deleteButton = document.createElement('button');
		deleteButton.onclick = deleteEntry;
		deleteButton.innerHTML = 'Delete'
		li.appendChild(deleteButton);
		peoples.appendChild(li);	
	}
}

function load() {
	var buttons = document.getElementsByTagName('button')
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
			if (button.innerHTML === 'submit') {
				button.addEventListener('click', validateEntry)
			}
			if (button.innerHTML === 'add') {
				button.addEventListener('click', addEntry)
			}						
	}
	var personsList = document.createElement('ul');
	personsList.setAttribute('id', 'peoples')
	form.appendChild(personsList);

}
window.onload = load;

/*
[ X ] Validate data entry (age is required and > 0, relationship is required)
[ X ] Add people to a growing household list
[ ] Remove a previously added person from the list
[ ] Display the household list in the HTML as it is modified
[ ] Serialize the household as JSON upon form submission as a fake trip to the server
*/ 