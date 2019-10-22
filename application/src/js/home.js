$(document).ready(function () {
    $(".dropdown-item").click(function () {
        let content = $(this).text();

        $("#category_btn").html(content);

        switch (content) {
            case "All":
                $.get("/getAll",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        const obj=data[i];
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        $(".display-container").append(add);
                    }
                })
        }

    })

})