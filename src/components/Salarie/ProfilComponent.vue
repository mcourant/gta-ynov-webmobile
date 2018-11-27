<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Profil</h1>
        </div>
        <form action="">
            <div class="form-group">
                <label for="">Nom</label>
                <input type="text" v-model="user.name" class="form-control" name="nom">
            </div>
            <div class="form-group">
                <label for="">Prénom</label>
                <input type="text" class="form-control" v-model="user.prenom" name="prenom">
            </div>
            <div class="form-group">
                <label for="">Date de naissance</label>
                <input type="date" class="form-control" name="date_naissance" v-model="user.date_naissance">
            </div>
            <div class="form-group">
                <label for="">Numéro de téléphone</label>
                <input type="phone" class="form-control" name="numero_telephone" v-model="user.numero_telephone">
            </div>
            <div class="form-group">
                <label for="">Adresse</label>
                <input type="text" class="form-control" name="adresse" v-model="user.adresse">
            </div>
            <div class="form-group">
                <label for="">Code postal</label>
                <input type="text" class="form-control" name="code_postal" v-model="user.code_postal">
            </div>
            <button type="submit" @click="handleSubmit" class="btn btn-primary">Modifier</button>
        </form>
    </div>
</template>

<script>

import config from "../../../config.js";

export default {
    name: "ProfilComponent",
    data() {
        return{
            user:{}
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("user"));
    },
    methods:{
        handleSubmit(e) {
            let that = this;
            e.preventDefault();
            localStorage.setItem("user", JSON.stringify(this.user));
            this.$http
            .put(config.urlApi + "/user/"+this.user.id, {
                name: this.user.name,
                prenom: this.user.prenom,
                date_naissance: this.user.date_naissance,
                numero_telephone: this.user.numero_telephone,
                adresse: this.user.adresse,
                code_postal:this.user.code_postal,
                email:this.user.email
            })
            .then(response => {
                console.log(response);
            });
        }
    }
}
</script>
