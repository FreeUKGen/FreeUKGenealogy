  function check(){
    var modal = document.getElementById('sproutform-modal');
    modal.style.display = "block";
    return true;
  }

  function initCsrf() {
    window.csrfTokenName = "{{ craft.config.csrfTokenName|e('js') }}";
    window.csrfTokenValue = "{{ craft.request.csrfToken|e('js') }}";
  };