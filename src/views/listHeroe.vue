<template>
  <div v-if="Edit == true" class="container">
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="card-title">Edit heroes</h5>
      </div>
      <div class="card-body">
        <form class="row g-3">
          <div class="col-md-6">
            <input type="text" class="form-control" id="" placeholder="Heroe name" v-model="selectedHeroe.name">
          </div>
          <div class="col-md-4">
            <select id="inputState" class="form-select" v-model="selectedHeroe.rar">
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
              <input class="form-check-input" type="checkbox" id="gridCheck" value="1" v-model="selectedHeroe.dis">
            </div>
          </div>
          <div class="col-12">
            <input type="text" class="form-control" id="inputAddress2" placeholder="Link" v-model="selectedHeroe.link">
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" id="inputZip" placeholder="HP" v-model="selectedHeroe.hp">
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" id="inputZip" placeholder="AT" v-model="selectedHeroe.att">
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" id="inputZip" placeholder="DEF" v-model="selectedHeroe.def">
          </div>
          <div class="col-12">
            <button @click="updateHeroe(selectedHeroe)" type="button" class="btn btn-primary">Enviar</button>
          </div>
        </form>

      </div>
    </div>
  </div>

  <div v-if="Edit == false" class="container">
    <div class="card mb-4 Color">
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


          <tbody>
            <tr v-for="h in Heroes">
              <th scope="row"> {{ h.id }}</th>
              <td>{{ h.name }}</td>
              <td>{{ h.rar }}</td>
              <td>{{ h.link }}</td>
              <td>{{ h.dis }}</td>
              <td>{{ h.hp }}</td>
              <td>{{ h.att }}</td>
              <td>{{ h.def }}</td>
              <td>
                <div class="container">
                  <button @click="OpenHeroe(h)" type="button" class="btn Button btn-lg">Edit</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>


<script>

import { getFirestore, onSnapshot, collection, doc, deleteDoc, query, setDoc } from 'firebase/firestore';
import { useRouter } from "vue-router";
import { ref, onUnmounted } from 'vue';

const db = getFirestore();

export default {
  components: {},
  methods: {
    updateHeroe: function (Heroe) { 

      setDoc(doc(db,'Heroes',Heroe.id),{
        nombre: Heroe.name,
        img: Heroe.link, 
        hp: Heroe.hp, 
        att: Heroe.att, 
        def: Heroe.def, 
        rareza: Heroe.rar, 
        dis: Heroe.dis

      })
      this.Edit = false;
    },

    OpenHeroe: function (h) {
      this.Edit = true;
      this.selectedHeroe = h
    },

    deleteHeroe: function (h) {
      deleteDoc(doc(db, 'Heroes', h.id))
    }
  },

  data: () => {
    return {
      Heroes: ref([]),
      selectedHeroe: ref([]),
      Edit: false
    }
  },
  mounted() 
  {
    const latestQuery = query(collection(db, "Heroes"));
    const liveheores = onSnapshot(latestQuery, (snapshot) => {
      this.Heroes = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.get('nombre'),
          att: doc.get('att'),
          def: doc.get('def'),
          dis: doc.get('dis'),
          hp: doc.get('hp'),
          link: doc.get('img'),
          rar: doc.get('rareza')
        }
      });
    });
    onUnmounted(liveheores)
  }
}
</script>


<style scoped>

.Color {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    filter: dropshadow(color=#000, offx=0px, offy=1px);

    box-shadow: inset 0 0 0 #FFE5C4, 0 10px 0 #D88697;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}
</style>
