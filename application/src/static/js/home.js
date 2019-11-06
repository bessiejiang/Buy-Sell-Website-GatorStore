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
          let img = `<img src="${obj.photo}" class="img-fluid card-img-top" />`;
          let cardBody =
            "<div class='card-body'>" +
            "<h5 class='card-title text-center'>" +
            `<p><a href="item/${obj.id}" target="_blank">${obj.title}</a></p>` +
            "</h5>" +
            "</div>";
          let add =
            "<div class='card'>" +
            "<h4 style='background: white;' class='position-absolute'>" +
            `${obj.price}` +
            "</h4>" +
            "<div>" +
            img;
          "</div>" + "</div>";
          let wrap =
            "<div class='col-md-4 col-sm-6 col-12'>" +
            add +
            cardBody +
            "</div>";
         $(".display-container").append(wrap);
        }
      }
    );
  });
});
