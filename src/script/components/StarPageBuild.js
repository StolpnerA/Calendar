var BuildStartPage = function() {
  var div = document.querySelector("div");
  var CreateDiv = `<div class="container">
            <div class="form-group">
                <label for="usr">Логин:</label>
                <input type="text" class="form-control" id="usr">
            </div>
            <div class="form-group">
                <label for="pwd">Пароль:</label>
                <input type="password" class="form-control" id="pwd">
            </div>
                <button type="button" class="btn btn-large btn-success" id="butAut">Вход</button>
        </div>`;
  div.innerHTML = CreateDiv;
};
export { BuildStartPage };
