import axios from 'axios'
import {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {Api} from '../utils/API'

const filterType = {
  ALL: 'ALL',
  ALPHABET: 'ALPHABET',
  GENERE: 'GENERE',
  SEARCH: 'SEARCH',
}

const useUser = value => {
  const [obj, setObj] = useState({pageNo: 1, data: [], hasMore: true})

  const fetchData = useCallback(
    async pageNo => {
      try {
        console.log({value, pageNo})
        const {statusCode, data} = await Api.postRequest(
          '/get-artist/' + pageNo,
          {type: filterType.SEARCH, keyWord: value.toLowerCase()},
        )
        const {result: artists} = JSON.parse(data)
        console.log(artists)

        return artists
      } catch (e) {
        console.log('Eroror in fetching users : - ', e)
      }
    },
    [value],
  )

  const loadMore = useCallback(async () => {
    let x = await fetchData(obj.pageNo)

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
    setObj({pageNo: 1, data: [], hasMore: true})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return {...obj, loadMore}
}

export default useUser
