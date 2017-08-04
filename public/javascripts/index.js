(function() {
  var MyForm = {

    initialize: function() {
      $("#inputPhone").mask("+7(999)999-99-99");
      this.setUpListeners();
    },

    setUpListeners: function() {
      $('form').on('submit', MyForm.submit);
      $('form').on('keydown', 'input', MyForm.removeError);
    },

    submit: async function(e) {
      e.preventDefault();
      let form = $(this);
      let submitBtn = form.find('button[type="submit"]');
      let check = MyForm.validate(form)
      if (check.isValid === false) return false;
      submitBtn.attr('disabled', 'disabled');
      let str = MyForm.getData(form);
      await test();
      async function test(){
        $("#resultContainer").removeClass('bg-success bg-danger bg-info error success progress text');
        let data = await send(form);
        if (data.status === "progress") {
          renderProgress(data);
          setTimeout(async function() {
            await test()
          },data.timeout)
        }
        renderContainer(data);
      }
      function renderContainer(data){
        if (data.status === "success") {
          renderSuccess(data)
        } else {
          renderError(data)
        }
      }

      function renderSuccess(data){
        let result = "<p>" + data.reason + "</p>";
        $("#resultContainer").html(result).addClass('bg-success').addClass('success').addClass('text');
      }
      function renderError(data){
        let result = "<p>" + data.reason + "</p>";
        $("#resultContainer").html(result).addClass('bg-danger').addClass('error').addClass('text');
      }
      function renderProgress(data) {
        let result = "<p>" + data.reason + "</p>";
        $("#resultContainer").html(result).addClass('bg-info').addClass('progress ').addClass('text');
      }

      async function send(form) {
        return $.ajax({
          url: form['0'].action,
          type: 'POST',
          dataType: 'json',
          data: str
        })
      }
    },
    getData:function (form){
      return form.serialize();
    },
    setData:function(){

    },
    validate: function(form) {
      let valid = {isValid: true, errorFields: []};
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