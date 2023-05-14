<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "vue-router";
import { getFirestore, collection, addDoc, doc, query, where, getDocs } from 'firebase/firestore';


const email = ref("");
const password = ref("");
const router = useRouter()

const db = getFirestore();

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            CreateUser(data.user.uid);
            router.push('/')
        })
        .catch((error) => {
            alert(error.message);
        })

};
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            CreateUser(result.user.uid);
            router.push("/")

        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        })

};
const CreateUser = (User) => {

    const q = query(collection(db, "Usuarios"), where("user", "==", User));

    getDocs(q).then((querySnapshot) => {

        if (querySnapshot.empty) {
            console.log("La consulta está vacía");
            const hero = doc(db, 'Heroes/NxLCE10paqRjyk5ggIf9');

            console.log(hero)

            addDoc(collection(db, 'Usuarios'), {
                Admin: false,
                user: User,
                Monedas: 0,
                col: [hero,],
            });

        }
    });

}

</script>
<template>
    <div class="container">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
            </div>
            <p v-if="errMsg">{{ errMsg }}</p>

            <div class="mb-3">
                <div class="d-grid gap-2">
                    <button class="btn btng Button" type="button" @click="register">Submit</button>
                    <button class="btn btng Button" type="button" @click="signInWithGoogle"> Register In With
                        Google</button>
                </div>
            </div>

        </form>
    </div>
</template>

<style scoped>
.btng {
    margin-bottom: 10px;
}

input {
    background-color: #F8E6FD;
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
</style>