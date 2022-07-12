let enbuyuklength = 0;

function get_element_noron_id(id) {
    for (let kat of document.getElementsByClassName("katman")) {
        for (let i of kat.children) {

            if (i.getAttribute("noron_id") == id) {
                return i;
            }
        }
    }
    return 0
}
var interler = [];

function hersey() {

    for (let inter of interler) {
        document.getElementById("epoch").removeAttribute('disabled');
        document.getElementById("ogret").removeAttribute('disabled');
        clearInterval(inter);
    }

    for (let i of modelim.katmanlar) {
        if (i.length > enbuyuklength) {
            enbuyuklength = i.length
        }
        if (i.length > 10) {
            enbuyuklength = 10;
            break;
        }
    }



    var katman_divler = [];
    let eskihtml = ""
    for (let kj = 0; kj < modelim.katmanlar.length; kj++) {
        let i = modelim.katmanlar[kj];
        let katman_div = document.createElement("div");

        katman_div.className = "katman";
        if (i.length < 11) {
            for (let a = 0; a < i.length; a++) {
                let noron_div = document.createElement("div");
                noron_div.className = "noron";

                noron_div.innerHTML = i[a].z.toString().substring(0, 5);


                let renk = 255 - ((i[a].z * 255));
                let frenk = 255 - (255 - ((i[a].z * 255)))
                if (i[a].z > 0.3 && i[a].z < 0.7) {
                    frenk = 255
                }
                noron_div.style.backgroundColor = "rgb(" + renk.toString() + "," + renk.toString() + "," + renk.toString() + ")";
                noron_div.style.color = "rgb(" + frenk.toString() + "," + frenk.toString() + "," + frenk.toString() + ")";
                noron_div.id = a;
                noron_div.setAttribute("noron_id", i[a].id);

                katman_div.appendChild(noron_div);
            }
        } else {
            for (let a = 0; a < 11; a++) {
                if (a == 5) {
                    let yuvarlak = document.createElement("div");
                    yuvarlak.className = "nokta";
                    yuvarlak.innerHTML = "+" + (i.length - 10)
                    katman_div.appendChild(yuvarlak);

                } else {
                    let noron_div = document.createElement("div");
                    noron_div.className = "noron";

                    noron_div.innerHTML = i[a].z.toString().substring(0, 5);
                    let renk = 255 - ((i[a].z * 255));
                    let frenk = 255 - (255 - ((i[a].z * 255)))
                    if (i[a].z > 0.3 && i[a].z < 0.7) {
                        frenk = 255
                    }

                    noron_div.style.backgroundColor = "rgb(" + renk.toString() + "," + renk.toString() + "," + renk.toString() + ")";
                    noron_div.style.color = "rgb(" + frenk.toString() + "," + frenk.toString() + "," + frenk.toString() + ")";
                    noron_div.id = a;

                    noron_div.setAttribute("noron_id", i[a].id);

                    katman_div.appendChild(noron_div);
                }
            }
        }
        let span = document.createElement("span");

        if (kj == 0) {
            span.innerText = "Giriş Katmanı"
        }
        if (kj != 0 && kj != modelim.katmanlar.length) {
            span.innerText = "Ara Katman"
        }
        if (kj == modelim.katmanlar.length - 1) {
            span.innerText = "Çıkış Katmanı\n (Model Çıktısı)"
        }
        let enbuyuk_width = enbuyuklength * 50
        let padding = (enbuyuk_width - (i.length * 50)) / 2
        katman_div.appendChild(span)
        katman_div.style.paddingTop = padding.toString() + "px";
        document.getElementById("model").appendChild(katman_div)
        katman_divler.push(katman_div);
    }
    eskihtml = document.getElementById("model").innerHTML;
}
/*  
for (let kj = 0; kj < document.getElementsByClassName("katman").length - 1; kj++) {
    let katman = document.getElementsByClassName("katman")[kj];
    let skatman = document.getElementsByClassName("katman")[kj + 1];
    for (let nor of katman.children) {
        if (nor.id != "") {

            let ind = 0;
            for (let snor of skatman.children) {
                if (snor.id != "") {
                    let div = document.createElement("div");
                    div.className = "cizgi";
                    div.style.left = (nor.offsetLeft + (50 - (ind * (50 / skatman.children.length))) - 25) + "px";
                    if (katman.children.length < skatman.children.length) {
                        console.log(skatman.children.length)
                        div.style.top = (snor.offsetTop + 25 + (50 - (ind * (50 / skatman.children.length)))) + "px";
                    } else {
                        div.style.top = (nor.offsetTop + 25) + "px";

                    }
                    div.style.width = (Math.sqrt(Math.pow(Math.abs(snor.offsetLeft - nor.offsetLeft), 2), Math.pow(Math.abs(snor.offsetTop - nor.offsetTop), 2)) + (50 - (ind * (50 / skatman.children.length)))) + "px"
                    div.style.height = "3px";

                    var dx = snor.offsetLeft - nor.offsetLeft
                    var dy = snor.offsetTop - nor.offsetTop
                    var ang = Math.atan2(dy, dx) * 180 / Math.PI;
                    div.style.transform = "rotate(" + (ang + 1.90915) + "deg)";
                    document.getElementById("model").appendChild(div);
                }
            }
        }
    }
}*/

