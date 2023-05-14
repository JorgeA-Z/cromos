<script setup>
import { getFirestore, onSnapshot, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, onUnmounted, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import cromo from '../components/cromo.vue'


const db = getFirestore();
let Heroes = ref([]);
let User = ref('');
let auth;

async function getHero(path) {

  const heroRef = doc(db, path);
  const heroDoc = await getDoc(heroRef);
  if (heroDoc.exists()) {

    var heroe =
    {
      name: heroDoc.get('nombre'),
      att: heroDoc.get('att'),
      def: heroDoc.get('def'),
      dis: heroDoc.get('dis'),
      hp: heroDoc.get('hp'),
      link: heroDoc.get('img'),
      rar: heroDoc.get('rareza')

    }
    return heroe;


  } else {
    console.log('El documento no existe');
  }


}

auth = getAuth();
onAuthStateChanged(auth, (user) => {
  User.value = user.uid;

  const q = query(collection(db, "Usuarios"), where("user", "==", User.value));

  getDocs(q).then((querySnapshot) => {
    const promises = [];
    querySnapshot.forEach((doc) => {
      let references = doc.get('col')

      references.map((ref) => {


        promises.push(getHero(ref.path))

      });


    });


    Promise.all(promises).then((heroesData) => {
      heroesData.sort((a, b) => a.rar.localeCompare(b.rar));
      
      Heroes.value = heroesData;
    });


  });

});


</script>

<template>
<div class="container">
  <div class="row">
    <div class="col-4" v-for="(h, index) in Heroes" :key="index">
      <div class="card mb-3 cuerpo">
        <div class="card-body">
          <cromo :name="h.name" :image="h.link" :hp="h.hp" :at="h.att" :def="h.def" :rar="h.rar"></cromo>
        </div>
      </div>
    </div>
  </div>
</div>


</template>

<style scoped>

.cuerpo {
  border-style: none;
  background-color: #F8E6FD;
}
</style>
