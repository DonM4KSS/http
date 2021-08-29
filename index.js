//Подключаем библиотеки
const http = require('http')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
//Указываем параметры подключения
const hostname = 'localhost'
const port = process.env.PORT || 3000 
//создаем сервер
const server = http.createServer((req, res) => {
  //получаем путь к странице
  var filePath = path.join(__dirname, 'pages', req.url === '/' ? 'page.html' : req.url)
  //по расширению определяем содержимое 
  const ext = path.extname(filePath);
  var contentType;
  switch(ext){
    case '.css':
      contentType = 'text/css'
      break
    default:
      contentType = 'text/html'
      break
  }
  //начинаем читать файл
  fs.readFile(filePath, (err, content) =>{
    //если возникла ошибка (например не существующая страница),
    //то выводим страницу ошибки, иначе выводим содержимое страницы
    if(err){
      fs.readFile(path.join(__dirname, 'pages', 'err.html'), (error, errorPage) => {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          })
          res.end(errorPage)
      })
    }else{
      res.writeHead(200,{
        'Content-Type': contentType
      })
      res.end(content)
    }
  })
})
//Выводим в консоль сообщение о запуске
server.listen(port, hostname, () => {
  console.log(chalk.green(`Server running at http://${hostname}:${port}/`))
})