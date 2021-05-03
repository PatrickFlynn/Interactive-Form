window.addEventListener('load', (event) => {
    
    let name_input = document.querySelector('#name');
    name_input.focus();

    let job_role = document.querySelector('#title');
    let other_field = document.querySelector('#other-job-role');
    other_field.style.display = 'none';

    let shirt_color_div = document.querySelector('#shirt-colors');
    shirt_color_div.style.display = 'none';

    let shirt_theme = document.querySelector('#design');
    let shirt_colors = document.querySelector('#color');

    let email_field = document.querySelector('#email');
    console.log(email_field.parentNode.className = 'not-valid');

    /* If other is selected, unhide the other free text field,
    otherwise keep the field hidden */
    job_role.addEventListener('change', () =>{

        if (job_role.value === 'other'){
            other_field.style.display = 'block';
        } else {
            other_field.style.display = 'none';
        }

    });

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
                shirt_colors.options[i].style.display = 'block';
            } else {
                shirt_colors.options[i].style.display = 'none';
            }
        };

    });



  });