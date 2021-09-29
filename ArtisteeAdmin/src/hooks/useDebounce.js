let counter = 0
const getSuggestions = () => {
  //Calls API to get Data
  console.log('Fetching Data...', counter++)
}

const debounce = function (fn, d) {
  let timer
  return function () {
    let context = this,
      args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, d)
  }
}

const debounceForData = debounce(getSuggestions, 300)
