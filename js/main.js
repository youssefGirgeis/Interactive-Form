'use strict';

var $name = $('#name'); //input field for the name.
var $otherTitle = $('#other-title'); // text field input
var $colorLabel = $('#colors-js-puns label'); // color label
var $colorMenu = $('#color'); // color select menu
var $colorOptions = $('#color option'); // all colors in the menu
var total = 0; // total amount of money
var ccNumber = $('#cc-num'); // credit card number

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var activityError = $('<p>Please select at least one activity</p>').css('color', '#932631');



// function below, when page loads, gives focus to the first text field 
function setFocus(){
    $name.focus();
    $('#payment option[value="credit card"]').attr('selected', true);
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

// function below for extracting the value of the money from the activity info.
function getMoney(event){
    var startIndex = event.indexOf('$'); // index of the dollar sign
    var endIndex = event.length; // length of an activity string 
    return parseInt(event.substr(startIndex + 1, endIndex - 1)); // amout of money
}

// this function is for extracting the date of the event
function getEventDate(event){
    var startIndex = event.indexOf('—'); // index of the - character 
    var end = event.length - (startIndex + 8);  // index of the end of the date
    return event.substr(startIndex + 2, end); // date
}


function registerActivity(){
    $('.total-money').css('display', 'Block'); // amount of money displayed when user select an activity
    var event = $(this).parent().text(); // activity string 
    
    var money = getMoney(event); // call getMoney to get the amount of money
    var date = getEventDate(event); // call geteventDate to get the date of the activity 
    
    //difference is used to make the first label element's index to be zero.
    var difference = $('fieldset:eq(2)').children().length - $('fieldset:eq(2) label').length;
    var index = $(this).parent().index() - difference; // index of the label element
    
    if($(this).is(':checked')){ // if an activity is checked 
        
        $('fieldset:eq(2) p').hide(); // hide error message when activity been checked.
        
        total += money; // to calculate the total amount of money
        $('.total').text('$'+total); // display total amount of money
        
        for(var i=0; i < $('input[type="checkbox"]').length; i++){ // loop through all checkboxes
            
            //condition below is used to check if two activities with same date
            if(date === getEventDate($('input[type="checkbox"]').eq(i).parent().text()) && i !== index){
            console.log(index);
                $('input[type="checkbox"]').eq(i).prop('disabled', true); // disable if date is the same
                $('input[type="checkbox"]').eq(i).parent().css('color', 'grey'); // change color to grey
            }
        }
            
    }else{ // if an activity was checked and then unchecked
        
        total -= money; // subtract the total - amount of money
        for(var i=0; i < $('input[type="checkbox"]').length; i++){ // loop through all checkboxes
            
            //condition below is used to check if two activities with same date
            if(date === getEventDate($('input[type="checkbox"]').eq(i).parent().text())){
                $('input[type="checkbox"]').eq(i).prop('disabled', false); // enable the event
                $('input[type="checkbox"]').eq(i).parent().css('color', 'black'); // change color to black again.
            }
        }
        
        if(total === 0){ // if no selection
            $('.total-money').css('display', 'none'); // total money not displayed 
        }else{
            $('.total').text('$'+total);
        }
    }
}

// function below to display the method of payment users choose from three options
function showMethodOfPayment(){
   
    if($('#payment option:selected').text() === 'PayPal'){ // if it is paypal
        $('#paypal').show();
        $('#credit-card').hide();
        $('#bitcoin').hide();
    }else if($('#payment option:selected').text() === 'Bitcoin'){ // if it's bitcoin
        $('#bitcoin').show();
        $('#paypal').hide();
        $('#credit-card').hide();
    }else if($('#payment option:selected').text() === 'Credit Card'){ // if it's a credit card
        $('#bitcoin').hide();
        $('#paypal').hide();
        $('#credit-card').show();
    }else{ // if nothing then nothing to display
        $('#bitcoin').hide();
        $('#paypal').hide();
        $('#credit-card').hide();
    }
}

// function below to validate the name text field
function validateName(){
    if($name.val() === ''){ // if user enters nothing
        $('label[for="name"]').css('color', '#932631'); // change the color of the label to red
        $('.error-name').text('(Please provide name before submission)'); // display an error message
        $('label[for="name"]').focus(); // focus on the name
        return true;
    }else{ // if there is a value
        $('label[for="name"]').css('color', 'initial'); // color to initial
        $('.error-name').text(''); // remove error message
        return false;
    }
}

// function below to validate email address
function validateEmail(){
    if($('#mail').val() === '' || !re.test($('#mail').val())){ // if user enters wrong format of email address
        
        $('label[for="mail"]').css('color', '#932631'); // change the color of label to red
        $('.error-email').text('(Please provide valid email address)'); // display an error message
        $('label[for="mail"]').focus();
        return true;
    }else{
        $('label[for="mail"]').css('color', 'initial');
        $('.error-email').text('');
        return false;
    }
}

// function to make sure at least one activity checked
function validateActivity(){
    var counter = 0;// to count checked activities
    $('input[type="checkbox"]:checked').each(function(){ // all checked activities
        counter++;
    });
    
    if(counter === 0){ // if no activity checked
        $('fieldset:eq(2)').prepend(activityError); // add this error message on top the list of activites
        $('fieldset:eq(2) p').show(); // display error message
        
        return true;
    }else{
        return false;
    }
}

// function to validate cerdit card
function validateCreditCard(){
    
    var ccNumberArray = ccNumber.val().split(''); // change the number from string to array of characters 
    var checkDigit = parseInt(ccNumberArray.pop(ccNumberArray[ccNumberArray.length - 1])); // last digit
    var arraylength = ccNumberArray.length; // length of the number
    var reversedArray = []; // array for the reversed number
    var sum =0; // used for validation
    
    for(var i=0; i<arraylength; i++){
        var lastDigit = ccNumberArray.pop(ccNumberArray[ccNumberArray.length - 1]); // remove the last digit from the number
        reversedArray.push(parseInt(lastDigit)); // added to revered array at the begining 
    }
    
    for(var i=0; i < reversedArray.length; i++){ // loop through reversed array
        
        if((i+1) % 2 !== 0){ // if the position of digit is odd
            reversedArray[i] *= 2; // multiply digit by 2
            if(reversedArray[i] > 9){ // if it's bigger than 9
                reversedArray[i] -= 9; // subtract 9
            }
        }else{
            if(reversedArray[i] > 9){
                reversedArray[i] -= 9;
            }
        }
        sum += reversedArray[i]; // add all numbers
    }
    
    if(sum % 10 !== checkDigit || $('#cc-num').val() === ''){ 
        $('label[for="cc-num"]').css('color', '#932631');
        $('label[for="cc-num"]').focus();
        $('label[for="cc-num"] span').show();
        return true;
    }else{
        $('label[for="cc-num"]').css('color', 'initial');
        return false;
    }
}

// function below to make sure users enter a value for zip code
function validateZipCode(){
    if($('#zip').val() === ''){
        $('label[for="zip"]').css('color', '#932631');
        return true;
    }else{
        $('label[for="zip"]').css('color', 'initial');
        return false;
    }
}

// function below to make sure users enter a value for CVV
function validateCVV(){
    if($('#cvv').val() === ''){
        $('label[for="cvv"]').css('color', '#932631');
        return true;
    }else{
        $('label[for="cvv"]').css('color', 'initial');
        return false;
    }
}

// function below is used to prevent submission of the form if
//the user is missing something or enters anything wrong
function validateForm(e){
    if(validateCreditCard()){
        e.preventDefault();
    }
    
    if(validateZipCode()){
        e.preventDefault();
    }
    
    if(validateCVV()){
        e.preventDefault();
    }
    
    if(validateActivity()){
        e.preventDefault();
    }
    
    if(validateEmail()){
        e.preventDefault();
    }

    if(validateName()){
        e.preventDefault();
    }
    
    if($('#payment option:selected').val() === 'select_method'){ // if user didnt choose method of payment
        $('label[for="payment"]').css('color', '#932631');
        e.preventDefault();
    }else{
         $('label[for="payment"]').css('color', 'initial');
    }
}

$('#title').on('change', createOtherRole);
$('#design').on('change', showColorMenu);
$('input[type="checkbox"]').on('change', registerActivity);
$('#payment').on('change', showMethodOfPayment);
$('button').on('click', validateForm);