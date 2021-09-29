import axios from 'axios'
import {useCallback, useEffect, useState} from 'react'
import {Api} from '../utils/API'
import {filterType} from '../utils/config'

const useUser = (type, keyWord) => {
  const [obj, setObj] = useState({
    pageNo: 1,
    data: [],
    hasMore: true,
    filterType: '',
    keyWord: '',
  })

  const fetchData = useCallback(async (pageNo, type, keyWord) => {
    try {
      if (type === '') return []
      console.log({type, keyWord})
      const {statusCode, data} = await Api.postRequest(
        '/get-artist/' + pageNo,
        {type: type, keyWord: keyWord.toLowerCase()},
      )
      console.log({statusCode, data})
      const {result: artists} = JSON.parse(data)
      console.log(artists)

      return artists
    } catch (e) {
      console.log('Eroror in fetching users : - ', e)
    }
  }, [])

  const loadMore = useCallback(async () => {
    console.log({objObj: obj})
    let x = await fetchData(obj.pageNo, obj.filterType, obj.keyWord)

    if (x.length > 0) {
      setObj({
        ...obj,
        pageNo: obj.pageNo + 1,
        hasMore: true,
        data: [...obj.data, ...x],
      })
    } else {
      setObj({...obj, hasMore: false, data: [...obj.data, ...x]})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, obj.data, obj.hasMore, obj.pageNo])

  useEffect(() => {
    console.log('type : ', type)
    console.log({keyWordHaiiii: keyWord})
    setObj({
      pageNo: 1,
      data: [],
      hasMore: true,
      filterType: type,
      keyWord: keyWord,
    })
    loadMore()

    console.log({runb: 'sdsdsdsd swd sld ls '})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyWord, type])

  return {...obj, loadMore}
}

export default useUser
