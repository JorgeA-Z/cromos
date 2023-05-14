<script setup>

import { getFirestore, collection, query, getDocs, deleteDoc, doc} from "firebase/firestore";
import { useRouter } from "vue-router";


let Heroes = [];
const db = getFirestore();

const router = useRouter();

const heroesList = query(collection(db, "Heroes"));

const querySnapshot = await getDocs(heroesList);
querySnapshot.forEach((d) => {
    // doc.data() is never undefined for query doc snapshots
    const heroe = {
        id: d.id,
        name: d.get('nombre'),
        att:d.get('att'),
        def:d.get('def'),
        dis:d.get('dis'),
        hp:d.get('hp'),
        link:d.get('img'),
        rar:d.get('rareza')
    }
    Heroes.push(heroe)
});

const deleteHeroe = (Heroe) =>
{

    deleteDoc(doc(db,'Heroes',Heroe.id));
    router.push("/list");
};

</script>
<template>
        <div class="container">
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title">List heroes</h5>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Rareza</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">Disponibilidad</th>
                                <th scope="col">HP</th>
                                <th scope="col">ATT</th>
                                <th scope="col">DEF</th>
                                <th scope="col">Operaciones</th>
                            </tr>
                        </thead>
                        
                        
                        <tbody >
                            <tr v-for="h in Heroes">
                                <th scope="row"> {{h.id}}</th>
                                <td>{{h.name}}</td>
                                <td>{{h.rar}}</td>
                                <td>{{h.link}}</td>
                                <td>{{h.dis}}</td>
                                <td>{{h.hp}}</td>
                                <td>{{h.att}}</td>
                                <td>{{h.def}}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button @click="deleteHeroe(h)" type="button" class="btn btn-danger">Delete</button>
                                        <button  type="button" class="btn btn-success">Edit</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    </template>

<style scoped></style>
