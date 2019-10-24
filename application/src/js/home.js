$(document).ready(function () {
    $(".dropdown-item").click(function () {
        let content = $(this).text();

        $("#category_btn").html(content);
        $(".display-container").html("");
        switch (content) {
            case "All":
                $.get("/getAll",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        let obj=data[i];
                        let img=`<img style="max-width: 100px" src="${obj.photo}">`
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        let wrap="<div style='border: groove #e2dede 2px; margin: 1%'>" +img + add+"</div>";
                        $(".display-container").append(wrap);
                    }
                })
                break;
            case "Book":
                $.get("/getBook",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        let obj=data[i];
                        let img=`<img style="max-width: 100px" src="${obj.photo}">`
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        let wrap="<div style='border: groove #e2dede 2px; margin: 1%'>" +img + add+"</div>"
                        $(".display-container").append(wrap);
                    }
                })
                break;

            case "Electronics":
                $.get("/getElec",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        let obj=data[i];
                        let img=`<img style="max-width: 100px" src="${obj.photo}">`
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        let wrap="<div style='border: groove #e2dede 2px; margin: 1%'>" +img + add+"</div>"
                        $(".display-container").append(wrap);
                    }
                })
                break;

            case "Furniture":
                $.get("/getFurniture",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        let obj=data[i];
                        let img=`<img style="max-width: 100px" src="${obj.photo}">`
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        let wrap="<div style='border: groove #e2dede 2px; margin: 1%'>" +img + add+"</div>"
                        $(".display-container").append(wrap);
                    }
                })
                break;

            case "Equipment":
                $.get("/getEquipment",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        let obj=data[i];
                        let img=`<img style="max-width: 100px" src="${obj.photo}">`
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        let wrap="<div style='border: groove #e2dede 2px; margin: 1%'>" +img + add+"</div>"
                        $(".display-container").append(wrap);
                    }
                })
                break;

            case "Tutor":
                $.get("/getTutor",{},function (data) {
                    for(var i=0;i<data.length;i++){
                        let obj=data[i];
                        let img=`<img style="max-width: 100px" src="${obj.photo}">`
                        let add="<p>"
                            +obj.id+ " "
                            +obj.title+" "
                            +obj.price+" "
                            +obj.description+" "
                            +"</p>"
                        let wrap="<div style='border: groove #e2dede 2px; margin: 1%'>" +img + add+"</div>"
                        $(".display-container").append(wrap);
                    }
                })
                break;
        }
    })
})