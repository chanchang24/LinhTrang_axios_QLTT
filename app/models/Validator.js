function Validator(){
    this.kiemTraRong = function(value, spanID, mess){
        if(!value){
            getEle(spanID).style.display ="block";
            getEle(spanID).innerHTML = mess;
            return false;
        }
        getEle(spanID).style.display ="none";
        return true;
    }
}
// validator.prototype.kiemTraTK= function(value, spanID, message) {

// }