<script setup>
import { ref } from 'vue'

import {getFirestore,collection,addDoc} from 'firebase/firestore';

const db = getFirestore();



const Name = ref('');
const Link = ref('');
const Hp = ref('');
const At = ref('');
const Def = ref('');
const Rareza = ref('');
const Disp = ref('');

function NewHeroe()
{
    var dis = false;

    if(Disp.value == true)
    {
        dis = true;

    }
    
    addDoc(collection(db,'Heroes'),{
        nombre: Name.value,
        img: Link.value, 
        hp: Hp.value, 
        att: At.value, 
        def: Def.value, 
        rareza: Rareza.value, 
        dis: dis
    });      

    Name.value = '';
    Link.value = '';
    Hp.value = '';
    At.value = '';
    Def.value = '';
    Rareza.value = '';
    Disp.value = '';
}
</script>

<template>
    <div class="container">

        <div class="card mb-4 Color">
            <div class="card-header">
                <h5 class="card-title">Add heroes</h5>
            </div>
            <div class="card-body">
                <form class="row g-3" @submit.prevent="NewHeroe">
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="" placeholder="Heroe name" v-model="Name">
                    </div>
                    <div class="col-md-4">
                        <select id="inputState" class="form-select" v-model="Rareza">
                            <option selected>Normal</option>
                            <option>Epico</option>
                            <option>Legendario</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <div class="form-check">
                            <label class="form-check-label" for="gridCheck">
                                Disponibilidad
                            </label>
                            <input class="form-check-input" type="checkbox" id="gridCheck" value= "1" v-model="Disp">
                        </div>
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Link" v-model="Link">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" id="inputZip" placeholder="HP" v-model="Hp">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" id="inputZip" placeholder="AT" v-model="At">
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control" id="inputZip" placeholder="DEF" v-model="Def">
                    </div>
                    <div class="col-12">
                        <div class="d-grid gap-2">
                            <button class="btn Button">Enviar</button>

                        </div>
                    </div>
                </form>

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

input {

    padding: 10px;
    margin: 10px;
    border: 0;
    border-bottom: 2px solid #F799AC;
}
input:hover
{
    border-bottom: 2px solid black;

}

label {
    color: #F799AC;
}
select
{
    padding: 10px;
    margin: 10px;
    border: 0;
    border-bottom: 2px solid #F799AC;

}

</style>
