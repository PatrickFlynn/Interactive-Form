//Load the DOM before ANY javascript

window.addEventListener('load', (event) => {
    
    //-----------------Job Role Other----------------------------------------
    let job_role = document.querySelector('#title');
    let other_field = document.querySelector('#other-job-role');
    other_field.style.display = 'none';
    /* If other is selected, unhide the other free text field,
    otherwise keep the field hidden */
    job_role.addEventListener('change', () =>{

        if (job_role.value === 'other'){
            other_field.style.display = 'block';
        } else {
            other_field.style.display = 'none';
        }

    });

    //-----------------Shirt Color----------------------------------------
    let shirt_color_div = document.querySelector('#shirt-colors');
    shirt_color_div.style.display = 'none';

    let shirt_theme = document.querySelector('#design');
    let shirt_colors = document.querySelector('#color');

    /* This event listener will dynamically hide/adjust the shirt options depending on
    which design is picked. E.g. if I <3 JS is selected, only shirt colors for that shirt
    will be displayed in the dropdown */
    shirt_theme.addEventListener('change', () => {

        shirt_color_div.style.display = 'block';

        //Added after submission review 
        shirt_colors.options.selectedIndex  = 0;

        let matchpattern = ''
        let punMatch = /puns/i;

        if (punMatch.test(shirt_theme.selectedOptions[0].innerText) === true){
            matchPattern = punMatch;
        } else {
            matchPattern = /I ♥ JS/i;
        }

        for (let i = 0; i < shirt_colors.options.length; i++){

            let shirt_val = shirt_colors.options[i].innerText;

            if (matchPattern.test(shirt_val) === true){
                shirt_colors.options[i].hidden = false;
            } else {
                shirt_colors.options[i].hidden = true;
            }
        };

    });

    //------------------Activities Focus Bubbling------------------------------

    let activities_box = document.querySelector('#activities-box');
    
    activities_box.addEventListener('focusin', (e) => {

        e.target.parentElement.classList.add('focus');

    })

    activities_box.addEventListener('focusout', (e) => {

        e.target.parentElement.classList.remove('focus');

        if (validate_activities()){
            activities_box.parentElement.classList.remove('not-valid');
            activities_box.parentElement.classList.add('valid');
            console.log(activities_box.parentElement.lastElementChild.id === 'activities-hint')
            if (activities_box.parentElement.lastElementChild.id === 'activities-hint'){
                activities_box.parentElement.lastElementChild.style.display = 'none';
            }
        } else {
            activities_box.parentElement.classList.remove('valid');
        }

    })

    //------------------Activities Total----------------------------------------
    let activites_fieldset = document.querySelector('#activities');

    activites_fieldset.addEventListener('change', (e) => {

        let total_val = document.querySelector('#activities-cost')
        let dollar_pattern = /(\d+)/i;
        let total_dollar_amount = parseInt(total_val.innerText.match(dollar_pattern)[0]);

        if (e.target.checked){
            total_dollar_amount += parseInt(e.target.dataset.cost);
        } else {
            total_dollar_amount -= parseInt(e.target.dataset.cost);
        }

        total_val.innerText = `Total: $${total_dollar_amount}`;

    })

    //-----------------Credit Card Field---------------------------------------

    let pay_method = document.querySelector('#payment');
    let creditcard = document.querySelector('#credit-card');
    let paypal = document.querySelector('#paypal');
    let bitcoin = document.querySelector('#bitcoin');
    pay_method.options[1].selected = true;

    //Set initial state to credit card selected, other two hidden
    paypal.hidden = true;
    bitcoin.hidden = true;

    pay_method.addEventListener('change', (e) => {

        let selected_val = e.target.options.selectedIndex;

        switch(selected_val){

            case 1: //Credit Card
                creditcard.hidden = false;
                paypal.hidden = true;
                bitcoin.hidden = true;
                break;
            case 2: //Paypal
                creditcard.hidden = true;
                paypal.hidden = false;
                bitcoin.hidden = true;
                break;
            case 3: //Bitcoin
                creditcard.hidden = true;
                paypal.hidden = true;
                bitcoin.hidden = false;
                break;
        }

    });

    //-----------------------Data Validation----------------------------
    
    
    //Helper function to style inputs easily
    function apply_remove_error(input_field, true_false){
        if (true_false){
            input_field.parentElement.lastElementChild.style.display = 'none';
            input_field.parentElement.classList.add('valid');
            input_field.parentElement.classList.remove('not-valid');
        } else {
            input_field.parentElement.lastElementChild.style.display = 'block';
            input_field.parentElement.classList.add('not-valid');
            input_field.parentElement.classList.remove('valid');
        }
    }

    /*-------Name Portion------*/
    let name_input = document.querySelector('#name');
    name_input.focus();

    function validate_name(){
        if (name_input.value){
            return true;
        } else {
            return false;
        }
    }

    name_input.addEventListener('blur', () => {
        let name_valid = validate_name();
        apply_remove_error(name_input, name_valid);
    })

    /*-------Email Portion------*/
    let email_field = document.querySelector('#email');

    function validate_email(){
        
        let email_pattern = /.{2,}@.{2,}\.com/i

        if (email_pattern.test(email_field.value)){
            return true;
        } else {
            return false;
        }
    }

    email_field.addEventListener('blur', () => {
        let email_valid = validate_email();
        apply_remove_error(email_field, email_valid);
    })

    /*-------Activities Not Blank Portion------*/
    
    function validate_activities(){
        let checked_sum = 0;
        
        for (let i = 0; i < activities_box.children.length; i++){
            if (activities_box.children[i].querySelector('input[type="checkbox"]').checked){
                checked_sum += 1;
            }
        }
        if (checked_sum > 0){
            return true;
        } else {
            return false;
        }
    }


    /*-------Credit Card # Portion------*/
    let credit_card_num = document.querySelector('#cc-num');

    function validate_ccn(){
        
        let ccn_pattern = /^\d{13,16}$/
        if (pay_method.options[1].selected === true){
            if (ccn_pattern.test(credit_card_num.value)){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
        
    }

    credit_card_num.addEventListener('blur', () => {
        let ccn_valid = validate_ccn();
        apply_remove_error(credit_card_num, ccn_valid);
    })


    /*-------Credit Card Zip Portion------*/
    let credit_card_zip = document.querySelector('#zip');

    function validate_zip(){
        let zip_pattern = /^\d{5}$/;

        if (pay_method.options[1].selected === true){
            if (zip_pattern.test(credit_card_zip.value)){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    credit_card_zip.addEventListener('blur', () => {

        let ccz_valid = validate_zip();

        apply_remove_error(credit_card_zip, ccz_valid);

    })


    /*-------Credit Card CVV Portion------*/
    let credit_card_cvv = document.querySelector('#cvv');

    function validate_cvv(){
        let cvv_pattern = /^\d{3}$/;

        if (pay_method.options[1].selected === true){
            if (cvv_pattern.test(credit_card_cvv.value)){
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    credit_card_cvv.addEventListener('blur', () => {

        let cvv_valid = validate_cvv();

        apply_remove_error(credit_card_cvv, cvv_valid);

    })


    //-------------------Form Submission handling--------------------------

    let form = document.querySelector('form'); 

    form.addEventListener('submit', (e) => {

        //This array is a set of tests to run in order to verify necassary requirements are met
        let tests =[
            [validate_name(), name_input],
            [validate_email(), email_field],
            [validate_activities(), activities_box],
            [validate_ccn(), credit_card_num],
            [validate_zip(), credit_card_zip],
            [validate_cvv(), credit_card_cvv],
        ]

        let invalidated = [];
        
        for (let test = 0; test < tests.length; test++){
            //Ensure tests are run even if user never clicked/focused input
            apply_remove_error(tests[test][1], tests[test][0]);
            
            //as soon as a test fails invalidate the submit and add the test failure to array
            if (!tests[test][0]){
                e.preventDefault();
                invalidated.push(tests[test])
            }
        }

        //if array of failures is greater than 0, scroll to the first item
        if (invalidated.length > 0){
            invalidated[0][1].parentElement.scrollIntoView();
        }
    })



  });