var $name = $('#name'); //input field for the name.
var $otherTitle = $('#other-title');
var $colorLabel = $('#colors-js-puns label');
var $colorMenu = $('#color');
var $colorOptions = $('#color option');

// function below, when page loads, gives focus to the first text field 
function setFocus(){
    $name.focus();
    hideElements();
}

function hideElements(){
    $otherTitle.hide();
    $colorLabel.hide();
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

// function below shows the color label and menu when user selects a design
function showColorMenu(){
    matchDesignColor(); // call function
    $colorLabel.show();
    $colorMenu.show();
}

// function below matches each design to certain colors
function matchDesignColor(){
    $('#design option').each(function(){ // selects each design
        if( $('#design option:selected').val() === 'js puns'){ // only if its equal js puns design
            
            for(var i=0; i<$colorMenu.children().length; i++){ // loop through all colors in the menu
                
                if($colorOptions.eq(i).val() === 'cornflowerblue' || $colorOptions.eq(i).val() === 'darkslategrey' || $colorOptions.eq(i).val() === 'gold'){ // this condition for matching
                        
                        // set the first matched color to be selected
                        $('#color option[value="cornflowerblue"]').attr('selected', true);
                        $colorOptions.eq(i).css('display', 'block'); // diplay all matched colors
                   }else{ // if not matched 
                        $colorOptions.eq(i).css('display', 'none'); // dont display unmatched colors
                       /// set all colors to unselected except the cornflowerblue
                        $colorOptions.eq(i).attr('selected', false); 
                   }
            }
        }
            
        if($('#design option:selected').val() === 'heart js'){ // only if its equal heart js
            
            for(var i=0; i<$colorMenu.children().length; i++){ // loop through colors in menu
                
                if($colorOptions.eq(i).val() === 'tomato' || $colorOptions.eq(i).val() === 'steelblue' || $colorOptions.eq(i).val() === 'dimgrey'){ // this condition for matching
                    
                    // set the first matched color to be selected
                    $('#color option[value="tomato"]').attr('selected', true);
                    $colorOptions.eq(i).css('display', 'block');// diplay all matched colors
            }else{
                    $colorOptions.eq(i).css('display', 'none');// dont display unmatched colors
                    // set all colors to unselected except the tomato
                    $colorOptions.eq(i).attr('selected', false);
                 }
            }
        }
            
    });
}


$('#title').on('change', createOtherRole);
$('#design').on('change', showColorMenu);
