define({ "api": [
  {
    "type": "get",
    "url": "/converter/:subject",
    "title": "Return's subject from old PHP version",
    "name": "GetSubject",
    "group": "Subject",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject name (e.g.: rus, math, inf)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Subject",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/api/converter/index.js",
    "groupTitle": "Subject"
  },
  {
    "type": "post",
    "url": "/:id",
    "title": "Return's ID :-)",
    "name": "Echo_ID",
    "group": "root",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>echoe'd ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/api/index.js",
    "groupTitle": "root"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Hello, world!",
    "name": "HelloWorld",
    "group": "root",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello, world!</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/api/index.js",
    "groupTitle": "root"
  }
] });
