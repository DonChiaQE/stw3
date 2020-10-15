<template>
    <b-container>
        <b-navbar>
            <b-navbar-brand class="mr-auto"><h1>quizzes.</h1></b-navbar-brand>
        </b-navbar>
        <router-link :to="{ name: 'Quiz', params: { quiz_id: quizID } }">
            <div v-for="(quiz, index) in quizzes" :key="index" v-on:click="quizID = index">
                <div v-for="(q, index) in quiz" :key="index" v-on:click="onSubmit()">
                    <b-col class="p-4">
                        <h1 class="rounded p-4 text-right" style="background: #FFFFFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 10px; color: black; text-decoration: underline;">
                            {{q}}
                        </h1>
                    </b-col>
                </div>
            </div>
        </router-link>
    </b-container>
</template>

<script>
import axios from 'axios';
export default {
    data () {
        return {
            quizzes: {
                type: Array
            },
            quizID: 0,
            questions: {
                type: Array
            },
            name: 'Geography'
        }
    },
    methods: {
        onSubmit () {
            console.log('submit')
            const payload = {
                quizID: this.quizID
            }
            this.pushID(payload)
        },
        getQuizzes () {
            const path = 'https://CarpalRemoteMath.lizardon.repl.co/quiz'
            axios.get(path)
            .then((res) => {
                this.quizzes = res.data.quizzes
            })
            .catch((error) => {
                console.error(error);
            })
        },
    },
    created () {
        this.getQuizzes()
        console.log(this.quizzes)
    }
}
</script>

<style scoped>

</style>