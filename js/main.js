var $name = $('#name'); //input field for the name.
var $otherTitle = $('#other-title');
var $colorMenu = $('#color');


// function below, when page loads, gives focus to the first text field 
function setFocus(){
    $name.focus();
    hideElements();
}

function hideElements(){
    $otherTitle.hide();
    $labelColor.hide();
    $colorMenu.hide();
}

//function below shows an input of type text when a user selects other from
// the job role drop down menu.
function createOtherRole(){
    for(var i =0; i < $('#title').children().length; i++){ // a loop for all job roles
        if($('#title option:selected').eq(i).text() === 'Other'){ // only for selected option
            $otherTitle.show(); // change the state of the text field from hide to show.
        }else{
            //$otherTitle.hide();
        }
    }
}


$('#title').on('change', createOtherRole);
