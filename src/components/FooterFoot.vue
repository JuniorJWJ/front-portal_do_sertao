<template>
    <div>
        <footer class="bg-light text-center text-lg-start footer">
          <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            © Copyright:
            <a class="text-dark" href="https://mdbootstrap.com/">Link aleatório.com</a>
          </div>
      </footer>
    </div>
</template>

<script>
export default {
  name: "NavbarNav"
}
</script>
<style scoped>
  footer{
    position: fixed; 
    bottom: 0;
    width: 100%;
    left: 0;
    background-image: url("../assets/nav.jpg");
  }
</style>
