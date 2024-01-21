export function insertIntoArray({value, array}){
  const index = array.indexOf(value)
  if(index === -1){
    array.unshift(value)
  }else{
    array.splice(index, 1)
    array.unshift(value)
  }
  return array
}