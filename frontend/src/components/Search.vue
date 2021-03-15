<template>
  <div style="margin: auto; margin-top: 40px">
    <el-container>
      <div style="margin-right: 5px">
        <el-input
          style="margin-right: 5px"
          v-model="input"
          placeholder="请输入商品名称"
        ></el-input>
      </div>
      <el-button v-on:click="onSearch" type="primary" icon="el-icon-search"
      >搜索
      </el-button
      >
    </el-container>
    <el-container>
      <div>
        <p v-if="goodsList.length>0" style="margin-bottom: 20px">为您搜索到以下结果:</p>
        <div v-for="item in goodsList" :key="item.id" v-on:click="getDetail(item.id)">
          <el-card style="margin-bottom: 10px;width: 500px;">
            <el-container>
              <el-image
                style="width: 100px; height: auto"
                :src="getImageUrl(item.id)"
                :fit="'contain'"></el-image>
              <div style="margin-left: 30%">
                <div>
                  商品名称：{{ item.name }}
                </div>
                <div>
                  剩余：{{ item.available }} 件
                </div>
                <div>
                  价格：{{ item.simple_image }} 元
                </div>
              </div>
            </el-container>
          </el-card>
        </div>
      </div>

      <div v-if="detail_flag===true" style="margin-left: 20px">

          <el-header style="text-align: left; font-size: 20px">
            <span>{{detail.name}} 的详情页</span>
          </el-header>

          <el-card style="margin-bottom: 10px;width: 600px;">
            <el-image
              style="width: auto; height: 300px"
              :src="getImageUrl(detail.id)"
              :fit="'contain'"></el-image>
            <div style="">
              <div>
                商品名称：{{ detail.name }}
              </div>
              <div>
                库存：{{ detail.available }} 件
              </div>
              <div>
                价格：{{ detail.image }} 元
              </div>
              <div>
                上架日期：{{ detail.pub_date }}
              </div>
              <div style="white-space: pre-wrap">
                <hr>
                <div>商品介绍：</div>
                {{detail.detail}}
              </div>
            </div>
          </el-card>
      </div>
    </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>

<script>

  export default {
    name: "Search",
    data: function () {
      return {
        input: "",
        goodsList: [],
        detail: {},
        detail_flag: false,
      };
    },
    methods: {
      onSearch() {
        this.detail_flag = false
        if (this.input === '') {
          alert('请先输入商品名称')
          return
        }
        let self = this
        this.$axios.post("http://localhost:8000/searchSys/search/", {
          name: this.input
        }).then(function (response) {
          let data = response.data
          if (data.status) {
            let res = JSON.parse(JSON.stringify(response.data.data))
            console.log(res)
            self.goodsList = res
            console.log(self.goodsList)
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getImageUrl(id) {
        return "http://localhost:8000/searchSys/img/" + id + "/"
      },
      getDetail(id) {
        let self = this
        this.$axios.post("http://localhost:8000/searchSys/detail/", {
          id: id
        }).then(function (response) {
          let data = response.data
          if (data.status) {
            let res = JSON.parse(JSON.stringify(response.data.data))
            self.detail = res
            self.detail_flag = true
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
  };
</script>
