<script setup>


</script>

<template>
  <header>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img src="./components/icons/logo.ico" alt="" width="30" height="24" class="d-inline-block align-text-top">
          Heroes
        </router-link>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/"> Home </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/coleccion"> Cromos </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add"> add </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/list"> list </router-link>
            </li>

          </ul>
        </div>
      </div>
    </nav>

  </header>

  <main>
    <Suspense>
      <RouterView></RouterView>
    </Suspense>

  </main>
</template>

<style scoped>
header {
  margin-bottom: 80px;
}
</style>
