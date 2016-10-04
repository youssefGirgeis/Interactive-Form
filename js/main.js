var $name = $('#name'); //input field for the name.
var $otherTitle = $('#other-title');
var $colorLabel = $('#colors-js-puns label');
var $colorMenu = $('#color');
var $colorOptions = $('#color option');
var total = 0;
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// function below, when page loads, gives focus to the first text field 
function setFocus(){
    $name.focus();
    hideElements();
}

function hideElements(){
    $otherTitle.hide();
    $colorLabel.hide();
    $colorMenu.hide();
    $('#paypal').hide();
    $('#bitcoin').hide();
}

//function below shows an input of type text when a user selects other from
// the job role drop down menu.
function createOtherRole(){
    for(var i =0; i < $('#title').children().length; i++){ // a loop for all job roles
        if($('#title option:selected').eq(i).text() === 'Other'){ // only for selected option
            $otherTitle.show(); // change the state of the text field from hide to show.
            break;
        }else{
            $otherTitle.hide();
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

function getMoney(event){
    var startIndex = event.indexOf('$');
    var endIndex = event.length;
    return parseInt(event.substr(startIndex + 1, endIndex - 1));
}


function getEventDate(event){
    var startIndex = event.indexOf('—');
    var end = event.length - (startIndex + 8); 
    return event.substr(startIndex + 2, end);
}


function registerActivity(){
    $('.total-money').css('display', 'Block');
    var event = $(this).parent().text();
    
    var money = getMoney(event);
    var date = getEventDate(event);
    var index = $(this).parent().index()-1;
    
    if($(this).is(':checked')){
        total += money;
        $('.total').text('$'+total);
        
        for(var i=0; i < $('input[type="checkbox"]').length; i++){
            if(date === getEventDate($('input[type="checkbox"]').eq(i).parent().text()) && i !== index){
            
                $('input[type="checkbox"]').eq(i).prop('disabled', true);
                $('input[type="checkbox"]').eq(i).parent().css('color', 'grey');
            }
        }
            
    }else{
        
        total -= money;
        for(var i=0; i < $('input[type="checkbox"]').length; i++){
            if(date === getEventDate($('input[type="checkbox"]').eq(i).parent().text())){
                $('input[type="checkbox"]').eq(i).prop('disabled', false);
                $('input[type="checkbox"]').eq(i).parent().css('color', 'black');
            }
        }
        
        if(total === 0){
            $('.total-money').css('display', 'none');
        }else{
            $('.total').text('$'+total);
        }
    }
}
    
function showMethodOfPayment(){
   
    if($('#payment option:selected').text() === 'PayPal'){
        $('#paypal').show();
        $('#credit-card').hide();
        $('#bitcoin').hide();
    }else if($('#payment option:selected').text() === 'Bitcoin'){
        $('#bitcoin').show();
        $('#paypal').hide();
        $('#credit-card').hide();
    }
}

function validateName(){
    if($name.val() === ''){
        $('label[for="name"]').css('color', '#932631');
        $('.error-name').text('(Please provide name before submission)');
        $('label[for="name"]').focus();
        return true;
    }else{
        $('label[for="name"]').css('color', 'initial');
        $('.error-name').text('');
        return false;
    }
}

function validateEmail(){
    if($('#mail').val() === '' || !re.test($('#mail').val())){
        
        $('label[for="mail"]').css('color', '#932631');
        $('.error-email').text('(Please provide valid email address)');
        $('label[for="mail"]').focus();
        return true;
    }else{
        $('label[for="mail"]').css('color', 'initial');
        $('.error-email').text('');
        return false;
    }
}

function validateForm(e){
    
    if(validateEmail()){
        e.preventDefault();
    }

    if(validateName()){
        e.preventDefault();
    }

}

$('#title').on('change', createOtherRole);
$('#design').on('change', showColorMenu);
$('input[type="checkbox"]').on('change', registerActivity);
$('#payment').on('change', showMethodOfPayment);
$('button').on('click', validateForm);
