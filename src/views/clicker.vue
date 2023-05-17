<script setup>
import { ref, onUnmounted } from 'vue'
import cromo from '../components/cromo.vue'
import { getFirestore, onSnapshot, collection, doc, deleteDoc, query, getDocs, where, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
let coins = 0;
const db = getFirestore();

const Name = ref('Mistery');
const Link = ref('https://i.imgur.com/yWffF0Z.png');
const Hp = ref(0);
const At = ref(0);
const Def = ref(0);
const Rareza = ref('Normal');
const Heroes = [];
let op = true;

const q = query(collection(db, "Heroes"));

getDocs(q).then((querySnapshot) => {

    querySnapshot.docs.map((doc) => {

        Heroes.push(doc)
    });
});



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sum() {
    coins += 1;

}

function getCrome()
{
    let index = getRandomInt(0, Heroes.length - 1)

    console.log(index)
    console.log(Heroes[index].get('dis'))

    while(Heroes[index].get('dis') == false)
    {
        index = getRandomInt(0, Heroes.length - 1)
    }




    return index;

}

function Open() {
    
    let index;
    coins = 0;

    op = false;

    const card = document.querySelector('.card-container');
    card.classList.add('rotated');
    setTimeout(() => {
        card.classList.remove('rotated');
    }, 1000);

    index = getCrome()
   
    showCard(Heroes[index])
    UpdatCard(Heroes[index])





}

function exist(reference, hiro) {
    for (let i = 0; i <= reference.length - 1; i++) {
        if (reference[i].id == hiro.id) {
            return true;
        }
    }
    return false;


}

function UpdatCard(h) {
    let auth;


    let HeroUID = "Heroes/" + h.id;
    let user;
    let HerosArray;

    auth = getAuth();

    user = auth.currentUser;






    const q = query(collection(db, "Usuarios"), where("user", "==", user.uid));

    const d = doc(db, HeroUID);


    onSnapshot(q, (snapshot) => {
        snapshot.docs.map((doc) => {



            HerosArray = doc.get('col')


            if (exist(HerosArray, d)) {
                console.log("lo encontre")

                
            } else {
                console.log("no encontre")
                
                console.log(HerosArray)

                HerosArray.push(d)

                updateDoc(doc.ref, {
                    col: HerosArray,
                })
                    .then(() => {
                        console.log("Documento actualizado exitosamente");
                    })
                    .catch((error) => {
                        console.error("Error al actualizar documento: ", error);
                    });
            }

        });

    });


}
function showCard(h) {
    Name.value = h.get('nombre');
    Link.value = h.get('img');
    Hp.value = h.get('hp');
    At.value = h.get('att');
    Def.value = h.get('def');
    Rareza.value = h.get('rareza');

}
function Save() {

    Name.value = 'Mistery';
    Link.value = 'https://i.imgur.com/yWffF0Z.png';
    Hp.value = 0;
    At.value = 0;
    Def.value = 0;
    Rareza.value = 'Normal';
    op = true;
}

</script>

<template>
    <div class="container mb-4">
        <div class="card-group Color">
            <div class="card">
                <div class="card-body">
                    <div class="container Numberbox">
                        <h1 class="text">
                            {{ coins }}
                        </h1>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <div class="spinner-grow text-warning" style="width: 5rem; height: 5rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-warning" style="width: 5rem; height: 5rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-warning" style="width: 5rem; height: 5rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow text-warning" style="width: 5rem; height: 5rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>


                </div>
            </div>
            <div class="card">



                <div ontouchstart="">
                    <div v-if="coins <= 20 && op == true" class="button">
                        <a @click="sum" href="#">Get Coins!</a>
                    </div>

                    <div v-if="coins > 20 && op == true" class="button">
                        <a @click="Open()" href="#">Open a crome!</a>
                    </div>
                    <div v-if="op == false && coins == 0" class="button">
                        <a @click="Save()" href="#">Save the crome</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container mb-4">
        <div class="card Color">
            <div class="card-header">
                ¿Que saldrá esta vez?
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="card card-container">
                                <!-- Contenido de la carta -->
                                <cromo v-if="op == false" :name="Name" :image="Link" :hp="Hp" :at="At" :def="Def"
                                    :rar="Rareza">
                                </cromo>
                                <cromo v-if="op == true" :name="Name" :image="Link" :hp="Hp" :at="At" :def="Def"
                                    :rar="Rareza">
                                </cromo>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.Color {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    filter: dropshadow(color=#000, offx=0px, offy=1px);

    box-shadow: inset 0 0 0 #FFE5C4, 0 10px 0 #D88697;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.card-container {
    position: relative;
    transition: transform 0.5s ease-in-out;
}

.card-container.rotated {
    animation: rotate-card 1s forwards;
}

@keyframes rotate-card {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(360deg);
    }
}


.text {
    color: white;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    font-size: 36px;
    text-align: center;

}

.Numberbox {
    background-color: #FFA12B;
    display: block;
    position: relative;
    padding: 20px 40px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.button {
    position: relative;
    display: inline-block;
    margin: 20px;
}

.button a {
    color: white;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    text-decoration: none;
    background-color: #FFA12B;
    display: block;
    position: relative;
    padding: 20px 40px;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.button a:active {
    top: 10px;
    background-color: #F78900;

    -webkit-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
    -moz-box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3pxpx 0 #915100;
    box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
}

.button:after {
    content: "";
    height: 100%;
    width: 100%;
    padding: 4px;
    position: absolute;
    bottom: -15px;
    left: -4px;
    z-index: -1;
    background-color: #2B1800;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
</style>
