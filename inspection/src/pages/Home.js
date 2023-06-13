import React, { useEffect, useState } from 'react';
import { APostRequest, AGetRequest } from '../api/home'
import { message, Button, Table } from 'antd';
import { ProTable, PageContainer } from '@ant-design/pro-components';
import { formatSeconds } from '../utils/format'
const Home = () => {
  const [dataSource, setDataSource] = useState([])
  const [total, setTotal] = useState(0)
  const [pageSize, setpageSize] = useState(30)

  //  请求列表
  const handGet = async (data) => {
    await AGetRequest(data).then(res => {
      setDataSource(res.result.songs)
      setTotal(res.result.songCount)
    })
  }
  const handPagetionChange = (num, size) => {
    console.log(num, size)
  }
  // 此处执行方法
  useEffect(() => {
    console.log(formatSeconds(303360 / 1000))
    handGet({ keywords: '流着泪的你的脸', size: 20 })
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
      render: response => {
        return formatSeconds(response / 1000)
      }
    },
    {
      title: '演唱者',
      dataIndex: 'artists',
      key: 'artists',
      render: response => {
        return response[0].name
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      
    },

  ];
  return (
    <PageContainer
      content="智慧纪检模块">
      <ProTable
        headerTitle={
          '搜索姓名'
        }
        dataSource={dataSource}
        rowKey='id'
        columns={columns}
        search={false}
        options={false}
        pagination={{
          pageSize: pageSize,
          total: total,
          onChange: (pageNum, pageSize) => handPagetionChange(pageNum, pageSize)
        }}
      />
    </PageContainer>
  );
}

export default Home