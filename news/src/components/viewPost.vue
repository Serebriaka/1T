<template>
<div class="background"></div>
    <div class="view">
        <div class="modal">
            <div @click="close" class="close">X</div>
            <div class="dataAuthor">
                <p>Автор {{autor}}</p>
                <p>Почта {{email}}</p>
                <p>{{user.body}}</p>
            </div>
            <p>Комментарии</p>
            <div class="comments">
                <div class="comment" v-for="comment in comments" :key="comment.name">{{comment.body}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        user: {
            type: Object,
        },
    },
    data(){
        return{
            autor: '',
            email: '',
            comments: ''
        }
    },
    computed: {
        requestRoute: function () {
            return 'https://jsonplaceholder.typicode.com/users';
        },
        requestComment: function () {
            return 'https://jsonplaceholder.typicode.com/comments';
        }
    },
    methods:{
        close(){
            this.$emit('close-modal');
        },
        getData() {
            console.log(this.user)
            this.axios.get(this.requestRoute,
                {
                    params: {
                        id: this.user.userId,
                    }
                }
            ).then((response) => {
                this.autor = response.data[0].name;
                this.email = response.data[0].email;
                console.log(response)
            })
                .catch((error) => {
                    console.log(error);
                });
        },
        getComments(){
            console.log(this.user)
            this.axios.get(this.requestComment,
                {
                    params: {
                        postId: this.user.userId,
                    }
                }
            ).then((response) => {
                this.comments = response.data;
                console.log(response)
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    created() {
        this.getData();
        this.getComments()
    }
}
</script>

<style>
    .background{
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .view{
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    }

.modal{
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 490px;
    height: 600px;
    margin: 0 auto;
    background: #78BDE3;

}
    .dataAuthor{
        margin: 12px;
        width: 465px;
        height: 50%;
        background: #B6CEF2;
        border-radius: 6px;
    }
    .comment{
        text-align: left;
        margin: 0 auto;
        margin-bottom: 10px;
        width: 445px;
        height: 30%;
        background: #FFFEFE;
        padding: 10px;
    }
    .close{
        margin-top: 10px;
        cursor: pointer;
    }
    .comments{
        overflow: auto;
    }
</style>