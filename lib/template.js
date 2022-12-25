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
  
  list_up : function (File_list)
  {
    let List = '<ul>';
    for(const item of File_list)
    {
      List += `<li><a href="/page/${item.title}">${item.title}</a></li>`;
    }
    List += '</ul>';
  
    return List;
  },
  
  table : function(Table){
    let tb = `<table>`;
    for(const item of Table)
    {
      tb += `
      <tr>
        <td>${item.ID}</td>
        <td>${item.Email}</td>
        <td>${item.Phone_Head} - ${item.Phone_Mid} - ${item.Phone_Tail}</td>
        <td><a href ="/admin/update?id=${item.ID}">update</td>
      </tr>`;
    }
    tb += `</table>`;
  
    let style = `
    <style>
    table{border-collapse : collapse;}
    td{border: 1px solid black;}
    </style>`
  
    return tb + style;
  }
}

module.exports = template;