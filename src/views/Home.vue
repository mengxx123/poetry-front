<template>
    <my-page title="诗词" :page="page">
        <div class="article-box">
            <div class="wrap">
                <div class="search-box">
                    <input class="input" v-model="keyword" placeholder="" placeholder="搜索" @keydown="keyDown($event)">
                    <ui-icon-button icon="search" title="搜索" primary @click="search" />
                </div>
            </div>
            <div class="empty" v-if="loadingState === 'loading'">
                搜索中...
            </div>
            <div class="empty" v-if="!articles.length && loadingState === 'loaded'">
                没有搜索结果~
            </div>
            <ul class="news-list">
                <li class="item" v-for="article in articles">
                    <div>
                        <router-link :to="`/articles/${article.id}`">
                            <div class="title">
                                <ui-badge class="top" content="置顶" v-if="article.top" />
                                {{ article.title }} · {{ article.author }}
                            </div>
                        </router-link>
                    </div>
                </li>
            </ul>
            <ui-raised-button class="more" label="加载更多" @click="loadMore" v-if="pagination.page < pagination.totalPage" />
        </div>
        <!-- <ul class="news-list">
            <li class="item" v-for="article in articles">
                <router-link class="title" :to="`/articles/${article.id}`">{{ article.title }}</router-link>
            </li>
        </ul> -->
    </my-page>
</template>

<script>
    /* eslint-disable */
    const moment = window.moment
    import {timeFilter, commonTimeFilter} from '@/util/filter'
    import {cms} from '@/config'

    export default {
        data () {
            return {
                keyword: '',
                pagination: {
                    page: 1,
                    totalPage: 1
                },
                loadingState: '',
                articles: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=poetry',
                            target: '_blank',
                            title: '应用'
                        }
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
            this.keyword = this.$route.query.keyword || ''

            this.hostname = location.hostname
            console.log('cms', cms)
            // this.title = document.title = cms.siteName
            this.loadData()

            // window.addEventListener('keydown', this.keyDown = e => {
            //     console.log(e.keyCode)
            //     if (e.keyCode === 69) {
            //         this.$router.push('/admin2')
            //     }
            // })
        },
        destroyed() {
            // window.removeEventListener('keydown', this.keyDown)
        },
        methods: {
            loadData() {
                this.loadingState = 'loading'
                this.$http.get(`/poetries?page_size=20&page=${this.pagination.page}&keyword=${this.keyword}`).then(
                    response => {
                        let data = response.data
                        this.articles = this.articles.concat(data)


                        // for (let item of this.article) {
                        //     item.tags = 'ass'
                        // }
                        this.loadingState = 'loaded'
                        console.log(response.headers)
                        console.log('X-Total-Page', response.headers['x-total-page'])
                        this.pagination.totalPage = response.headers['x-total-page']
                    },
                    response => {
                        console.log(response)
                    })
            },
            loadMore() {
                this.pagination.page++
                this.loadData()
            },
            commonTimeFilter,
            keyDown(e) {
                console.log(e.keyCode)
                if (e.keyCode === 13) {
                    this.search()
                }
            },
            search() {
                if (!this.keyword) {
                    this.$message({
                        type: 'danger',
                        text: '请输入关键词'
                    })
                    return
                }
                this.articles = []
                this.$router.push('/search?keyword=' + encodeURIComponent(this.keyword))
            }
        },
        filters: {
            timeFilter,
        },
        watch: {
            $route(to, from) {
                this.keyword = this.$route.query.keyword || ''
                this.loadData()
                // console.log(to.path)
            }
        },
    }
</script>

<style lang="scss" scoped>
.empty {
    padding: 80px 0;
    text-align: center;
}
.page-home {
    background-color: #eee;
}
.wrap {
    width: 400px;
    margin: 24px auto 0 auto;
}
.search-box {
    display: flex;
    width: 400px;
    // border: 1px solid #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    &:hover {
        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
    }
    .input {
        flex-grow: 1;
        display: block;
        height: 48px;
        padding: 0 16px;
        line-height: 48px;
        border: none;
        outline: none;
    }
}
.slogan {
    font-size: 32px;
    margin-bottom: 16px;
}
.article-box {
    background-color: #fff;
}
.news-list {
    .item {
        display: flex;
        align-content: space-between;
        padding: 16px 0;
        // margin-bottom: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
        max-width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .top {
        margin-right: 8px;
    }
    .meta {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .avatar {
        display: block;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        border-radius: 50%;
    }
    .user-name {
        color: #666;
        margin-right: 16px;
    }
    .time {
        color: #999;
    }
    .tag {
        margin-right: 8px;
    }
}
.more {
    margin-top: 16px;
}
.icp {
    text-align: center;
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>
