{stringify} = JSON
low = (str) -> str.toLowerCase()

###*
# @param {HTMLElement}
# @return {JSON}
###
@serialize = (form) ->
  obj = {}
  if form or low(form.nodeName) isnt 'form' then for el in form.elements then switch low el.nodeName
    when 'textarea' then obj[el.name] = el.value
    when 'select' then switch el.type
      when 'select-one' then obj[el.name] = el.value
      when 'select-multiple' then obj[el.name] = opt for opt in el.options
    when 'button' then switch el.type
      when 'reset', 'submit', 'button' then obj[el.name] = el.value
    when 'input' then switch el.type
      when 'text', 'hidden', 'password', 'button', 'reset', 'submit' then obj[el.name] = el.value
      when 'checkbox', 'radio' then obj[el.name] = el.value
  stringify obj
