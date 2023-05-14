<script setup>
const props = defineProps(['name', 'image', 'hp', 'at', 'def', 'rar']);
import { ref } from 'vue';

let color = ref('background-color: #5088BC;')
let N = -1;



if (props.rar === "Normal") {
    N = 0;
    color.value = 'background-color: #5088BC '

} else if (props.rar === "Legendario") {
    N = 1;
    color.value = 'background-color: #8D12F3 '
} else if (props.rar === "Epico") {
    N = 2;
    color.value = 'background-color: #F3D412 '
}

console.log()

</script>

<template>
    <div class="card tarjeta" :style="[color]">
        <div class="card-header">
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item">
                    <h6 class="text">
                        {{ props.name }}
                    </h6>
                </li>
                <li class="list-group-item text">

                    <small>
                        <p v-if="N == 0">N</p>
                    </small>
                    <small>
                        <p v-if="N == 1">L</p>
                    </small>
                    <small>
                        <p v-if="N == 2">E</p>
                    </small>
                </li>
            </ul>
        </div>
        <img :src=props.image class="card-img-top imagen" alt="">
        <div class="card-body">
            <ul class="list-group list-group-horizontal text">
                <li class="list-group-item">
                    HP
                    <small>
                        {{ props.hp }}
                    </small>
                </li>
                <li class="list-group-item">
                    AT
                    <small>
                        {{ props.at }}
                    </small>
                </li>
                <li class="list-group-item">
                    DEF
                    <small>
                        {{ props.def }}
                    </small>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.text {
    color: black;
    font-family: Helvetica, sans-serif;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
}

.tarjeta {


    width: 246px;
    height: 430px;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 0px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=0px);

    -webkit-box-shadow: inset 0 0 0 #FFE5C4, 0 5px 0 #202020;
    -moz-box-shadow: inset 0 0 0 #FFE5C4, 0 5px 0 #202020;
    box-shadow: inset 0 0 0 #FFE5C4, 0 10px 0 #202020;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;



}

.imagen {
    width: 244px;
    height: 240px;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

</style>