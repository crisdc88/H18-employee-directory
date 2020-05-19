import axios from "axios"

export default {

getDirectory: function(number){
return axios.get(`https://randomuser.me/api/?results=${number}&nat=us`)
}

}