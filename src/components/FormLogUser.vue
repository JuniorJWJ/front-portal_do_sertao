<template>
    <div>
        <form class="form-group container" id="user-form" @submit="logUser">
            <div class="campo">
                <label for="login">Login:</label>
                <input 
                    type="text" 
                    id="login" 
                    name="email"
                    v-model="email"
                    class="form-control"
                />
                <label for="password">Senha:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    v-model="password"
                    class="form-control"
                />
                <button class="btn btn-success" type="submit">Logar</button>
                </div>
        </form> 
    </div>
</template>

<script>
    export default {
        name: "FormLogUser",
        data(){
            return{
                email: null,
                password: null
            }
        },
        methods: {
            async logUser(e){
                e.preventDefault();
                console.log("enviou o form")
                // console.log(this.email)
                // console.log(this.password)

                const data = {
                    email : this.email,
                    password : this.password
                }
                const dataJson = JSON.stringify(data)
                const res = await fetch("http://localhost:3000/log_user", {
                    method : "POST",
                    headers: { "content-type": "application/json"},
                    //credentials: "include",
                    // mode: 'no-cors',
                    body: dataJson
                })
                const tokenjwt = (await res.json()).token
                
                localStorage.setItem('token', tokenjwt);

                this.$router.push({name: "UserView"})
                console.log(tokenjwt)
            }
        },
    }
</script>
    
<style scoped>
    input{
        width:300px;
    }
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    label{
        text-align: left;
        display: flex;
        margin-top: 12px;
    }
    button{
        margin-top: 12px;
        width: 100%;
        text-transform: uppercase;
    }
</style>