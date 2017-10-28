<template>
  <div class="btnList">
    <form role="form" class="form-inline">
      <div class="form-group">
        <label for="searchTime" class="sr-only">时间：</label>
        <input id="searchTime" type="text" lay-key="1">
        <button type="button" class="btn btn-primary searchBtn">查询</button>
        <button type="button" class="btn btn-primary showAllBtn">显示全部</button>
        <button type="button" class="btn btn-primary addBtn">增加</button>
        <button type="button" class="btn btn-primary statisticsBtn">统计</button>
      </div>
    </form>
    <div class="tableContainer">
      <table class="table table-hover userTable">
        <thead>
          <tr>
            <th>日期</th>
            <th>发货人</th>
            <th>发货人电话</th>
            <th>到站</th>
            <th>收货人姓名</th>
            <th>电话</th>
            <th>品名</th>
            <th>件数</th>
            <th>包装</th>
            <th>重量</th>
            <th>中转站</th>
            <th>中转站电话</th>
            <th>运费</th>
            <th>中转费</th>
            <th colspan="2">编辑</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td> {{ item.addDate }} </td>
            <td> {{item.consignor}} </td>
            <td> {{item.consignorphone}} </td>
            <td> {{item.destination}} </td>
            <td> {{item.Consignee}} </td>
            <td> {{item.telephone}} </td>
            <td> {{item.product}} </td>
            <td> {{item.count}} </td>
            <td> {{item.pack}} </td>
            <td> {{item.weight}} </td>
            <td> {{item.interchange}} </td>
            <td> {{item.interchangeTel}} </td>
            <td> {{item.freight}} </td>
            <td> {{item.transit}} </td>
            <td>
              <button type="button" class="btn btn-default edit btn-sm" style="margin-right:15px;">编辑</button>
            </td>
            <td>
              <button type="button" class="btn btn-default del btn-sm" style="margin-right:15px;">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pager">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.getData();
    console.log(12);
  },
  methods: {
    getData() {
      var userid = localStorage.getItem('userid');
      var username = localStorage.getItem('username');
      var data={
          userid: userid,        
          size: 10,
          pageNow: 1,
        };
      this.$http({
        url: 'http://localhost:882/inventory/getInventoryList?userid=1&size=25&pageNow=1',
        //cache:false
         method: 'GET',
         data: data
      }).then((res) => {      	
      	var data=res.data;
      	if(data.code==200){      		
      		this.items=data.data.objarr;
      	}      
      }).catch((res) => {
        console.log('登录信息请求错误 ', res);
      });      
    }
}
}

</script>
<style scoped>
.addBtn {
  float: right;
}

.modal {
  display: none;
}

.searchBtn {
  margin: 0 10px;
}

#addModal,
#editModal {
  top: 5%;
}

</style>
