<template>
    <my-page title="诗词详情" :page="page" backable>
        <h1 class="article-title">{{ article.title }}</h1>
        <ui-article class="article" v-html="article.content">
        </ui-article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                article: {},
                page: {
                    menu: [
                        // {
                        //     type: 'icon',
                        //     icon: 'apps',
                        //     href: 'https://app.yunser.com/',
                        //     target: '_blank',
                        //     title: '应用'
                        // }
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     to: '/help'
                        // }
                    ]
                }
            }
        },
        mounted() {
            let id = this.$route.params.id
            this.$http.get(`/poetries/${id}?convert=true`).then(
                response => {
                    let data = response.data
                    console.log(data)
                    this.article = data
                    this.article.content = this.article.content
                },
                response => {
                    console.log(response)
                })
        }
    }
</script>

<style lang="scss" scoped>
.article-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
}
.article {
    line-height: 1.8;
}
</style>
