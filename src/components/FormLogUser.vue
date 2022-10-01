<template>
    <div>
        <form id="user-form" @submit="logUser">
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
            <button type="submit">Logar</button>
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
    label{
        text-align: left;
        display: flex;
        margin-top: 12px;
    }
    button {
        background-color: #a2691a;
        border-radius: 10px;
        border: none;
        font-size: 22px;
        color: #F2F2F2;
        text-transform: capitalize;
        padding: 5px 10px;
        margin: 10px auto;
        cursor: pointer;
        transition: all ease .5s;
        width: 100%;
    }
    button:hover {
        background-color: #c9872c;
    }
</style>