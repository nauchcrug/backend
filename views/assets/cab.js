const tinymceConfig = {
  selector: 'textarea',
  height: 200,
  setup: editor => editor.on('change', () => editor.save()),
  theme: 'modern',
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools'
  ]
};

document.addEventListener('readystatechange', ev => {
  if (document.readyState === 'complete') {
    tinymce.init(tinymceConfig);
  }
});

window.addEventListener('DOMContentLoaded', ev => {
  Pace.restart();
});
