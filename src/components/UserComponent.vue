<template>
    <div>
        <h1>Bem vindo, ADM</h1>
    </div>
</template>
<script>
  export default {
    name: "UserComponent",
    data() {
      return {
        users: null
      }
    },
    methods: {
      async getUsers() {
        const bearerToken = localStorage.getItem("token")
        console.log(bearerToken)
        // const req = await fetch('http://localhost:3000/teste')
        const req = await fetch("http://localhost:3000/teste", {
            method : "GET",
            headers: { "content-type": "application/json", 
                       "Authorization" : `Bearer ${bearerToken}`},
        })
        
        if(req.status == 400) {
          this.$router.push({name: "LogUserView"})
        }
        console.log(req)

        const data = await req.json()

        this.users = data

        console.log(data)

      }
    },
    mounted () {
        this.getUsers()
    }
  }
</script>

<style scoped>
  
</style>