function yap() {
    if (document.getElementById("inp").value.trim() != "") {
        if (parseFloat(document.getElementById("inp").value).toString() != 'NaN') {
            if (parseFloat(document.getElementById("inp").value) > 0.999999 || parseFloat(document.getElementById("inp").value) < -0.999999) {
                konsole_Write("Hata: Girilen değer -1 ile 1 aralığında olmalıdır.")
            } else {
                modelim.set_data([parseFloat(document.getElementById("inp").value)])

                for (let kj = 0; kj < modelim.katmanlar.length; kj++) {
                    for (let kn = 0; kn < document.getElementsByClassName("katman")[kj].children.length - 1; kn++) {
                        if (document.getElementsByClassName("katman")[kj].children[kn].id != "") {
                            let noron = modelim.katmanlar[kj][parseInt(document.getElementsByClassName("katman")[kj].children[kn].id)];
                            document.getElementsByClassName("katman")[kj].children[kn].innerText = noron.z.toString().substring(0, 5);
                            let renk = 255 - ((noron.z * 255));
                            let frenk = 255 - (255 - ((noron.z * 255)))
                            if (noron.z > 0.3 && noron.z < 0.7) {
                                frenk = 255
                            }
                            document.getElementsByClassName("katman")[kj].children[kn].style.backgroundColor = "rgb(" + renk.toString() + "," + renk.toString() + "," + renk.toString() + ")";
                            document.getElementsByClassName("katman")[kj].children[kn].style.color = "rgb(" + frenk.toString() + "," + frenk.toString() + "," + frenk.toString() + ")";
                        }
                    }
                }
                let x = parseFloat(document.getElementById("inp").value);
                let y = 0.5 * (x * x) + (0.5 * x);
                document.getElementById("konsol2").innerHTML = ""
                konsole_Write(" --------- Model Sonu&ccedil;ları ---------")
                konsole_Write("Sonu&ccedil;: " + y);
                konsole_Write("Model &ccedil;ıktısı: " + modelim.cikis_katmani()[0].z);
                konsole_Write("Model başarısı: " + (1 - Math.abs(modelim.cikis_katmani()[0].z - y)));
                konsole_Write("Model hatası: " + (0.5 * Math.pow(modelim.cikis_katmani()[0].z - y, 2)));

            }
        } else {
            konsole_Write("Hata: Girilen değer bir sayı değil")
        }
    }
}

document.getElementById("konsol").innerHTML += '<span style="">' + "</span><br>"

