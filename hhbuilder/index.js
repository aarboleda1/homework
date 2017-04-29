var form = document.getElementsByTagName('form')[0];	
		age = document.getElementsByTagName('input')[0].value,
		selectField = document.getElementsByTagName('select')[0].value,
		row = 0,
		houseHold = {} // to keep track of family members in the household

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

function submitData(event) {
	event.preventDefault();
	if (validateEntry(event)) {
		var serializedData = JSON.stringify(houseHold);
		console.log(serializedData,' is the serializeddata')
		alert('fake submit of serializedData!');
		// place AJAX call to server here
	} 
}
function addEntry(event) {
	event.preventDefault();
	var age = document.getElementsByTagName('input')[0].value;
	var selectField = document.getElementsByTagName('select')[0].value;
	
	if (validateEntry(event)) {
		
		var peoples = document.getElementById('peoples');
		var li = document.createElement('li');
		li.appendChild(document.createTextNode('Age: '+ age + ' Relationship: ' + selectField));
		li.setAttribute('id', 'row' + row);
		var deleteButton = document.createElement('button');
		houseHold[row] = {age: age, selectField: selectField}
		deleteButton.onclick = function(frozenRowNum) { // removal of specific list item 
			return function() {
				delete houseHold[frozenRowNum]; // delete family member from object also
				document.getElementById('row' + frozenRowNum).remove();
			}
		}(row);
		
		row++;
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
				button.addEventListener('click', submitData)
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
[ X ] Remove a previously added person from the list
[ ] Display the household list in the HTML as it is modified
[ X  ] Serialize the household as JSON upon form submission as a fake trip to the server
*/ 