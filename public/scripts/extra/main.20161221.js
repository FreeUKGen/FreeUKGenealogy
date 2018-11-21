  function check(){
    var addresstext = document.getElementById('address').value;

    if (addresstext) {
      document.getElementById('address').value = "use backspace to delete all text in this field";
      document.getElementById('address').focus();
      return false;
    } else {
      var modal = document.getElementById('sproutform-modal');
      modal.style.display = "block";
      return true;
    }
  }

  function loadform() {
    var now = new Date();
    var utc_now = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    document.getElementById('expiredate').setAttribute('value', utc_now);
  };

  function initCsrf() {
    window.csrfTokenName = "{{ craft.config.csrfTokenName|e('js') }}";
    window.csrfTokenValue = "{{ craft.request.csrfToken|e('js') }}";
  };