function konsole_Write(mesaj) {
    if (mesaj.substring(0, 4) == "Hata") {

        document.getElementById("konsol2").innerHTML += '<span style="background-color:rgb(200,0,0);padding:5px 10px;color:White;margin-top:-5px;margin-left:-5px;">' + mesaj + "</span><br><br>"
    } else {
        document.getElementById("konsol2").innerHTML += mesaj + "<br>"
    }
}

function agirliklari_Yansit() {
    for (let i = 0; i < document.getElementsByClassName("katman").length; i++) {
        for (let nor of document.getElementsByClassName("katman")[i].children) {
            if (nor.id != "") {
                nor.innerHTML = modelim.katmanlar[i][parseInt(nor.id)].z.toString().substring(0, 5);
            }
        }
    }
    agirliklari_goster();
    document.getElementById("model_arka").setAttribute("width", (document.getElementById("model").offsetWidth - 20) + "px");
    document.getElementById("model_arka").setAttribute("height", (document.getElementById("model").offsetHeight + 200) + "px");
    var c = document.getElementById("model_arka");
    var ctx = c.getContext("2d");

    for (let kj = 0; kj < document.getElementsByClassName("katman").length - 1; kj++) {
        let katman = document.getElementsByClassName("katman")[kj];
        let skatman = document.getElementsByClassName("katman")[kj + 1];
        for (let nor of katman.children) {
            if (nor.id != "") {
                let z = parseFloat(nor.innerHTML);
                let renk = 255 - ((z * 255));
                let frenk = 255 - (255 - ((z * 255)))
                if (z > 0.3 && z < 0.7) {
                    frenk = 255
                }
                nor.style.backgroundColor = "rgb(" + renk.toString() + "," + renk.toString() + "," + renk.toString() + ")";
                nor.style.color = "rgb(" + frenk.toString() + "," + frenk.toString() + "," + frenk.toString() + ")";
                for (let snor of skatman.children) {
                    if (snor.id != "") {

                        let rect = nor.getBoundingClientRect();
                        let rect2 = snor.getBoundingClientRect();
                        ctx.beginPath();
                        let derece = modelim.agirliklar[modelim.katmanlar[kj][parseInt(nor.id)].id][modelim.katmanlar[kj + 1][parseInt(snor.id)].id] * 255;
                        ctx.lineWidth = 2 + ((derece / 255) * 2);
                        //ctx.lineWidth = 3;
                        if (derece < 0) {
                            ctx.strokeStyle = "rgba(" + 255 + ",0,0," + (Math.abs(derece) / 255) + ")"
                        } else {
                            ctx.strokeStyle = "rgba(0," + 255 + ",0," + (Math.abs(derece) / 255) + ")"
                        }
                        /*
                            noron_div.style.backgroundColor = "rgb(" + renk.toString() + "," + renk.toString() + "," + renk.toString() + ")";
                            noron_div.style.color = "rgb(" + frenk.toString() + "," + frenk.toString() + "," + frenk.toString() + ")";
              
                        */
                        ctx.moveTo(nor.offsetLeft, nor.offsetTop + 100);

                        ctx.lineTo(snor.offsetLeft, snor.offsetTop + 100);

                        ctx.stroke();
                        ctx.closePath();

                    }
                }
            }
        }
    }

}


