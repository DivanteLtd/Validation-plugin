(function($) {

    // set plugin options
    var options = {
        debugMode : false // true or false
    };

    // create main validators container
    var formValidators = {};

    // get all form id's on a page, push to array
    var forms = [];

    $.fn.onlyDigits = function() {
        $(this).keyup(function () {
            this.value = this.value.replace(/[^0-9\.]/g,'');
        });
    };

    // get all form id's on a page, push to array
    $('form').each(function (id, form) {
        if ($(form).attr('id') !== undefined) {
            forms.push($(form).attr('id'));
        }
    });

    // use id's, to loop through inputs for each form
    for (var i = 0; i < forms.length; i++) {
        // create form selector
        var selector = '#' + forms[i];

        // create rules object for rules and messages
        var rulesObj = {debug: options.debugMode, rules: {}, messages: {}};

        // print debug info
        if (rulesObj.debug === true) {
            console.log(forms);
            console.log(selector);
        }

        // get all inputs in a form and parse them for rules
        $(selector + ' *').filter('input, select, textarea').each(function (index, elem) {

            // skip all inputs without a name
            if ($(elem).attr('name') !== undefined) {

                // create easy shortcut for input name
                var name = $(elem).attr('name');

                // print debug info
                if (rulesObj.debug === true) {
                    console.log(name);
                    console.log(elem);
                }

                // BASIC SETUP
                // basic setup, create rules and messages objects
                if (rulesObj.rules[name] === undefined) {
                    rulesObj.rules[name] = {};
                    rulesObj.messages[name] = {};
                }

                // VALIDATION RULES & MESSAGES BASED ON RULES
                // required field default rule
                if ($(elem).attr('required') !== undefined) {
                    rulesObj.rules[name].required = true;
                    rulesObj.messages[name].required = ($(elem).attr('msg-req') !== undefined) ? $(elem).attr('msg-req') : 'To pole jest wymagane.';
                }

                // alnum - alphanumeric
                if ($(elem).attr('data-type') === 'alnum') {
                    rulesObj.rules[name].pattern = /^[a-zA-Z0-9]+$/;
                    rulesObj.messages[name].pattern = 'Możesz użyć znaków alfabetu oraz cyfr.';
                }

                // alpha - alphabetic
                if ($(elem).attr('data-type') === 'alpha') {
                    rulesObj.rules[name].pattern = /^[a-zA-Z]+$/;
                    rulesObj.messages[name].pattern = 'Wprowadź wyłącznie litery.'
                }

                // postcode
                if ($(elem).attr('data-type') === 'postcode') {
                    rulesObj.rules[name].pattern = /^[0-9\-\s]+$/;
                    rulesObj.rules[name].minlength = 6;
                    rulesObj.messages[name].minlength = 'Wprowadź 5 liczb kodu pocztowego.';
                    rulesObj.messages[name].pattern = 'Podany format kodu jest nieprawidłowy. Spróbuj ponownie.';
                }

                // strlen max
                if ($(elem).attr('data-strlen-max') !== undefined) {
                    rulesObj.rules[name].maxlength = parseInt($(elem).attr('data-strlen-max'));
                    rulesObj.messages[name].maxlength = 'Wprowadź maksymalnie {0} znaków.';
                }

                // strlen mix
                if ($(elem).attr('data-strlen-min') !== undefined) {
                    rulesObj.rules[name].minlength = parseInt($(elem).attr('data-strlen-min'));
                    rulesObj.messages[name].minlength = 'Wprowadź co najmniej {0} znaków.'
                }

                // digits only
                if ($(elem).attr('data-type') === 'digit') {
                    rulesObj.rules[name].number = true;
                    rulesObj.messages[name].number = 'Wprowadź wyłącznie cyfry.';
                    ($(elem).attr('data-no-filter') !== undefined) ? $(this) : $(this).onlyDigits();
                }

                // regex
                if ($(elem).attr('data-regex') !== undefined) {
                    rulesObj.rules[name].pattern = new RegExp($(elem).attr('data-regex'));
                    rulesObj.messages[name].pattern = 'Niepoprawne dane.'
                }

                // value-range
                if ($(elem).attr('data-value-min') !== undefined || $(elem).attr('data-value-max') !== undefined) {
                    rulesObj.rules[name].range = [
                        ($(elem).attr('data-value-min') !== undefined) ? parseInt($(elem).attr('data-value-min')) : 0,
                        ($(elem).attr('data-value-max') !== undefined) ? parseInt($(elem).attr('data-value-max')) : 9999
                    ];
                    rulesObj.messages[name].range = 'Wprowadź wartość pomiędzy {0} a {1}.';
                    if ($(elem).attr('msg-range') !== undefined) {
                        rulesObj.messages[name].range = $(elem).attr('msg-range');
                    }
                }

                // EMAIL & CHECKBOX
                // email default messages
                if ($(elem).attr('type') === 'email') {
                    //rulesObj.rules[name].required = true;
                    //rulesObj.rules[name].email = true;
                    rulesObj.messages[name].required = 'Uzupełnij adres e-mail.';
                    rulesObj.messages[name].emailCustom = true;
                }

                // checkbox default required message
                if ($(elem).attr('type') === 'checkbox') {
                    //rulesObj.rules[name].required = true;
                    rulesObj.messages[name].required = 'Zaznacz wybór.';

                    //if($(elem.attr('max-answers') !== undefined)) {
                        rulesObj.rules[name].multiCheck = true;
                    //}
                }

                // pesel
                if ($(elem).attr('name').match(/pesel/i)) {
                    rulesObj.rules[name].pesel = true;
                    $(this).onlyDigits();
                }

                // nip
                if ($(elem).attr('name').match(/nip/i)) {
                    rulesObj.rules[name].nip = true;
                    $(this).onlyDigits();
                }

                // regon
                if ($(elem).attr('name').match(/regon/i)) {
                    rulesObj.rules[name].regon = true;
                    $(this).onlyDigits();
                }

                // select default required message
                if ($(elem).is('select')) {
                    rulesObj.rules[name].selectVisible = true;
                }

                // CUSTOM ERROR MESSAGES
                // custom required message
                if ($(elem).attr('msg-req') !== undefined) {
                    rulesObj.messages[name].required = $(elem).attr('msg-req');
                }

                // custom error message
                if ($(elem).attr('msg-error') !== undefined) {
                    rulesObj.messages[name][name] = $(elem).attr('msg-error');
                    $.each(rulesObj.messages[name], function (key, message) {
                        if (key !== 'required') {
                            rulesObj.messages[name][key] = $(elem).attr('msg-error');
                        }
                    });
                }
            }

        }); // end inputs loop

        // set error message container element
        rulesObj.errorElement = 'div';
        // rulesObj.errorLabelContainer = 'label';

        // Selectric specific setup and hidden inputs with class check-it
        rulesObj.ignore = '.selectricInput, :hidden:not(select, input.check-it), [visible-select="false"]';
        rulesObj.errorPlacement = function (error, element) {
            // check if element has Selectric initialized on it
            var data = element.data('selectric');
            error.appendTo(data ? element.closest('.' + data.classes.wrapper).parent() : element.parent());

            //If element is a checkbox than append error to parent
            if (element.type === "checkbox" || element.hasClass('iCheck')) {
                error.appendTo(parent);
            }
        };
        rulesObj.highlight = function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass); // default functionality
            if ($(element).is('select')) {
                $(element).parents('.selectricWrapper').find('.selectric').addClass('selectric-error');
            } // for Selectric
        };
        rulesObj.unhighlight = function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass); // default functionality
            if ($(element).is('select')) {
                $(element).parents('.selectricWrapper').find('.selectric').removeClass('selectric-error');
            } // for Selectric
        }

        // do something on successful submit
        rulesObj.submitHandler = function (form) {

            // get additional info what to do when submitting the form
            if ($(form).attr('data-onsubmit') !== undefined) {
                eval($(form).attr('data-onsubmit'));
            }

            // print debug info on submit
            if (rulesObj.debug === true) {
                if ($('.success-msg', form).length === 0) {
                    $(form).append('<span class="success-msg" style="display:none;">Debug info: Formularz wysłany!</span>');
                }
                $('.success-msg', form).fadeIn(200).delay(5000).fadeOut(200);
            }

            if ($(form).attr('ajax') == 'true') {
                $('.ajax--loader').show();
                $.ajax({
                    type: $(form).attr('method'),
                    url: $(form).attr('action'),
                    data: $(form).serialize(),
                    dataType: 'json'
                }).done(function (msg) {
                    $('.ajax--loader').hide();
                    if (msg.info) {
                        if (msg.info == true && msg.path != '') {
                            // window.location.replace(msg.path);
                            return false;
                        }
                        sweetAlert("Informacja", msg.info);
                    } else if (msg.error) {
                        sweetAlert("Błąd", msg.error, "error");
                    }
                });
                return false;
            } else if ($(form).attr('ajaxthis') == 'true') { }
            else {
                form.submit();
            }

        };

        // create validator object, passing created rulesObj
        formValidators[selector] = $(selector).validate(rulesObj);

        $(document).on('blur', 'input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"], textarea', function() {
            if($(this).parents('form').length) {
                var val = $(this).val();
                $(this).val(val.replace(/\s*$/,''));
                $(this).valid();
            }
        });

        $(document).on('change', 'select, input[type="checkbox"], input[type="radio"]', function() {
            if($(this).parents('form').length) {
                $(this).valid();
            }
        });

        // print debug info
        if (rulesObj.debug === true) {
            // console.log(rulesObj);
            console.log(formValidators);
        }
    }

})(jQuery);