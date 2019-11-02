$(document).ready(function() {
  $("#search-form").submit(function(event) {
    event.preventDefault();
    let form = event.target;
    $(".display-container").html("");
    $.get(
      form.action,
      {
        category: form.elements.category.value,
        search: form.elements.search.value
      },
      function(data) {
        for (var i = 0; i < data.rows.length; i++) {
          let obj = data.rows[i];
          let img = obj.photo
            ? `<img style="max-width: 100px" src="${obj.photo}">`
            : "<div>NO IMAGE</div>";
          let add =
            "<p>" +
            obj.id +
            " " +
            obj.title +
            " " +
            obj.price +
            " " +
            obj.description +
            " " +
            "</p>";
          let wrap =
            "<div style='border: groove #e2dede 2px; margin: 1%'>" +
            img +
            add +
            "</div>";
          $(".display-container").append(wrap);
        }
      }
    );
  });
});