function agirliklari_Yansit2() {
    for (let i = 0; i < document.getElementsByClassName("katman").length; i++) {
        for (let nor of document.getElementsByClassName("katman")[i].children) {
            if (nor.id != "") {
                nor.innerHTML = modelim.katmanlar[i][parseInt(nor.id)].z.toString().substring(0, 5);
            }
        }
    }
    agirliklari_goster();


    for (let kj = 0; kj < document.getElementsByClassName("katman").length - 1; kj++) {
        let katman = document.getElementsByClassName("katman")[kj];
        let skatman = document.getElementsByClassName("katman")[kj + 1];
        for (let nor of katman.children) {
            if (nor.id != "") {
                for (let snor of skatman.children) {
                    if (snor.id != "") {

                        let yuvarlak = document.createElement("div");
                        yuvarlak.className = "efekt";
                        yuvarlak.style.left = nor.offsetLeft + "px"
                        yuvarlak.style.top = (nor.offsetTop + 120) + "px";
                        document.body.appendChild(yuvarlak);
                        let left = nor.offsetLeft;
                        let top = nor.offsetTop + 120;
                        let ind = 0;
                        let derece = modelim.agirliklar[modelim.katmanlar[kj][parseInt(nor.id)].id][modelim.katmanlar[kj + 1][parseInt(snor.id)].id] * 255;
                        if (derece < 0) {
                            yuvarlak.style.backgroundColor = "rgba(" + 255 + ",0,0," + (Math.abs(derece) / 255) + ")"
                            yuvarlak.style.borderColor = "rgba(" + 255 + ",0,0," + (Math.abs(derece) / 255) + ")";
                        } else {
                            yuvarlak.style.borderColor = "rgba(0," + 255 + ",0," + (Math.abs(derece) / 255) + ")"
                            yuvarlak.style.backgroundColor = "rgba(0," + 255 + ",0," + (Math.abs(derece) / 255) + ")"
                        }
                        let inj = setInterval(() => {
                            left -= (nor.offsetLeft - snor.offsetLeft) / 20;
                            top -= (nor.offsetTop - snor.offsetTop) / 20;
                            ind += 1;
                            yuvarlak.style.left = left + "px"
                            yuvarlak.style.top = top + "px"

                            if (ind > 20) {
                                document.body.removeChild(yuvarlak)
                                clearInterval(inj);
                            }
                        }, 10);
                    }
                }
            }
        }
    }


}
var toplam_epoch = 0;
var labelsg = [0];
var basarilar = [0];
var hatalar = [0];
document.getElementById("ogret").onclick = function () {
    if (document.getElementById("epoch").value.trim() != "") {
        let epoch = Math.abs(parseInt(document.getElementById("epoch").value));
        let ind = 0;
        let x = xler[0];
        let y = yler[0];
        document.getElementById("epoch").setAttribute('disabled', '');
        document.getElementById("ogret").setAttribute('disabled', '');
        var inter = setInterval(() => {
            if (interler.length == 0) {
                interler.push(inter);
            }
            modelim.fit(xler, yler);
            modelim.set_data(xler[0])
            if (ind % 10 == 0) {
                agirliklari_Yansit();
            }
            toplam_epoch += 1;
            document.getElementById("konsol").innerHTML = "Sonu&ccedil;: " + y + "<br>Model &ccedil;ıktısı: " + modelim.cikis_katmani()[0].z + "<br>" + "Model başarısı: " + (1 - Math.abs(modelim.cikis_katmani()[0].z - y)) + "<br>" + "Model hatası: " + (0.5 * Math.pow(modelim.cikis_katmani()[0].z - y, 2)) + "<br>Toplam epoch: " + toplam_epoch.toString() + "<br>Model Skoru: " + modelim.score(xler, yler);

            if (ind % parseInt((epoch / 10).toString()) == 0) {
                labelsg.push((toplam_epoch - 1).toString());
                basarilar.push(modelim.score(xler, yler))
                hatalar.push((0.5 * Math.pow(modelim.cikis_katmani()[0].z - y, 2)));


                chart_yap();
            }
            ind += 1;
            if (ind > epoch - 1) {
                document.getElementById("epoch").removeAttribute('disabled');
                document.getElementById("ogret").removeAttribute('disabled');

                clearInterval(inter);
            }

        }, (10));
    } else {
        alert("Lütfen bir değer giriniz");
    }

}

