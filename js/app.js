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
            input_field.parentElement.className = ''
        } else {
            input_field.parentElement.lastElementChild.style.display = 'block';
            input_field.parentElement.className = 'not-valid';
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
        
        let email_pattern = /.{3,}@.{3,}\.com/i

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

  });