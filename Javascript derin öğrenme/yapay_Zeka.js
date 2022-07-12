function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function sigmoid_turev(y) {
    return y * (1.0 - y);
}
class noron {
    constructor() {
        this.a = 0;
        this.z = 0;
        this.delta_W = 0.0;
        this.b = random(-4, 4);
        this.id = random(-555, 555).toString() + random(-555, 555).toString() + random(-555, 555).toString() + random(-555, 555).toString();
    }
}
class katman extends Array {
    constructor(boyut) {
        super();
        for (let i = 0; i < boyut; i++) {
            let nor = new noron()
            this.push(nor);
        }
    }
    get_activ(nor, agirliklar) {
        let toplam = 0;
        for (let ia = 0; ia < this.length; ia++) {
            let i = this[ia];
            toplam += i.z * agirliklar[i.id][nor.id];
        }
        toplam += nor.b;
        return toplam
    }
}
class model_DL {
    constructor(katmans, labda = 0.6) {
        this.katmanlar = [];
        for (let boyut of katmans) {
            this.katmanlar.push(new katman(boyut));
        }
        this.agirliklar = {};
        this.labda = labda;
        this.parentler = {};
        this.loss = 0;
    }
    recognize() {
        for (let i = 0; i < this.katmanlar.length - 1; i++) {
            let katman = this.katmanlar[i];
            let skatman = this.katmanlar[i + 1];
            for (let p of katman) {

                this.agirliklar[p.id] = {}
                for (let g of skatman) {
                    let df = 0;
                    while (df == 0) {
                        df = random(-4, 4) / 10;
                    }

                    this.agirliklar[p.id.toString()][g.id.toString()] = df;
                }
            }
        }
    }

    cikis_katmani() {
        return this.katmanlar[this.katmanlar.length - 1];
    }
    set_data(x) {
        for (let i = 0; i < x.length; i++) {
            this.katmanlar[0][i].z = x[i];
            this.katmanlar[0][i].a = x[i];
        }
        for (let i = 0; i < this.katmanlar.length - 1; i++) {
            let katman = this.katmanlar[i];
            let skatman = this.katmanlar[i + 1];
            for (const p of skatman) {
                p.a = katman.get_activ(p, this.agirliklar);
                p.z = sigmoid(p.a);
            }
        }
    }

    predict(x) {
        this.set_data(x);
        return this.cikis_katmani()[0].z
    }
    fit(xler, yler) {
        for (let ghghgh = 0; ghghgh < xler.length; ghghgh++) {
            let x = xler[ghghgh];
            let y = yler[ghghgh];
            this.predict(x);

            let h = this.cikis_katmani()[0];
            let delta = sigmoid_turev(h.z) * (h.z - y);
            this.katmanlar[this.katmanlar.length - 1][0].delta_W = delta;


            for (let g = this.katmanlar.length - 2; g > -1; g--) {

                for (let ara_noron of this.katmanlar[g]) {
                    let error = 0;
                    for (let sonraki of this.katmanlar[g + 1]) {
                        error += this.agirliklar[ara_noron.id][sonraki.id] * sonraki.delta_W;
                    }
                    ara_noron.delta_W = error * sigmoid_turev(ara_noron.z);
                    error = 0;
                }
            }
            for (let i = 1; i < this.katmanlar.length; i++) {
                for (let noron of this.katmanlar[i]) {
                    for (let noron_geri of this.katmanlar[i - 1]) {
                        this.agirliklar[noron_geri.id][noron.id] -= this.labda * noron.delta_W * noron_geri.z;

                    }
                    noron.b -= this.labda * noron.delta_W;
                }
            }
        }
    }
    score(xler, yler) {
        let dogrular = 0;
        for (let ghghgh = 0; ghghgh < xler.length; ghghgh++) {
            let sonuc = this.predict(xler[ghghgh]);
            dogrular += 1 - (Math.abs(sonuc - yler[ghghgh]));
        }
        return dogrular / xler.length;
    }
}
var xler = [];
var yler = [];
for (let i = 0; i < 30; i++) {
    let x = [random(0, 100) / 100];
    let y =x[0]*x[0];
    if (y < 1) {
        xler.push(x);
        yler.push(y);
    }
}

function score_yazdir(mesaj, x, y) {
    let pred = modelim.predict(x);
    let train = y;
    console.log(mesaj, train, "\n Model çıktısı:", pred, "\n başarı:", 1 - (Math.abs(train - pred)), train, pred);
}
var js_icin_katmanlar = [xler[0].length, 16,5, 1]
var modelim = new model_DL(katmans = js_icin_katmanlar, labda = 1e-1);
modelim.recognize();
var epoch = 100;
score = 0;
for (let i = 0; i < epoch; i++) {
    modelim.fit(xler, yler);
    score = modelim.score(xler, yler);
}

score_yazdir("Öğrendikten sonra deneme (" + epoch.toString() + ") epoch)\n Sonuç:", xler[0], yler[0])
console.log(modelim.score(xler, yler))