document.getElementById("inp").onkeydown = function (e) {
    if (e.key == "Enter") {
        yap(); agirliklari_Yansit(); agirliklari_Yansit2();
        document.getElementById("inp").value = "";
        document.getElementById("inp").setAttribute("disabled", "");
        setTimeout(() => {
            document.getElementById("inp").removeAttribute("disabled");

        }, modelim.katmanlar.length * 220);
    }
}
hersey();
agirliklari_Yansit()
//agirliklari_Yansit2()
window.onresize = function () {
    agirliklari_Yansit();

}

function alt_katman_goster() {
    for (let i = 0; i < modelim.katmanlar.length; i++) {
        let katman_div = document.createElement("div");
        katman_div.className = "sembol_katman";
        let enbuyuk_lg = (enbuyuklength) * 20;
        katman_div.style.height = ((modelim.katmanlar[i].length) * 20) + "px";
        if (modelim.katmanlar[i].length >= enbuyuklength == false) {
            katman_div.style.marginTop = ((enbuyuk_lg - ((modelim.katmanlar[i].length) * 20)) / 2) + "px";
        }
        let span = document.createElement("input");
        span.value = modelim.katmanlar[i].length
        span.onkeydown = function () {
            clearInterval(inter);
        }
        span.onchange = function () {
            uygula();

        }
        span.onkeyup = function () {
            var inter = setTimeout(() => {
                uygula();
            }, 500);
        }
        katman_div.appendChild(span)
        if (i == 0 || i == modelim.katmanlar.length - 1) {
            span.setAttribute("disabled", '')
        }
        span.setAttribute("type", 'number')
        span.setAttribute("pattern", '[1-64]')

        document.getElementById("katmans").appendChild(katman_div);
    }
}

function chart_yap() {
    config = {
        type: 'line',

        data: {
            labels: labelsg,
            datasets: [{
                label: 'Score',
                backgroundColor: "green",
                borderColor: "green",
                data: basarilar,
                fill: false,
                ineTension: 0,
            }, {
                label: 'hata',
                fill: false,
                backgroundColor: "red",
                borderColor: "red",
                data: hatalar,
                ineTension: 0,
            }

            ]
        },
        options: {

            responsive: true,
            title: {
                display: true,
                text: 'Model Grafiği'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },

        }
    };
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
}

function katman_ekle() {
    if (js_icin_katmanlar.length != 8) {

        document.getElementById("katmans").innerHTML = ""
        js_icin_katmanlar.pop();
        js_icin_katmanlar.push(16);
        js_icin_katmanlar.push(1);
        modelim = new model_DL(katmans = js_icin_katmanlar, labda = 0.6);
        modelim.recognize();
        document.getElementById("model").innerHTML = ' <canvas id="model_arka" stroke="red"></canvas> <canvas id="model_arka2" stroke="red"></canvas>';
        modelim.set_data(xler[0])
        labelsg = [0];
        basarilar = [0];
        hatalar = [0];
        document.getElementById("konsol").innerHTML = "Model yeniden yapılandırıldı.";
        chart_yap();
        hersey();
        alt_katman_goster();
        agirliklari_Yansit();
    }
}

function katman_cikar() {
    if (js_icin_katmanlar.length != 3) {
        document.getElementById("katmans").innerHTML = ""

        js_icin_katmanlar.pop();
        js_icin_katmanlar.pop();
        js_icin_katmanlar.push(1);
        modelim = new model_DL(katmans = js_icin_katmanlar, labda = 0.6);
        modelim.recognize();
        document.getElementById("model").innerHTML = ' <canvas id="model_arka" stroke="red"></canvas> <canvas id="model_arka2" stroke="red"></canvas>';
        modelim.set_data(xler[0])
        labelsg = [0];
        basarilar = [0];
        hatalar = [0];
        document.getElementById("konsol").innerHTML = "Model yeniden yapılandırıldı.";
        chart_yap()
        hersey();
        alt_katman_goster();
        agirliklari_Yansit();
    }
}

