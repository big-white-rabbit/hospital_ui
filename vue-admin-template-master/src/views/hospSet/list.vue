<template>
    <div class="app-container">
        医院设置列表
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="searchObj.hospname" placeholder="医院名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchObj.hoscode" placeholder="医院编号"></el-input>
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <!-- <el-button type="default" @click="resetData()">清空</el-button> -->
        </el-form>

        <!-- 工具条 -->
        <el-button type="danger" size='mini' @click="removeRows()">批量删除</el-button>

        <el-table :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="hosname" label="医院名称"></el-table-column>
            <el-table-column prop="hoscode" label="医院编号"></el-table-column>
            <el-table-column prop="apiUrl" label="api基础路径" width="200"></el-table-column>
            <el-table-column prop="contactsName" label="联系人姓名"></el-table-column>
            <el-table-column prop="contactsPhone" label="联系人手机"></el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                    {{ scope.row.status === 1 ? '可用' : '不可用' }}
                </template>
            </el-table-column>

            <!-- 删除操作 -->
            <el-table-column label="操作" width="280" align="center">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" icon="el-icon-delete" 
                @click="removeDataById(scope.row.id)">删除</el-button>

                <el-button v-if="scope.row.status==1" type="primary" size="mini" icon="el-icon-delete" 
                @click="lockHospSet(scope.row.id, 0)">锁定</el-button>

                <el-button v-if="scope.row.status==0" type="primary" size="mini" icon="el-icon-delete" 
                @click="lockHospSet(scope.row.id, 1)">取消锁定</el-button>

                <router-link :to="'/hospSet/edit/' + scope.row.id">
                    <el-button type="primary" size='mini' icon='el-icon-edit'>修改</el-button>
                </router-link>
            </template>
            </el-table-column>
        </el-table>



        <!-- 分页 -->
        <el-pagination 
        :total="total" 
        :current-page="current" 
        :page-size="limit" 
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList">
        </el-pagination>
    </div>
</template>

<script>
    import hospSet from '@/api/hospSet'
    export default {
        data() {
            return {
                current: 1,         //当前页
                limit: 3,           //页大小
                searchObj: {},      //条件封装对象
                list: [],           //页查询结果集合
                total: 0,           //总记录数
                multiSelection: []  //批量选择的记录列表
            }
        },
        created() {
            this.getList()
        },
        methods: {
            //医院设置列表方法
            getList(page=1) {
                this.current=page
                hospSet.getHospSetList(this.current, this.limit, this.searchObj)
                    .then(response => {
                        this.list = response.data.records
                        this.total = response.data.total
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            //医院设置删除
            removeDataById(id) {
                this.$confirm('此操作将永久删除医院设置信息，是否继续？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    hospSet.deleteHospSet(id)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getList()
                    })
                })
            },

            //医院设置批量删除
            removeRows() {
                this.$confirm('此操作将永久删除医院设置信息，是否继续？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var idList = []
                    for(var i = 0; i < this.multiSelection.length; i++) {
                        var obj = this.multiSelection[i]
                        var id = obj.id
                        idList.push(id)
                    }
                    hospSet.delBatchHospSet(idList)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getList()
                    })
                })
            },

            //获取复选框id值
            handleSelectionChange(selection) {
                this.multiSelection = selection
            },

            //锁定与取消锁定
            lockHospSet(id, status) {
                hospSet.lockHospSet(id, status)
                .then(response => {
                    this.getList()
                })
            }
        }
    }
</script>