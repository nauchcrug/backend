###*
# Serialize HTML form to JSON
# @param {HTMLElement} form - Form element
# @return {string} json - JSON string
###
@serialize = (form) ->
  low = (str) -> str.toLowerCase()
  obj = {}
  set = (prop, val) -> @[prop] = val
  if form or low(form.nodeName) isnt 'form'
    for el in form.elements then set.call obj, el.name, switch low(el.nodeName)
      when 'textarea' then el.value
      when 'select' then switch el.type
        when 'select-one' then el.value
        when 'select-multiple' then el.options
      when 'input' then switch el.type
        when 'text', 'password', 'button', 'reset', 'submit' then el.value
        when 'checkbox', 'radio' then el.value
  json = JSON.stringify obj
  json
