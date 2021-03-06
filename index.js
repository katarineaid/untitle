class MyForm {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.setUpListeners = this.setUpListeners.bind(this);
    this.validate = this.validate.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.submit = this.submit.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  initialize() {
    $("#inputPhone").mask("+7(999)999-99-99");
    this.setUpListeners();
  };

  setUpListeners() {
    $('form').on('submit', this.submit);
    $('form').on('keydown', 'input', this.removeError);
  };

  async submit(e) {
    e.preventDefault();
    let form = $('form');
    console.log('MyForm',MyForm)
    console.log('this',this)
    let submitBtn = form.find('button[type="submit"]');
    let check = this.validate(form)
    if (check.isValid === false) return false;
    submitBtn.attr('disabled', 'disabled');
    let arr = this.getData(form);
    this.setData(arr);
    await renderResponse();

    async function renderResponse() {
      $("#resultContainer").removeClass('bg-success bg-danger bg-info error success progress text');
      let data = await send(form);
      if (data.status === "progress") {
        renderProgress(data);
        setTimeout(async function() {
          await renderResponse()
        }, data.timeout)
      } else {
        renderContainer(data)
      }
    }

    function renderContainer(data) {
      if (data.status === "success") {
        renderSuccess()
      } else {
        renderError(data)
      }
    }

    function renderSuccess() {
      let result = "<p>" + "Success" + "</p>";
      $("#resultContainer").html(result).addClass('bg-success').addClass('success').addClass('text');
    }

    function renderError(data) {
      let result = "<p>" + data.reason + "</p>";
      $("#resultContainer").html(result).addClass('bg-danger').addClass('error').addClass('text');
    }

    function renderProgress(data) {
      let result = "<p>" + data.status + "</p>";
      $("#resultContainer").html(result).addClass('bg-info').addClass('progress ').addClass('text');
    }

    async function send(form) {
      return $.ajax({
        url: form['0'].action,
        type: 'POST',
        dataType: 'json',
        data: form.serialize()
      })
    }
  };

  getData(form) {
    let inputs = form.find('input');
    let arr = {};
    $.each(inputs, function(index, val) {
      let input = $(val);
      let value = input.val();
      let name = input['0'].name;
      Object.assign(arr, {[name]: value})
    });
    return arr;
  };

  setData(arr) {
    let keys = Object.keys(arr);
    keys.map((item) => {
      $('input[name=' + item + ']').val(arr[item]);
    })
  };

  validate(form) {
    let valid = {isValid: true, errorFields: []};
    let inputs = form.find('input');
    inputs.tooltip('destroy');
    let rules = {
      email: function(value) {
        if (value !== '') {
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
        if (value !== '') {
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
        if (value !== '') {
          let array = value.split(' ');
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
        }).tooltip('show');
        valid.isValid = false;
        valid.errorFields.push(id);
      } else {
        $("#" + id).addClass('success').removeClass('error')
      }
    });
    return valid;
  };

  removeError() {
    $(this).tooltip('destroy');
    let id = $(this)['0'].id;
    $("#" + id).removeClass('error');
  };
}

$(document).ready(function() {
  const myForm = new MyForm();
  myForm.initialize();
});