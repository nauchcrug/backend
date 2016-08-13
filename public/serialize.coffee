###*
# @param {HTMLElement}
# @return {JSON}
###
@serialize = (form) ->
  {stringify} = JSON
  low = (str) -> str.toLowerCase()
  obj = {}
  setKey = (key, val) -> obj[key] = val
  if form or low(form.nodeName) isnt 'form'
    for el in form.elements
      {name, value} = el
      switch low el.nodeName
        when 'textarea'
          setKey name, value
        when 'select' then switch el.type
          when 'select-one'
            setKey el
          when 'select-multiple'
            #obj[el.name] = opt for opt in el.options
            value = opt for opt in el.options
            setKey name, value
        when 'input' then switch el.type
          when 'text', 'password', 'button', 'reset', 'submit'
            setKey name, value
          when 'checkbox', 'radio'
            setKey name, el.checked
          #when 'file'
          #  data = base64encode file
          #  setKey name, data
  json = stringify obj
  json
