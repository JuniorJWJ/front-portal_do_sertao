<template>
  <div id="campo">
    <footer class="bg-light text-center text-lg-start footer">
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        <img id="logoifba" src="../assets/Logo_ifba.png" alt="Italian Trulli" />
        <img
          id="logofapesb"
          src="../assets/logo_fapesb.png"
          alt="Italian Trulli"
        />
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NavbarNav',
}
</script>
<style scoped>
footer {
  margin-top: 50px;
  background-color: #f2f2f2;
  width: 100vw;
}
#logoifba {
  width: 320px;
}
#logofapesb {
  width: 100px;
}
</style>
