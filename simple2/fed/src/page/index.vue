<template>
  <div class="btnList">
    <form role="form" class="form-inline">
      <div class="form-group col-md-4">
          <label for="searchTime" class="sr-only">时间：</label>
          <el-date-picker class="form-control"
          v-model="value"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
          </el-date-picker>
        <button type="button" class="btn btn-primary searchBtn" @click="search(1, 10)">查询</button>
        <button type="button" class="btn btn-primary showAllBtn" @click="showAll(1, 10)">显示全部</button>
        <button type="button" class="btn btn-primary addBtn" @click="add">增加</button>
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
      <div class="pull-right">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
    </el-pagination>
    </div>
    </div>
    <el-dialog title="新增" :visible.sync="modal.dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="modal.formLabelWidth">
         <el-date-picker class="form-control"
          v-model="modal.value"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
          </el-date-picker>
          <p v-if="validate.isEmpty">请选择日期</p>
        </el-form-item>
        <el-form-item v-for="v in formArr" :label="v.name" :label-width="modal.formLabelWidth">
          <el-input v-model="form[v.id]"  :placeholder="'请输入' + v.name" auto-complete="off"></el-input>
          <p v-if="validate[v]" v-model="errorTip[v]"></p>
        </el-form-item>

       <!--  <el-form-item label="发货人" :label-width="formLabelWidth">
          <el-input v-model="form.consignor"  placeholder="请输入内容发货人" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发货人电话" placeholder="请输入发货人电话" :label-width="formLabelWidth">
          <el-input v-model="form.consignorphone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="到站" placeholder="请输入到站" :label-width="formLabelWidth">
          <el-input v-model="form.destination" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名"  placeholder="请输入收货人姓名" :label-width="formLabelWidth">
          <el-input v-model="form.Consignee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"  placeholder="请输入电话" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品名" placeholder="请输入品名" :label-width="formLabelWidth">
          <el-input v-model="form.product" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="件数" placeholder="请输入件数" :label-width="formLabelWidth">
          <el-input v-model="form.count" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="包装"  placeholder="请输入包装" :label-width="formLabelWidth">
          <el-input v-model="form.pack" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量"  placeholder="请输入重量" :label-width="formLabelWidth">
          <el-input v-model="form.weight" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中转站" placeholder="请输入中转站" :label-width="formLabelWidth">
          <el-input v-model="form.interchange" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="中转站电话" placeholder="请输入中转站电话" :label-width="formLabelWidth">
          <el-input v-model="form.interchangeTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="运费"  placeholder="请输入运费" :label-width="formLabelWidth">
          <el-input v-model="form.freight" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="中转费" placeholder="请输入中转费" :label-width="formLabelWidth">
          <el-input v-model="form.transit" auto-complete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value: '',
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        modal: {
          value: '',
          dialogFormVisible: false,
          formLabelWidth: '120px'
        },
        form: {
         consignor : '',
         consignorphone : '',
         destination : '',
         Consignee : '',
         telephone : '',
         product : '',
         count : '',
         pack : '',
         weight : '',
         interchange : '',
         interchangeTel : '',
         freight : '',
         transit : '',
        },
        formArr: [
        {
          id: 'consignor',
          name: '发货人'
        },  {
          id: 'consignorphone',
          name: '发货人电话'
        },  {
          id: 'destination',
          name: '到站'
        },  {
          id: 'Consignee',
          name: '收货人姓名'
        },  {
          id: 'telephone',
          name: '电话'
        },  {
          id: 'product',
          name: '品名'
        },  {
          id: 'count',
          name: '件数'
        },  {
          id: 'pack',
          name: '包装'
        },  {
          id: 'weight',
          name: '重量'
        },  {
          id: 'interchange',
          name: '中转站'
        },  {
          id: 'interchangeTel',
          name: '中转站电话'
        },  {
          id: 'freight',
          name: '运费'
        },  {
          id: 'transit',
          name: '中转费'
        }],
        validate: {
          isEmpty: false,
         consignor : false,
         consignorphone : false,
         destination : false,
         Consignee : false,
         telephone : false,
         product : false,
         count : false,
         pack : false,
         weight : false,
         interchange : false,
         interchangeTel : false,
         freight : false,
         transit : false
        },
        errorTip: {
         consignor : '发货人不能为空',
         consignorphone : '不能为空',
         destination : '不能为空',
         Consignee : '不能为空',
         telephone : '不能为空',
         product : '不能为空',
         count : '不能为空',
         pack : '不能为空',
         weight : '不能为空',
         interchange : '不能为空',
         interchangeTel : '不能为空',
         freight : '不能为空',
         transit : ''

        }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.showAll(this.page.pageNum, this.page.pageSize);
    },
    search(pageNum, pageSize) {
      var userid = localStorage.getItem('userid');
      var year = this.value.getFullYear(),
          month = this.value.getMonth() + 1 > 9 ? this.value.getMonth() + 1 : '0' + (this.value.getMonth() + 1),
         day = this.value.getDate() > 9 ? this.value.getDate() : '0' + this.value.getDate();
      var addDate = year + '-' + month + '-' + day;
      console.log(this.value);
      var data={
          userid: userid,        
          size: pageSize,
          addDate,
          pageNow: pageNum,
        };
      this.$http({
        url: 'http://localhost:882/inventory/get',
        //cache:false
         method: 'GET',
         params:data
      }).then((res) => {        
        var data=res.data;
        if(data.code==200){ 
          this.items=data.data.objarr;
          this.page.total = data.data.totalcount;
        }      
      }).catch((res) => {
        console.log('获取表格数据失败', res);
      });      
    },
    handleCurrentChange(val) {
       this.page.pageNum = val;
      if(!this.value) {
          this.showAll(val, this.page.pageSize);
      }
      this.search(val, this.page.pageSize);
    },
    handleSizeChange(val) {
       this.page.pageSize = val;
       if(!this.value) {
         this.showAll(this.page.pageNum, val);
       }
       this.search(this.page.pageNum, val);
    },
    showAll(pageNow, pageSize) {
      this.value = '';
      var userid = localStorage.getItem('userid');
      var username = localStorage.getItem('username');
      var data={
          userid: userid,        
          size: pageSize,
          pageNow
        };
      this.$http({
        url: 'http://localhost:882/inventory/getInventoryList',
        //cache:false
         method: 'GET',
         params:data
      }).then((res) => {        
        var data=res.data;
        if(data.code==200){         
          this.items=data.data.objarr;
          this.page.total = data.data.totalcount;
        }      
      }).catch((res) => {
        console.log('登录信息请求错误 ', res);
      });      
    },
    add() {
      this.modal.dialogFormVisible =  true;
    },
    sure() {
      if(!this.validateForm()) {
        return;
      }
      var userid = localStorage.getItem('userid');
      var username = localStorage.getItem('username');
      var data={
          userid: userid,        
          size: 10,
          pageNow: 1,
        };
      this.$http({
        url: 'http://localhost:882/inventory/getInventoryList',
        //cache:false
         method: 'GET',
         params:data
      }).then((res) => {        
        var data=res.data;
        if(data.code==200){         
          this.items=data.data.objarr;
        }      
      }).catch((res) => {
        console.log('登录信息请求错误 ', res);
      });      
      this.dialogFormVisible = false

    },
    validateForm() {
      if(!this.modal.val) {
        this.validate.isEmpty= true;
        return;
      } else {
        this.validate.isEmpty= false;
      }
      for(var k in form) {
        if(!k) {
          this.validate[k] = true;
          console.log( this.validate[k]);
        } else {
           this.validate[k] = false;
        }
        if(k === 'consignorphone' && form[k].test('/^\d*$/g') ) {
           this.validate[k] = true;
           this.errorTipr[k] = '电话只能填数字';
        }
      }


    },
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
