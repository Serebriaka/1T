<template>
    <addPost
            v-if="addVisible"
            @close="addVisible=false"
            @add-post="add"
    ></AddPost>
    <view-post
            v-if="visible"
            :user="lastClickedObj"
            :comments="comments"
            :articles="Articles"
            @close-modal="visible=false"
    ></view-post>
    <div class="body">
        <div class="bottoms">
            <div class="select">
                <select  v-model="selected" >
                    <option disabled value="">Выберите автора</option>
                    <option>Все авторы</option>
                    <option v-for="user in Users" :key="user" v-bind:value="user">
                        <div @click="getData()">{{user.name}}</div></option>
                </select>
            </div>
            <bottom @click="sort" class="sort">Сортировка по заголовку</bottom>
            <div @click="addArticle" class="addTitle">+</div>
        </div>
        <div @click="openModal(obj)" class="articles" v-for="(obj, objIndex) in Articles" :key="objIndex">
            <div class="title">{{obj.title}}</div>
            {{obj.body}}
        </div>
    </div>

</template>

<script>
import addPost from "./addPost";
import viewPost from "./viewPost";
export default {
    name: 'HalloWorld',
    components:{
        addPost,
        viewPost
    },
    data() {
        return {
            selected: '',
            Articles: [],
            Users: [],
            objIndex: 0,
            visible: false,
            addVisible: false,
            comments: [],
            lastClickedObj: {},
        }
    },
    methods: {
        add(data){

            this.Articles.push(data);

        },
        addArticle(){
            this.addVisible = true;
        },
        getData() {
            console.log('test')
            this.Articles = []
            console.log('titles')
            let url = "https://jsonplaceholder.typicode.com/posts";
            this.axios.get(url, {
                params: {
                    userId: this.selected.id
                }
            })
                .then((response) => {
                    this.Articles = response.data
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getUser() {
            console.log('user')
            let url = "https://jsonplaceholder.typicode.com/users";
            this.axios.get(url, {
                params: {

                }
            })
                .then((response) => {
                    this.Users = response.data
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getComment() {
            console.log('comment')
            let url = "https://jsonplaceholder.typicode.com/comments";
            this.axios.get(url, {
                params: {

                }
            })
                .then((response) => {
                    this.comments = response.data
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sort() {
            this.Articles.sort(function (a, b) {
                if (a.title < b.title) {return -1;}
                if (a.title > b.title) {return 1;}
            });
            console.log(this.Articles)
        },
        openModal(obj){
            this.visible = true;
            this.lastClickedObj = obj;
        }

    },
    created() {
        this.getComment();
        this.getData();
        this.getUser();
    },
    watch: {
        selected: function () {
            this.getData();
        }
    }
}
</script>



<style scoped>
    .addTitle{
        font-weight: 600;
        font-size: 30px;
        width: 24px;
        height: 22px;
        background: #75BD92;
        border-radius: 2px;
        cursor: pointer;
        margin: 0 auto;
        margin-top: 3px;
        align-content: center;
        display:table-cell;
        text-align: center;
        padding-bottom: 9px;
    }
    .body{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: 470px;
        background: #78BDE3;
}
    .bottoms{
        display: flex;
        margin-left: 12px;
        margin-top: 11px;
        width: 445px;
        height: 37px;
        background: linear-gradient(0deg, #B6F3F3 0%, #4CBABA 100%);
        border-radius: 5px;
    }
    .articles{
        cursor: pointer;
        flex-direction: column;
        display: flex;
        margin: 12px;
        width: 445px;
        background: #B6CEF2;
        border-radius: 6px;
    }
    .select{
        margin: 9px;
    }
    .sort{

        vertical-align:middle;
        display:table-cell;
        text-align: center;
        padding-top: 6px;
        margin-top: 4px;
        width: 200px;
        height: 24px;
        background: #5C9987;
        border-radius: 2px;
        cursor: pointer;
    }
    .title{
        font-weight: 600;
        font-size: 16px;
        line-height: 15px;
    }
</style>
