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

    <nav class="navbar navbar-expand-lg Navigation">
      <div class="container-fluid">
        <router-link class="navbar-brand text" to="/">
          <img src="./components/icons/logo.ico" alt="" width="30" height="24" class="d-inline-block align-text-top">
          Heroes
        </router-link>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link v-if="isLoggedIn == false" class="nav-link text" to="/"> About </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn == true" class="nav-link text" to="/Clicker"> cromes </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn == true" class="nav-link text" to="/coleccion"> coleccion </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn == true && isAdmin == true" class="nav-link text" to="/add"> add
              </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn == true && isAdmin == true" class="nav-link text" to="/list"> list
              </router-link>
            </li>

            <li class="nav-item">
              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <router-link v-if="isLoggedIn == false" class="btn Button" to="/sign-in"> Sing-In </router-link>
                <router-link v-if="isLoggedIn == false" class="btn Button" to="/register"> Register </router-link>
              </div>
            </li>

            <li class="nav-item">
              <button class="btn Button" type="button" @click="handleSingOut" v-if="isLoggedIn">Sing Out</button>
            </li>

          </ul>
        </div>
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

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  
  color: white;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 15px;
  text-align: center;

}
.Button:after {
    content: "";
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
  text-align: center;
}

.Navigation {
  background-color: #F799AC;

  margin-bottom: 45px;

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
