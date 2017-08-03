(function() {
  var MyForm = {

    initialize: function() {
      $("#inputPhone").mask("+7(999)999-99-99");
      this.setUpListeners();
    },

    setUpListeners: function() {
      $('form').on('submit', MyForm.submitForm);
      $('form').on('keydown', 'input', MyForm.removeError);
    },

    submitForm: function(e) {
      e.preventDefault();
      console.log('submit')
      let form = $(this);
      let submitBtn = form.find('button[type="submit"]');
      let check=MyForm.validate(form)
      if (check.isValid === false) return false;
      submitBtn.attr('disabled', 'disabled');
      let str = form.serialize();
      $.ajax({
        url: 'http://localhost:3010/form',
        type: 'POST',
        dataType:'json',
        data: str
      })
        .done(function(data) {
          console.log('data',data)
          if(data.status === "success"){
            let result = "<p class='text'>"+data.reason+"</p>"
            $("#resultContainer").html(result).addClass('bg-success');
          }else if (data.status === "error") {
            let result = "<p class='text'>"+data.reason+"</p>"
            $("#resultContainer").html(result).addClass('bg-danger');
          }else{
            let result = "<p class='text'>"+data.reason+"</p>"
            $("#resultContainer").html(result).addClass('bg-info');
          }
        })
        .always(function() {
          submitBtn.removeAttr('disabled');
        });
    },
    validate: function(form) {
      let valid = {isValid: true, errorFields: [] };
      let inputs = form.find('input');
      inputs.tooltip('destroy');
      let rules = {
        required: function(value) {
          if (value != '') {
            return true;
          }
          return false;
        },
        email: function(value) {
          if (value != '') {
            if (value.includes('@ya.ru') ||
              value.includes('@yandex.ru') ||
              value.includes('@yandex.by') ||
              value.includes('@yandex.ua') ||
              value.includes('@yandex.kz') ||
              value.includes('@yandex.com')) {
              return {status: true}
            } else {
              return {
                status: false,
                statusText: "Email только в доменах yandex"
              }
            }
          } else {
            return {status: false, statusText: "обязательное поле"}
          }

        },
        phone: function(value) {
          if (value != '') {
            var reg = /\d/g;
            let el = value.match(reg);
            let sum = findSumma(el);
            if (sum <= 30) {
              return {status: true}
            } else {
              return {status: false, statusText: "Cумма всех цифр превышает 30"}
            }
          } else {
            return {status: false, statusText: "обязательное поле"}
          }
        },
        fio: function(value) {
          if (value != '') {
            let array = value.split(' ');
            console.log('array', array.length);
            if (array.length === 3) {
              return {status: true}
            } else {
              return {status: false, statusText: "ФИО: Ровно три слова"}
            }
          } else {
            return {status: false, statusText: "обязательное поле"}
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


      $.each(inputs, function(index, val) {
        let input = $(val);
        let value = input.val();
        let name = input['0'].name;
        let id = input['0'].id;
        let check = rules[name](value);
        if (!check.status) {
          $("#" + id).addClass('error');
          input.tooltip({
            trigger: 'manual',
            placement: 'right',
            title: check.statusText
          }).tooltip('show')
          valid.isValid = false;
          valid.errorFields.push(id);
        } else {
          $("#" + id).addClass('success').removeClass('error')
        }
      });
      return valid;
    },
    removeError: function() {
      $(this).tooltip('destroy');
      let id = $(this)['0'].id;
      $("#" + id).removeClass('error');
    }
  }

  MyForm.initialize();
})()