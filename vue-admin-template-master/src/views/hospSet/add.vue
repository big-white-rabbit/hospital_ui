<template>
  <div class="app-container">
        医院设置添加
        <el-form label-width="120px">
          <el-form-item label="医院名称">
            <el-input v-model="hospitalSet.hosname" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="医院编号">
            <el-input v-model="hospitalSet.hoscode" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="api基础路径">
            <el-input v-model="hospitalSet.apiUrl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名">
            <el-input v-model="hospitalSet.contactsName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系人手机">
            <el-input v-model="hospitalSet.contactsPhone" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名">
            <el-button type="primary" @click="saveOrUpdate(hospitalSet)">保存</el-button>
          </el-form-item>
        </el-form>
  </div>

</template>

<script>
  import hospSet from '@/api/hospSet'

  export default {
    data() {
      return {
        hospitalSet: {}
      }
    },

    created() {
      if(this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getHospSet(id)
      }
    },

    methods: {
      //根据id查询医院设置
      getHospSet(id) {
        hospSet.getHospSet(id)
        .then(response => {
          this.hospitalSet = response.data
        })
      },

      //保存
      save() {
        hospSet.saveHospSet(this.hospitalSet)
        .then(response => {
          //添加提醒
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          //跳转页面列表
          this.$router.push({path:'/hospSet/list'})
        })
      },

      //修改
      update() {
        hospSet.updateHospSet(this.hospitalSet)
        .then(response => {
          //添加提醒
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          //跳转页面列表
          this.$router.push({path:'/hospSet/list'})
        })
      },

      //添加
      saveOrUpdate() {
        //判断添加还是修改
        if(!this.hospitalSet.id) {//没有id，添加操作
          this.save()
        } else {
          this.update()
        }
      }
    }
  }
</script>
