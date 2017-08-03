let forms=document.getElementsByTagName('form');
for (let i=0;i<forms.length;i++){
  forms[i].addEventListener('submit',validator)
}

var rules = {
  required: function(el) {
    if (el.value != '') {
      return true;
    }
    return false;
  },
  email: function(el) {
    if (el.value.includes('@ya.ru') ||
      el.value.includes('@yandex.ru') ||
      el.value.includes('@yandex.by') ||
      el.value.includes('@yandex.ua') ||
      el.value.includes('@yandex.kz') ||
      el.value.includes('@yandex.com')) {
      return true
    } else {
      return false
    }
  },
  phone: function(el) {
    var reg = /\d/g;
    let value = el.value.match(reg);
    let sum = findSumma(value);
    if (sum <= 30) {
      return true
    } else {
      return false
    }
  },
  fio: function(el) {
    let array = el.value.split(' ');
    if (array.length !== 3) {
      return true
    } else {
      return false
    }
  }
}

function findSumma(value) {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    sum = sum + parseInt(value[i], 10);
  }
  return sum
}

function showErrors(arr) {
  console.log(arr)
}

function validator(e) {
  let inputs = this.elements;
  let errors = [];
  for (let i = 0; i < inputs.length; i++) {
    let rulesList = rulesList.split(' ');
    for (let j = 0; j < rulesList.length; j++) {
      if (!rules[rulesList[j]](inputs[i])) {
        errors.push({
          name: inputs[i].name,
          error: rulesList[j]
        })
      }
    }
  }
  if (errors.length > 0) {
    e.preventDefault();
    showErrors(errors);
  }
}

/*
(function() {
  console.log('function!!!')
  var MyForm = {

    initialize: function() {
      this.setUpListeners();
    },

    setUpListeners: function() {
      console.log('submit!!!')
      $('#submitButton').click(MyForm.submitForm);
    },

    submitForm: function(e) {
      e.preventDefault();
      console.log('submi22222222')
    }
  }
  MyForm.initialize();

}());



  var MyForm = {

    initialize : function () {
      this.setUpListeners();
    },

    setUpListeners: function () {
      $('form').on('submit', MyForm.submitForm);
      $('form').on('keydown', 'input', MyForm.removeError);
    },

    submitForm: function (e) {
      e.preventDefault();

      var form = $(this),
        submitBtn = form.find('button[type="submit"]');

      if( MyForm.validateForm(form) === false ) return false;

      submitBtn.attr('disabled', 'disabled');

      var str = form.serialize();

      $.ajax({
        url: 'http://localhost:3010/form',
        type: 'POST',
        data: str
      })
        .done(function(msg) {
          if(msg === "OK"){
            var result = "<div = 'bg-success'>Спасибо за заявку! Мы вам перезвоним!</div>"
            form.html(result);
          }else{
            form.html(msg);
          }
        })
        .always(function() {
          submitBtn.removeAttr('disabled');
        });

    },

    validateForm: function (form){
      var inputs = form.find('input'),
        valid = true;
console.log('inputs',inputs)
      inputs.tooltip('destroy');

      $.each(inputs, function(index, val) {
        var input = $(val),
          val = input.val(),
          formGroup = input.parents('.form-group'),
          label = formGroup.find('label').text().toLowerCase(),
          textError = 'Введите ' + label;

        if(val.length === 0){
          formGroup.addClass('has-error').removeClass('has-success');
          input.tooltip({
            trigger: 'manual',
            placement: 'right',
            title: textError
          }).tooltip('show');
          valid = false;
        }else{
          formGroup.addClass('has-success').removeClass('has-error');
        }
      });

      return valid;
    },

    removeError: function () {
      $(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
    }

  }*/