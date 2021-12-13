const charListUL = $("#main #charList");
let charSlider = null;
loadJson("../data/mario.json");
function loadJson(jsondata) {
    $.ajax({
        url: jsondata,
        success: function (res) {
            //console.log(res.items);
            const charList = res.items;
            let output = "";
            $.each(charList, function (idx, item) {
                output += `
                <li class="swiper-slide" style="${item.bg}">
                    <div class="img">
                        <img src="${item.img}">
                    </div>
                    <div class="info">
                        <h2 class="title" data-splitting>${item.title}</h2>
                        <p class="desc" data-splitting>${item.desc}</p>
                        <p class="link" data-splitting><a href="${item.link}" target="${item.target}">MORE</a></p>
                    </div>
                </li>
                `;
            });
            charListUL.html(output);
            if (charSlider !== null) {
                charSlider.destroy();
            }
            //console.log(output);
            charSlider = new Swiper("#main", {
                slidesPerView: "auto",
                loop: true,
                effect: "coverflow",
                centeredSlides: true,
                coverflowEffect: {
                    rotate: 0,
                    slideShadows: false,
                    depth: 1000,
                },
                pagination: {
                    el: "#main .pagination",
                    clickable: true,
                },
                mousewheel: true,
            });
            moveMario("#charList .swiper-slide-active .img");
        },
    });
}
function moveMario(moveItem) {
    gsap.to(moveItem, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 200 - 100,
        duration: Math.random() + 0.5,
        onComplete: moveMario,
        onCompleteParams: [moveItem],
    });
}
//moveMario("#loop");

const gnbList = $("#gnb li");
gnbList.on("click", function (e) {
    e.preventDefault();
    const jsonFile = $(this).data("json");
    if ($(this).hasClass("selected")) return;
    $(this).addClass("selected").siblings("li").removeClass("selected");
    loadJson(jsonFile);
});

//재귀함수(recursion) - 자기 자신을 반복해서 호출하는 함수
function factorial(num) {
    if (num < 1) {
        return 1;
    }
    return num * factorial(num - 1);
}
let result = factorial(5);
console.log(result);
