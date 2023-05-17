<script setup>

import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, onSnapshot, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const isAdmin = ref(false);
const db = getFirestore();

let auth;
onMounted(() => {
  auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      chechUser(user.uid);


    } else {
      isLoggedIn.value = false;
      isAdmin.value = false;
    }


  });



});

function chechUser(user) {
  const q = query(collection(db, "Usuarios"), where("user", "==", user));

  getDocs(q).then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log("La consulta está vacía");

    } else {

      querySnapshot.forEach((doc) => {

        let Admin = doc.get('Admin');

        if (Admin) {
          isAdmin.value = true;
        }
      });
    }


  });

}

const handleSingOut = () => {
  signOut(auth).then(() => {
    isAdmin.value = false;
    router.push("/");
  });


};

</script>

<template>
  <header>
    <nav class="nav nav-pills flex-column flex-sm-row Navigation">
      <router-link class="flex-sm-fill text-sm-center text" to="/">
            Heroes
      </router-link>
      
      <router-link v-if="isLoggedIn == true" class="flex-sm-fill text-sm-center text" to="/Clicker"> cromes </router-link>
      
      <router-link v-if="isLoggedIn == true" class="flex-sm-fill text-sm-center text" to="/coleccion"> coleccion </router-link>

      <router-link v-if="isLoggedIn == true && isAdmin == true" class="flex-sm-fill text-sm-center text" to="/add"> add</router-link>

      <router-link v-if="isLoggedIn == true && isAdmin == true" class="flex-sm-fill text-sm-center text" to="/list"> list</router-link>

      <div class="btn-group flex-sm-fill text-sm-center" role="group" aria-label="Basic mixed styles example">
                <router-link v-if="isLoggedIn == false" class="btn Button" to="/sign-in"> Sing-In </router-link>
                <router-link v-if="isLoggedIn == false" class="btn Button" to="/register"> Register </router-link>
                <button class="btn Button flex-sm-fill text-sm-center" type="button" @click="handleSingOut" v-if="isLoggedIn">Sing Out</button>
      </div>

    </nav>

  </header>

  <body>
    <main>
      <RouterView></RouterView>

    </main>
  </body>
</template>

<style>
.Button {
  color: white;
  background-color: #B999F7;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  filter: dropshadow(color=#000, offx=0px, offy=1px);

  box-shadow: inset 0 0 0 #FFE5C4, 0 10px 0 #8E869D;


  color: white;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 15px;
  text-align: center;

}

.Button:after {
  height: 100%;
  width: 100%;
  padding: 4px;
  position: absolute;
  bottom: -15px;
  left: -4px;
  z-index: -1;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.text {
  color: white;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align:center;
  text-decoration: none;
}

.Navigation {
  background-color: #F799AC;
  height: 40px;

  margin-bottom: 30px;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-shadow: 0px 1px 0px #000;
  filter: dropshadow(color=#000, offx=0px, offy=1px);

  -webkit-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #D88697;
  -moz-box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #D88697;
  box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #D88697;

}

.text:hover {
  color: #3E262B;
}

body {
  background-color: #F8E6FD;
}
</style>
