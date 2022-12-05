const template = {
  HTML : function (Title, Body)
  {
    return `
    <!doctype html>
    <html>
    <head>
      <title>${Title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${Body}
    </body>
    </html>`;
  },
  

}

module.exports = template;