function uygula() {
    js_icin_katmanlar = []
    for (let i of document.getElementsByClassName("sembol_katman")) {
        console.log(i, i.children)
        js_icin_katmanlar.push(parseInt(i.children[0].value))
    }
    document.getElementById("katmans").innerHTML = ""

    document.getElementById("konsol").innerHTML = "Model yeniden yapılandırıldı.";
    modelim = new model_DL(katmans = js_icin_katmanlar, labda = 0.6);
    modelim.recognize();
    document.getElementById("model").innerHTML = ' <canvas id="model_arka" stroke="red"></canvas> <canvas id="model_arka2" stroke="red"></canvas>';
    modelim.set_data(xler[0])
    labelsg = [0];
    basarilar = [0];
    hatalar = [0];
    chart_yap();
    hersey();
    alt_katman_goster();
    agirliklari_Yansit();
}
alt_katman_goster()


agirliklari_goster();


function agirliklari_goster() {
    document.getElementById("agirliklar_panel").innerHTML = "";

    var c = document.getElementById("model_arka2");
    var ctx = c.getContext("2d");
    for (let i = 0; i < modelim.katmanlar.length - 1; i++) {
        let katman = modelim.katmanlar[i];
        let skatman = modelim.katmanlar[i + 1];
        for (let nor of katman) {
            for (let snor of skatman) {
                if (get_element_noron_id(snor.id) != 0) {
                    if (get_element_noron_id(nor.id) != 0) {

                        let agirlik_button = document.createElement("button");
                        agirlik_button.innerHTML = modelim.agirliklar[nor.id][snor.id].toString().substring(0, 10);
                        let z = modelim.agirliklar[nor.id][snor.id];
                        let renk = 255 - ((z * 255));
                        let frenk = 255 - (255 - ((z * 255)))
                        if (z > 0.3 && z < 0.7) {
                            frenk = 255
                        }
                        let derece = z * 255;
                        let wit = 1 + ((derece / 255));

                        agirlik_button.style.borderWidth = wit + "px";

                        if (derece < 0) {
                            agirlik_button.style.backgroundColor = "rgba(" + 255 + ",0,0," + (Math.abs(derece) / 255) + ")"
                        } else {
                            agirlik_button.style.backgroundColor = "rgba(0," + 255 + ",0," + (Math.abs(derece) / 255) + ")"
                        }
                        agirlik_button.onmousemove = function () {
                            document.getElementById("model_arka2").setAttribute("width", (document.getElementById("model").offsetWidth - 20) + "px");
                            document.getElementById("model_arka2").setAttribute("height", (document.getElementById("model").offsetHeight + 200) + "px");



                            ctx.beginPath();
                            ctx.lineWidth = 10;
                            ctx.strokeStyle = "orange"
                            get_element_noron_id(snor.id).style.border = "5px solid " +  "orange"
                            get_element_noron_id(nor.id).style.border = "5px solid " +  "orange"

                            ctx.moveTo(get_element_noron_id(nor.id).offsetLeft, get_element_noron_id(nor.id).offsetTop + 100);

                            ctx.lineTo(get_element_noron_id(snor.id).offsetLeft, get_element_noron_id(snor.id).offsetTop + 100);

                            ctx.stroke();
                            ctx.closePath();

                        }
                        agirlik_button.onmouseleave = function () {
                            get_element_noron_id(nor.id).style.border = " 2px solid black";
                            get_element_noron_id(snor.id).style.border = "2px solid black";
                            document.getElementById("model_arka2").setAttribute("width", (document.getElementById("model").offsetWidth - 20) + "px");
                            document.getElementById("model_arka2").setAttribute("height", (document.getElementById("model").offsetHeight + 200) + "px");


                        }

                        document.getElementById("agirliklar_panel").appendChild(agirlik_button);
                    }
                }
            }
        }
    }
}

