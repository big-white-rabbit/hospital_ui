import request from '@/utils/request'

export default {
    //医院设置列表
    getHospSetList(current, limit, searchObj) {
        return request({
            url: `/admin/hosp/hospitalSet/findPage/${current}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },

    //医院设置删除
    deleteHospSet(id) {
        return request({
            url: `/admin/hosp/hospitalSet/${id}`,
            method: 'delete'
        })
    },

    //医院设置批量删除
    delBatchHospSet(idList) {
        return request({
            url: `/admin/hosp/hospitalSet/batchRemoveHospSet`,
            method: 'delete',
            data: idList
        })
    },

    //锁定与取消锁定
    lockHospSet(id, status) {
        return request({
            url: `/admin/hosp/hospitalSet/lockHospSet/${id}/${status}`,
            method: 'put'
        })
    },

    //添加医院设置
    saveHospSet(hospitalSet) {
        return request({
            url: `/admin/hosp/hospitalSet/saveHospitalSet`,
            method: 'post',
            data: hospitalSet
        })
    },

    //获取医院设置id
    getHospSet(id) {
        return request({
            url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
            method: 'get'
        })
    },

    //修改医院设置
    updateHospSet(hospitalSet) {
        return request({
            url: `/admin/hosp/hospitalSet/updateHospSet`,
            method: 'post',
            data: hospitalSet
        })
    }
}